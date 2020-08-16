import { ReactNode } from "react";

interface StrongProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<strong>` elements in MDX pages
 */
export default function Strong({ markdown, children, ...props }: StrongProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <strong {...props}>{ children }</strong>;
}
