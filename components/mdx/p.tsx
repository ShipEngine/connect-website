import { ReactNode } from "react";

interface PProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<p>` elements in MDX pages
 */
export default function P({ markdown, children, ...props }: PProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <p {...props}>{ children }</p>;
}
