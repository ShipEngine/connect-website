import Highlight, { Language, Prism } from "prism-react-renderer";
import { ReactNode } from "react";
import styles from "./code-block.module.scss";

const languageClassNamePattern = /language-(\w+)/;
const metastringAttributePattern = /(\w+)=(?:"([^"]+)"|(\w+))/g

export interface CodeBlockProps {
  markdown?: boolean;
  className?: string;
  metastring?: string;
  children?: string;
  [key: string]: unknown;
}


/**
 * A rich code block with line numbers and syntax highlighting
 */
export default function CodeBlock({ className, metastring, children }: CodeBlockProps) {
  // Get the programming langauge from the CSS class name (e.g. "language-javascript")
  const language = getLanguage(className);

  // Parse any extra properties on the MDX code fence, such as which lines to highlight
  const meta = parseMetaString(metastring);

  return (
    <Highlight Prism={Prism} code={children} language={language}>
      {({ tokens: lines, ...getProps }) => {
        // Remove leading/trailing empty lines
        lines = trimLines(lines);

        // Default to showing line numbers if there are more than 3 lines
        if (meta.lineNumbers === undefined) {
          meta.lineNumbers = lines.length > 3;
        }

        return (
          <pre className={`${className} ${styles.pre}`}>
            <code className={styles.codeBlock}>
              { lines.map((tokens, i) => Line(toLineProps(tokens, i, meta, getProps))) }
            </code>
          </pre>
        );
      }}
    </Highlight>
  );
}


interface LineProps {
  key: number;
  tokens: Token[];
  number?: number;
  highlight: boolean;
  className: string;
  getTokenProps: Function;
  [key: string]: unknown;
}

/**
 * A single line of a CodeBlock
 */
function Line({ tokens, key, number, highlight, getTokenProps }: LineProps) {
  return (
    <div key={key} className={`${styles.line} ${highlight ? styles.highlight : ""}`}>
      { number && <span className={styles.lineNumber} data-line-number={number}/> }
      { tokens.map((token, i) => Token(toTokenProps(token, i, getTokenProps))) }
    </div>
  )
}


interface TokenProps {
  key: number;
  types: string[];
  className: string;
  children: ReactNode;
  [key: string]: unknown;
}

/**
 * A single token in a CodeBlock, such as an identifier, value, operator, etc.
 */
function Token({ key, className, children }: TokenProps) {
  return (
    <span key={key} className={className}>{ children }</span>
  )
}


interface Token {
  types: string[];
  content: string;
  empty?: boolean;
}

interface GetProps {
  getLineProps: Function;
  getTokenProps: Function;
}

interface Meta {
  highlight: number[];
  lineNumbers?: boolean;
}


/**
 * Call Prism-React-Renderer's `getLineProps` function, and cast the result to a `LineProps` object
 *
 * @param tokens - The tokens on this line, such as identifiers, values, operators, etc.
 * @param index - The zero-based index of this line
 * @param meta - The parsed metastring from the original Markdown code fence
 * @param getLineProps - Prism-React-Renderer's `getLineProps` function
 * @param getTokenProps - Prism-React-Renderer's `getTokenProps` function
 *
 * @see https://github.com/FormidableLabs/prism-react-renderer#getlineprops
 */
function toLineProps(tokens: Token[], index: number, meta: Meta, { getLineProps, getTokenProps }: GetProps): LineProps {
  const key = index;
  const number = meta.lineNumbers ? index + 1 : undefined;
  const highlight = meta.highlight.includes(index + 1);
  return getLineProps({ tokens, key, number, highlight, getTokenProps }) as LineProps;
}


/**
 * Call Prism-React-Renderer's `getTokenProps` function, and cast the result to a `TokenProps` object
 *
 * @param token - The token being rendered
 * @param index - The zero-based index of this token on the line
 * @param getTokenProps - Prism-React-Renderer's `getTokenProps` function
 *
 * @see https://github.com/FormidableLabs/prism-react-renderer#gettokenprops
 */
function toTokenProps(token: Token, index: number, getTokenProps: Function): TokenProps {
  return getTokenProps({ token, key: index, types: token.types }) as TokenProps;
}


/**
 * Determines the programming language based on the CSS class name (e.g. "language-javascript")
 */
export function getLanguage(className: string): Language {
  const [, language] = languageClassNamePattern.exec(className) || [];
  return language as Language;
}


/**
 * Parse any extra properties on the MDX code fence.
 *
 * @example
 * ```
 * ```javascript highlight="1-5, 22, 28" lineNumbers=false
 * ```
 */
function parseMetaString(metastring: string): Meta {
  const meta: Meta = {
    highlight: [],
    lineNumbers: undefined,
  };
  let match: RegExpExecArray;

  while ((match = metastringAttributePattern.exec(metastring)) !== null) {
    const propName = match[1];
    const value = match[2] || match[3];

    switch (propName) {
      case "lineNumbers":
        meta.lineNumbers = value === "true";
        break;

      case "highlight":
        meta.highlight = parseLineNumbers(value);
        break;
    }
  }

  return meta;
}


/**
 * Parses a list of line numbers
 *
 * @example
 * "1-5, 22, 28"  ==> [1, 2, 3, 4, 5, 22, 28]
 */
function parseLineNumbers(numbers: string): number[] {
  const ranges = numbers.split(",").map(trim).filter(Boolean);
  const lineNumbers: number[] = [];

  for (const range of ranges) {
    if (range.includes("-")) {
      // This is a range, like "1-5" or "1 - 5"
      const [start, stop] = range.split("-").map(trim);
      const startNumber = parseInt(start);
      const stopNumber = parseInt(stop);

      for (let i = startNumber; i < stopNumber; i++) {
        lineNumbers.push(i);
      }
    }
    else {
      // This is a single line number
      lineNumbers.push(parseInt(range));
    }
  }

  return lineNumbers;
}


function trim(str: string): string {
  return str.trim();
}


/**
 * Removes blank lines from the beginning and end of a code block
 */
function trimLines(lines: Token[][]): Token[][] {
  let startIndex: number, endIndex: number;

  // Find the first non-empty line
  for (let i = 0; i < lines.length; i++) {
    if (hasText(lines[i])) {
      startIndex = i;
      break;
    }
  }

  // Find the last non-empty line
  for (let i = lines.length - 1; i >= 0; i--) {
    if (hasText(lines[i])) {
      endIndex = i;
      break;
    }
  }

  return lines.slice(startIndex, endIndex + 1);
}


/**
 * Determines whether a line contains any text.
 */
function hasText(line: Token[]): boolean {
  return line.length > 1 || (line.length === 1 && !line[0].empty);
}
