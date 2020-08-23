import { ReactNode } from "react";

interface ULProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<ul>` elements in MDX pages
 */
export default function UL({ markdown, children, ...props }: ULProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <ul {...props}>{ children }</ul>;
}
