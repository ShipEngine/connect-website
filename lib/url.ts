import { NextRouter } from "next/router";
import { isDev } from "./utils";

/**
 * The URL of the ShipEngine Connect website
 */
export const siteURL = new URL(isDev ? "http://localhost:3000" : "https://connect.shipengine.com");

/**
 * The ShipEngine Connect logo image URL
 */
export const logoURL = new URL("img/media/logo-square.png", siteURL);

/**
 * The default image that's used when a page is shared on social media
 */
export const defaultImageURL = new URL("img/media/card-square.png", siteURL);

/**
 * Returns the canonical URL of the current page
 */
export function getPageURL(router: NextRouter): URL {
  return new URL(router.pathname, siteURL);
}

/**
 * Resolves a URL relative to the Next.js "pages" directory. This is necessary for any URL that
 * is passed to the Next.js router or `<Link>` component.
 */
export function resolveURL(relativeURL: string, router: NextRouter): string {
  relativeURL = relativeURL || "";

  if (relativeURL[0] === "/" || relativeURL.startsWith("https://") || relativeURL.startsWith("http://")) {
    // This isn't a relative URL.  It's absolute.
    return relativeURL;
  }

  let { pathname } = router;
  if (pathname[pathname.length - 1] !== "/") {
    pathname += "/";
  }
  return pathname + relativeURL;
}
