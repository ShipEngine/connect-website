import { ReactNode } from "react";

interface THProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<th>` elements in MDX pages
 */
export default function TH({ markdown, children, ...props }: THProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <th {...props}>{ children }</th>;
}
