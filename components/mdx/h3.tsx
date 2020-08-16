import { ReactNode } from "react";
import styles from "./mdx.module.scss";

interface H3Props {
  markdown?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<h3>` elements in MDX pages
 */
export default function H3({ markdown, className, children, ...props }: H3Props) {
  if (markdown) {
    className = styles.h3;
  }

  return <h3 className={className} {...props}>{ children }</h3>;
}
