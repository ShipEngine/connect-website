import { ReactNode } from "react";

interface TBodyProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<tbody>` elements in MDX pages
 */
export default function TBody({ markdown, children, ...props }: TBodyProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <tbody {...props}>{ children }</tbody>;
}
