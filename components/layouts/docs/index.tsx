import PageLayout, { PageLayoutProps } from "../page";
import DocsMenu from "./docs-menu";

export type DocsLayoutProps = PageLayoutProps;

/**
 * This is the layout for documentation pages, including all MDX files.
 * It's a three-column layout, with the navigation menu on the left, the main content in the middle,
 * and supplimental content (such as code samples) on the right.
 */
export default function DocsLayout(props: DocsLayoutProps) {
  const { children } = props;

  return (
    <PageLayout {...props}>
      <div id="docs-page">
        <DocsMenu/>
        <main data-swiftype-name="body" data-swiftype-type="text">
          <article>{ children }</article>
        </main>
      </div>
    </PageLayout>
  );
}
