import { ReactNode } from "react";

interface TRProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<tr>` elements in MDX pages
 */
export default function TR({ markdown, children, ...props }: TRProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <tr {...props}>{ children }</tr>;
}
