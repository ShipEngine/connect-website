import { ReactNode } from "react";
import { getText } from "../../lib/react-nodes";
import { slugify } from "../../lib/utils";
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

  const slug = slugify(getText(children));

  return (
    <h3 className={className} {...props}>
      <span id={slug} className={styles.headingAnchor} aria-hidden></span>
      { children }
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a href={`#${slug}`} className={styles.headingAnchorLink} aria-hidden></a>
    </h3>
  );
}
