import styles from "./mdx.module.scss";

interface ImgProps {
  markdown?: boolean;
  className?: string;
  [key: string]: unknown;
}

/**
 * Applies default styling to images in Markdown
 */
export default function Img({ markdown, className, ...props }: ImgProps) {
  if (markdown) {
    className = styles.img;
  }

  return <img className={className} {...props} />
}
