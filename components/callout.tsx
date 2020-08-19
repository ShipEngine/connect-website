import { ReactNode } from "react";
import styles from "./callout.module.scss";

export type CalloutType = "danger" | "warning" | "success" | "info";

export interface CalloutProps {
  badge: string;
  type?: CalloutType;
  title?: string;
  children?: ReactNode;
}


/**
 * A short piece of information that's important and deserves extra attention.
 * This can be used for warnings, tips, notes, etc.
 */
export default function Callout({ badge, type, title, children }: CalloutProps) {
  const typeClass = getCalloutTypeClass(badge, type);

  return (
    <aside className={styles.callout}>
      <strong className={`${styles.badge} ${typeClass}`}>{badge}</strong>
      {
        title && <h3 className={styles.title}>{title}</h3>
      }
      {children}
    </aside>
  );
}


/**
 * Returns the CSS class name for the callout type
 */
function getCalloutTypeClass(badge: string, type: CalloutType | undefined): string {
  // If a type was specified, the us eit
  if (type) {
    return styles[type];
  }

  // No type was specified, so infer it from the badge text
  switch (badge) {
    case "ERROR":
    case "PROBLEM":
    case "DANGER":
    case "DANGER!":
    case "BEWARE":
    case "BEWARE!":
    case "BAD":
    case "OH NO":
    case "OH NO!":
    case "UH OH":
    case "UH OH!":
    case "UH, OH":
    case "UH, OH!":
      return styles.danger;

    case "ALERT":
    case "ALERT!":
    case "CAUTION":
    case "CAUTION!":
    case "WARNING":
    case "WARNING!":
      return styles.warning;

    case "OK":
    case "WIN":
    case "GOOD":
    case "GREAT":
    case "GREAT!":
    case "EXCELLENT":
    case "EXCELLENT!":
    case "CONGRATS":
    case "CONGRATS!":
    case "SUCCESS":
    case "SUCCESS!":
      return styles.success;

    case "TIP":
    case "PRO TIP":
    case "QUESTION?":
    default:
      return styles.info;
  }
}
