import { ReactNode } from "react";
import styles from "./mdx.module.scss";

interface H5Props {
  markdown?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<h5>` elements in MDX pages
 */
export default function H5({ markdown, className, children, ...props }: H5Props) {
  if (markdown) {
    className = styles.h5;
  }

  return <h5 className={className} {...props}>{ children }</h5>;
}
