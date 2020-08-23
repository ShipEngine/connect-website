import { ReactNode } from "react";

interface EmProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<em>` elements in MDX pages
 */
export default function Em({ markdown, children, ...props }: EmProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <em {...props}>{ children }</em>;
}
