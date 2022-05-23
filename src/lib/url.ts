import { NextRouter } from "next/router";
import { isDev } from "./utils";

/**
 * The URL of the ShipEngine Connect website
 */
export const siteURL = new URL(isDev ? "http://localhost:3000" : "https://connect-v1.shipengine.com");

/**
 * The ShipEngine Connect logo image URL
 */
export const logoURL = new URL("img/logos/shipengine-connect-logo.png", siteURL);

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
