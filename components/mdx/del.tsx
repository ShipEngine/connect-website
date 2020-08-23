import { ReactNode } from "react";

interface DelProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<del>` elements in MDX pages
 */
export default function Del({ markdown, children, ...props }: DelProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <del {...props}>{ children }</del>;
}
