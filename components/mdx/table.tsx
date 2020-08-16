import { ReactNode } from "react";

interface TableProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<table>` elements in MDX pages
 */
export default function Table({ markdown, children, ...props }: TableProps) {
  if (markdown) {
    // TODO: Anything here will only apply to Markdown syntax, not inline HTML/JSX
  }

  return <table {...props}>{ children }</table>;
}
