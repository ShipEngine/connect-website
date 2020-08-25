import Link from "next/link";
import styles from "./pager.module.scss";

interface PagerProps {
  prev?: string;
  prevTitle?: string;
  next?: string;
  nextTitle?: string;
}

/**
 * Shows "Previous" and/or "Next" buttons that link to other docs pages
 */
export function Pager({ prev, prevTitle, next, nextTitle }: PagerProps) {
  prevTitle = prevTitle ? `Previous: ${prevTitle}` : "Previous Page";
  nextTitle = nextTitle ? `Next: ${nextTitle}` : "Next Page";

  return (
    <div className={styles.pager}>
      {
        prev &&
        <Link href={prev}><a className="button button-small button-secondary">
          {prevTitle}
        </a></Link>
      }
      {
        next &&
        <Link href={next}><a className="button button-small button-secondary">
          {nextTitle}
        </a></Link>
      }
    </div>
  );
}
