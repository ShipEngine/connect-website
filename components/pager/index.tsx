import Link from "next/link";
import { useRouter } from "next/router";
import { resolveURL } from "../../lib/url";
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
  const router = useRouter();

  prevTitle = prevTitle ? `Previous: ${prevTitle}` : "Previous Page";
  nextTitle = nextTitle ? `Next: ${nextTitle}` : "Next Page";

  return (
    <div className={styles.pager}>
      {
        prev &&
        <Link href={resolveURL(prev, router)}>
          <a className="button button-small button-secondary">
            {prevTitle}
          </a>
        </Link>
      }
      {
        next &&
        <Link href={resolveURL(next, router)}>
          <a className="button button-small button-secondary">
            {nextTitle}
          </a>
        </Link>
      }
    </div>
  );
}
