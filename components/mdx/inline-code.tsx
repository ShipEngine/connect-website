import { ReactNode } from "react";

interface InlineCodeProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for inline `<code>` elements in MDX pages
 */
export default function InlineCode({ markdown, children, ...props }: InlineCodeProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <code {...props}>{ children }</code>;
}
