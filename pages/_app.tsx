import { MDXProvider } from "@mdx-js/react";
import { AppProps } from "next/app";
import { BaseLayoutProps } from "../components/layouts/base";
import a from "../components/mdx/a";
import blockquote from "../components/mdx/blockquote";
import code from "../components/mdx/code";
import del from "../components/mdx/del";
import em from "../components/mdx/em";
import h1 from "../components/mdx/h1";
import h2 from "../components/mdx/h2";
import h3 from "../components/mdx/h3";
import h4 from "../components/mdx/h4";
import h5 from "../components/mdx/h5";
import h6 from "../components/mdx/h6";
import hr from "../components/mdx/hr";
import img from "../components/mdx/img";
import inlineCode from "../components/mdx/inline-code";
import li from "../components/mdx/li";
import ol from "../components/mdx/ol";
import p from "../components/mdx/p";
import pre from "../components/mdx/pre";
import strong from "../components/mdx/strong";
import table from "../components/mdx/table";
import tbody from "../components/mdx/tbody";
import td from "../components/mdx/td";
import thead from "../components/mdx/thead";
import tr from "../components/mdx/tr";
import ul from "../components/mdx/ul";
import "../styles/global.scss";

// Customize the components that are used to render MDX pages
const mdxComponents = {
  a, p, h1, h2, h3, h4, h5, h6, blockquote, ul, ol, li, table, thead, tbody, tr, td, pre, code, em, strong, del, inlineCode, hr, img
};

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
