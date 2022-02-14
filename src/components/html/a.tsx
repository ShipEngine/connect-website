import Link from "next/link";
import { ReactNode } from "react";

interface AProps {
  href: string;
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Renders Next.js `<Link>` components instead of standard `<a>` elements
 */
export function A({ markdown, href, children, ...props }: AProps) {
  if (markdown) {
    // Convert Markdown links to Next.js Link elements
    return <Link href={href}><a class="connect-a" {...props}>{ children }</a></Link>;
  }
  else {
    // Leave other links as-is
    return <a href={href} {...props} class="connect-a">{ children }</a>;
  }
}
