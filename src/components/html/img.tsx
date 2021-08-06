import styles from "./html.module.scss";

interface ImgProps {
  markdown?: boolean;
  className?: string;
  [key: string]: unknown;
}

/**
 * Applies default styling to images in Markdown
 */
export function Img({ markdown, className, ...props }: ImgProps) {
  if (markdown) {
    className = styles.img;
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img className={className} {...props} />
}
