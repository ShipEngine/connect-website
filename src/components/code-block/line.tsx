import styles from "./line.module.scss";
import { Meta } from "./parse-meta-string";
import { Token, toTokenProps } from "./token";


export interface LineProps {
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
export function Line({ tokens, key, number, highlight, getTokenProps }: LineProps) {
  return (
    <div key={key} className={`${styles.line} ${highlight ? styles.highlight : ""}`}>
      { number && <span className={styles.lineNumber} data-line-number={number}/> }
      { tokens.map((token, i) => Token(toTokenProps(token, i, getTokenProps))) }
    </div>
  )
}


/**
 * Props from the React-Prism-Renderer `<Highlight>` component
 */
export interface HighlightProps {
  getLineProps: Function;
  getTokenProps: Function;
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
export function toLineProps(tokens: Token[], index: number, meta: Meta, props: HighlightProps): LineProps {
  const { getLineProps, getTokenProps } = props;
  const key = index;
  const number = meta.lineNumbers ? index + 1 : undefined;
  const highlight = meta.highlight.includes(index + 1);
  return getLineProps({ tokens, key, number, highlight, getTokenProps }) as LineProps;
}
