import { ReactNode } from "react";
import { getText } from "../../lib/react-nodes";
import { slugify } from "../../lib/utils";
import styles from "./html.module.scss";

interface HeadingProps {
  markdown?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}


/**
 * Add our custom CSS class to H1 headings in MDX files
 */
export function H1({ className, children, ...props }: HeadingProps) {
  return <h1 className={`${styles.h1} ${className || ""}`} {...props}>{children}</h1>;
}


/**
 * Add an anchor link to all H2 headings
 */
export function H2({ className, children, ...props }: HeadingProps) {
  const slug = slugify(getText(children));

  return (
    <h2 className={`${styles.h2} ${className || ""}`} {...props}>
      <span id={slug} className={styles.headingAnchor} aria-hidden></span>
      {children}
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a href={`#${slug}`} className={styles.headingAnchorLink} aria-hidden></a>
    </h2>
  );
}


/**
 * Add an anchor link to all H3 headings
 */
export function H3({ className, children, ...props }: HeadingProps) {
  const slug = slugify(getText(children));

  return (
    <h3 className={`${styles.h3} ${className || ""}`} {...props}>
      <span id={slug} className={styles.headingAnchor} aria-hidden></span>
      {children}
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a href={`#${slug}`} className={styles.headingAnchorLink} aria-hidden></a>
    </h3>
  );
}


/**
 * Add our custom CSS class to H4 headings in MDX files
 */
export function H4({ className, children, ...props }: HeadingProps) {
  return <h4 className={`${styles.h4} ${className || ""}`} {...props}>{children}</h4>;
}


/**
 * Add our custom CSS class to H5 headings in MDX files
 */
export function H5({ className, children, ...props }: HeadingProps) {
  return <h5 className={`${styles.h5} ${className || ""}`} {...props}>{children}</h5>;
}


/**
 * Add our custom CSS class to H6 headings in MDX files
 */
export function H6({ className, children, ...props }: HeadingProps) {
  return <h6 className={`${styles.h6} ${className || ""}`} {...props}>{children}</h6>;
}
