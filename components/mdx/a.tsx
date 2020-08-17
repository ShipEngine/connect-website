import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { resolveURL } from "../../lib/url";

interface AProps {
  href: string;
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Renders Next.js `<Link>` components instead of standard `<a>` elements
 */
export default function A({ markdown, href, children, ...props }: AProps) {
  const router = useRouter();

  if (markdown) {
    // Convert Markdown links to Next.js Link elements
    return <Link href={resolveURL(href, router)}><a {...props}>{ children }</a></Link>;
  }
  else {
    // Leave other links as-is
    return <a href={href} {...props}>{ children }</a>;
  }
}
