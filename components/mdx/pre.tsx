import { ReactNode } from "react";

interface PreProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<pre>` elements in MDX pages
 */
export default function Pre({ markdown, children, ...props }: PreProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <pre {...props}>{ children }</pre>;
}
