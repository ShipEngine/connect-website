import React, { ReactElement, ReactNode, ReactNodeArray } from "react";
import { getFirstChild, getText, getTypeName, Props } from "../../lib/react-nodes";
import { Callout, CalloutProps } from "../callout/callout";

const badgePattern = /^[A-Z0-9 _-]+[:!?]$/;

interface BlockquoteProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<blockquote>` elements in MDX pages
 *
 * Blockquotes that begin with with `**TIP:**`, `**INFO:**`, etc. are converted to `<Callout>`
 * components.  This allows docs writers to use simple Markdown syntax like this to callouts.
 *
 * @example
 *    > This is a normal blockquote (not a callout)
 *
 *    > **PRO TIP:** This is an callout
 *
 *    > **WARNING:** This is also an callout
 *
 *    > **DANGER** This is a callout
 *    > that spans multiple lines
 *
 *    > **SUCCESS:**
 *    > ### This callout has a title
 *    > And this is the body of the callout
 *
 */
export function Blockquote({ markdown, children, ...props }: BlockquoteProps) {
  if (markdown) {
    const calloutProps = getCalloutProps(children);
    if (calloutProps) {
      // Render this blockquote as a Callout
      return <Callout {...calloutProps}/>;
    }
  }

  return <blockquote {...props}>{ children }</blockquote>;
}


/**
 * Returns the badge, title, and children for a callout
 */
function getCalloutProps(node: ReactNode): CalloutProps | undefined {
  const children = React.Children.toArray(node);

  const badge = extractBadge(children);
  if (!badge) return;

  const title = extractTitle(children);

  return { badge, title, children };
}


function extractBadge(children: ReactNodeArray): string | undefined {
  // We expect the first child to be a <p> element
  const p = children[0] as ReactElement<Props>;

  if (getTypeName(p) === "p") {
    // We expect the first child of the <p> to be a <strong>
    const strong = getFirstChild(p) as ReactElement<Props>;

    if (getTypeName(strong) === "strong") {
      // If the <strong> contains a short, all-caps string, then it's a badge
      const text = getText(strong);

      if (badgePattern.test(text)) {
        if (Array.isArray(p.props.children) && p.props.children.length > 1) {
          // Clone the <p> elment, without the <strong> in it
          children[0] = React.cloneElement(p, {
            children: React.Children.toArray(p.props.children).slice(1)
          });
        }
        else {
          // Remove the <p> from the <blockquote>
          children.shift();
        }

        if (text[text.length - 1] === ":") {
          // Remove the trailing colon character
          return text.slice(0, -1);
        }
        else {
          return text;
        }
      }
    }
  }
}


function extractTitle(children: ReactNodeArray): string | undefined {
  // We expect the first child to be an <h3> element
  const h3 = children[0] as ReactElement<Props>;

  if (getTypeName(h3) === "h3") {
    // Remove the <h3> from the <blockquote>
    children.shift();

    return getText(h3);
  }
}
