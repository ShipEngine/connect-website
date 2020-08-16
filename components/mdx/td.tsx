import { ReactNode } from "react";

interface TDProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<td>` elements in MDX pages
 */
export default function TD({ markdown, children, ...props }: TDProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <td {...props}>{ children }</td>;
}
