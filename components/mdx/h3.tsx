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
      <a id={slug} className={styles.headingAnchor} aria-hidden></a>
      { children }
      <a href={`#${slug}`} className={styles.headingAnchorLink} aria-hidden></a>
    </h3>
  );
}
