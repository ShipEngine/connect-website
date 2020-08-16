import { ReactNode } from "react";
import styles from "./mdx.module.scss";

interface H6Props {
  markdown?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<h6>` elements in MDX pages
 */
export default function H6({ markdown, className, children, ...props }: H6Props) {
  if (markdown) {
    className = styles.h6;
  }

  return <h6 className={className} {...props}>{ children }</h6>;
}
