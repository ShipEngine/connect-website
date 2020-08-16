import BaseLayout, { BaseLayoutProps } from "../base";
import Footer from "./footer";
import Header from "./header";

export type PageLayoutProps = BaseLayoutProps;

/**
 * This is the layout for most pages all other layouts.  It renders metadata for SEO and social media
 * in the `<head>`, but leaves the `<body>` empty.
 */
export default function PageLayout(props: PageLayoutProps) {
  const { children } = props;

  return (
    <BaseLayout {...props}>
      <Header/>
      <div id="page-background">
        { children }
      </div>
      <Footer/>
    </BaseLayout>
  );
}
