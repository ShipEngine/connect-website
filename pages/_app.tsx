import { MDXProvider } from "@mdx-js/react";
import { AppProps } from "next/app";
import { BaseLayoutProps } from "../components/layouts/base";
import mdxComponents from "../components/mdx";
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
  return (
    <MDXProvider components={mdxComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}
