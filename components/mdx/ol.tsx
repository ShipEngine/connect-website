import { ReactNode } from "react";

interface OLProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<ol>` elements in MDX pages
 */
export default function OL({ markdown, children, ...props }: OLProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <ol {...props}>{ children }</ol>;
}
