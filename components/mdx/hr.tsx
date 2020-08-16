import { ReactNode } from "react";

interface HRProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<hr>` elements in MDX pages
 */
export default function HR({ markdown, children, ...props }: HRProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <hr {...props}>{ children }</hr>;
}
