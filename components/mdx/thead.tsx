import { ReactNode } from "react";

interface THeadProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<thead>` elements in MDX pages
 */
export default function THead({ markdown, children, ...props }: THeadProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <thead {...props}>{ children }</thead>;
}
