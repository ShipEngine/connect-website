import { ReactNode } from "react";
import styles from "./mdx.module.scss";

interface H4Props {
  markdown?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<h4>` elements in MDX pages
 */
export default function H4({ markdown, className, children, ...props }: H4Props) {
  if (markdown) {
    className = styles.h4;
  }

  return <h4 className={className} {...props}>{ children }</h4>;
}
