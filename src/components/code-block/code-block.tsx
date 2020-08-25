import Highlight, { Prism } from "prism-react-renderer";
import styles from "./code-block.module.scss";
import { getLanguage } from "./get-language";
import { Line, toLineProps } from "./line";
import { parseMetaString } from "./parse-meta-string";
import { trimLines } from "./trim-lines";


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
export function CodeBlock({ className, metastring, children }: CodeBlockProps) {
  // Get the programming langauge from the CSS class name (e.g. "language-javascript")
  const language = getLanguage(className);

  // Parse any extra properties on the MDX code fence, such as which lines to highlight
  const meta = parseMetaString(metastring);

  return (
    <Highlight Prism={Prism} code={children} language={language}>
      {({ tokens: lines, ...props }) => {
        // Remove leading/trailing empty lines
        lines = trimLines(lines);

        // Default to showing line numbers if there are more than 3 lines
        if (meta.lineNumbers === undefined) {
          meta.lineNumbers = lines.length > 3;
        }

        return (
          <pre className={`${className} ${styles.pre}`}>
            <code className={styles.codeBlock}>
              { lines.map((tokens, i) => Line(toLineProps(tokens, i, meta, props))) }
            </code>
          </pre>
        );
      }}
    </Highlight>
  );
}
