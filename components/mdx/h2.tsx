import { ReactNode } from "react";
import { getText } from "../../lib/react-nodes";
import { slugify } from "../../lib/utils";
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

  const slug = slugify(getText(children));

  return (
    <h2 className={className} {...props}>
      <a id={slug} className={styles.headingAnchor} aria-hidden></a>
      { children }
      <a href={`#${slug}`} className={styles.headingAnchorLink} aria-hidden></a>
    </h2>
  );
}
