import { MDXProvider } from "@mdx-js/react";
import { AppProps } from "next/app";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { components } from "../components";
import { BaseLayoutProps } from "../layouts/base/base-layout";
import "../styles/global.scss";

/**
 * The wrapper for all pages. Provides a place for site-wide functionality, such as error handling,
 * persisting data, maintaining state between pages, etc.
 *
 * NOTE: Do not add HTML ouutput here. Use a layout component instead
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
export default function App({ Component, pageProps }: AppProps<BaseLayoutProps>) {
  const router = useRouter();

  useEffect(() => disableSmoothScrollingOnRouteChange(router));

  return (
    // Wrap all pages in MDXProvider, which enables our custom MDX components
    <MDXProvider components={components} >
      <Component {...pageProps} />
    </MDXProvider>
  );
}

function disableSmoothScrollingOnRouteChange(router: NextRouter) {
  // Disable smooth scrolling when changing pages
  router.events.on("routeChangeStart", disableSmoothScrolling);

  // Re-enable smooth scrolling when the route-change completes
  router.events.on("routeChangeComplete", enableSmoothScrolling);
  router.events.on("routeChangeError", enableSmoothScrolling);

  return () => {
    // Remove event handlers when the component unmounts
    router.events.off("routeChangeStart", disableSmoothScrolling);
    router.events.off("routeChangeComplete", enableSmoothScrolling);
    router.events.off("routeChangeError", enableSmoothScrolling);
  };
}

function disableSmoothScrolling() {
  document.documentElement.style.scrollBehavior = "auto";
}

function enableSmoothScrolling() {
  document.documentElement.style.scrollBehavior = "";
}
