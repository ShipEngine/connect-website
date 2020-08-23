import { ReactNode } from "react";
import styles from "./mdx.module.scss";

interface H1Props {
  markdown?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<h1>` elements in MDX pages
 */
export default function H1({ markdown, className, children, ...props }: H1Props) {
  if (markdown) {
    className = styles.h1;
  }

  return <h1 className={className} {...props}>{ children }</h1>;
}
