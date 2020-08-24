import React, { ReactElement, ReactNode } from "react";
import { getTypeName, toArray } from "../../lib/react-nodes";
import CodeBlock, { CodeBlockProps } from "../code-block";

interface PreProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<pre>` elements in MDX pages
 */
export default function Pre({ markdown, children, ...props }: PreProps) {
  if (markdown) {
    // This is probably a Markdown code fence.
    // If so, then we'll render it as a rich <CodeBlock> component instead
    const code = getCodeProps(children);
    if (code) {
      return <CodeBlock {...code}/>;
    }
  }

  return <pre {...props}>{ children }</pre>;
}


/**
 * If the only child is a `<code>` element, then this function returns its props so they can
 * be pased to a `<CodeBlock>` component.
 */
function getCodeProps(children: ReactNode): CodeBlockProps | undefined {
  const [code, ...otherChildren] = toArray(children) as ReactElement<CodeBlockProps>[];
  const isCodeElement = code && getTypeName(code) === "code";
  const isOnlyChild = otherChildren.length === 0;

  // Only return the props if the <code> element is the only child
  if (isCodeElement && isOnlyChild) {
    return code.props;
  }
}
