import { ReactNode } from "react";
import styles from "./mdx.module.scss";

interface H2Props {
  markdown?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<h2>` elements in MDX pages
 */
export default function H2({ markdown, className, children, ...props }: H2Props) {
  if (markdown) {
    className = styles.h2;
  }

  return <h2 className={className} {...props}>{ children }</h2>;
}
