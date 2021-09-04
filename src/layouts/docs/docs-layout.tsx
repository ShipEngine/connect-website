import React, { ReactElement, ReactNode, ReactNodeArray } from "react";
import { Left, Right, Section } from "../../components/section/section";
import { getText, getTypeName, Props, toArray } from "../../lib/react-nodes";
import PageLayout, { PageLayoutProps } from "../page/page-layout";
import { Menu } from "./menu";
import { menu } from "./menu-contents";
import { Heading, TableOfContents } from "./table-of-contents";

export type DocsLayoutProps = PageLayoutProps;

/**
 * This is the layout for documentation pages, including all MDX files.
 * It's a three-column layout, with the navigation menu on the left, the main content in the middle,
 * and supplimental content (such as code samples) on the right.
 */
export default function DocsLayout(props: DocsLayoutProps) {
  const { children } = props;
  const headings = findHeadings(children);

  // Split the children into two groups.
  // We'll wrap the first group in a <Section> along with the <TableOfContents>
  const [firstSectionChildren, otherChildren] = splitChildren(children);

  return (
    <PageLayout {...props}>
      <div id="docs-page">
        <Menu contents={menu} />
        <main>
          <article>
            <Section>
              <Left>{firstSectionChildren}</Left>
              <Right><TableOfContents headings={headings} /></Right>
            </Section>
            {otherChildren}
          </article>
        </main>
      </div>
    </PageLayout>
  );
}

/**
 * Finds all the H1 and H2 headings on the page
 */
function findHeadings(node: ReactNode): Heading[] {
  const children = toArray(node);
  const headings: Heading[] = [];

  for (const child of children) {
    if (typeof child === "object") {
      const element = child as ReactElement;
      const type = getTypeName(element);

      if (type === "h1" || type === "h2") {
        headings.push({
          level: parseInt(type[1]),
          text: getText(element),
        });
      }
      else if (element.props) {
        const props = element.props as Props;
        if (props.children) {
          headings.push(...findHeadings(props.children));
        }
      }
    }
  }

  return headings;
}

/**
 * Splits the children into two grups. The first group contains all children up to the first
 * `<Section>` component.  The second group contains the `<Section>` component and all subsequent
 * children.
 */
function splitChildren(children: ReactNode): [ReactNodeArray, ReactNodeArray] {
  const firstSectionChildren: ReactNodeArray = [];
  let otherChildren: ReactNodeArray = [];
  const nodes = React.Children.toArray(children);

  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i];

    if (getTypeName(child) === "Section") {
      // We found a <Section> component, so split the children here
      otherChildren = nodes.slice(i);
      break;
    }
    else {
      // This child comes before the first <Section> component
      firstSectionChildren.push(child);
    }
  }

  return [firstSectionChildren, otherChildren];
}
