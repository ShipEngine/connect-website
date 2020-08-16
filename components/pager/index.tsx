import styles from "./index.module.scss";

interface PagerProps {
  prev?: string;
  prevTitle?: string;
  next?: string;
  nextTitle?: string;
}

/**
 * Shows "Previous" and/or "Next" buttons that link to other docs pages
 */
export default function Pager({ prev, prevTitle, next, nextTitle }: PagerProps) {
  prevTitle = prevTitle ? `Previous: ${prevTitle}` : "Previous Page";
  nextTitle = nextTitle ? `Next: ${nextTitle}` : "Next Page";

  return (
    <div className={styles.pager}>
      { prev && <a className="button button-small button-secondary" href={prev}>{prevTitle}</a> }
      { next && <a className="button button-small button-secondary" href={next}>{nextTitle}</a> }
    </div>
  );
}
