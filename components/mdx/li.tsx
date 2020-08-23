import { ReactNode } from "react";

interface LIProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<li>` elements in MDX pages
 */
export default function LI({ markdown, children, ...props }: LIProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <li {...props}>{ children }</li>;
}
