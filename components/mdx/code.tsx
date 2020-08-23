import { ReactNode } from "react";

interface CodeProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<code>` elements in MDX pages
 */
export default function Code({ markdown, children, ...props }: CodeProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <code {...props}>{ children }</code>;
}
