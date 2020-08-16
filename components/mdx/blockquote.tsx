import { ReactNode } from "react";

interface BlockquoteProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<blockquote>` elements in MDX pages
 */
export default function Blockquote({ markdown, children, ...props }: BlockquoteProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <blockquote {...props}>{ children }</blockquote>;
}
