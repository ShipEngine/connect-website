import { MDXProvider } from "@mdx-js/react";
import { AppProps } from "next/app";
import { BaseLayoutProps } from "../components/layouts/base";
import a from "../components/mdx/a";
import img from "../components/mdx/img";
import "../styles/global.scss";

// Customize the components that are used to render MDX pages
const mdxComponents = { a, img };

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
