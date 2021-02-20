import React, { ReactNode } from "react";
import { getTypeName, toArray } from "../../lib/react-nodes";
import { CodeWrapper } from "../code-wrapper/code-wrapper";

interface PreProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Custom rendering for `<pre>` elements in MDX pages
 */
export function Pre({ markdown, children, ...props }: PreProps) {
  if (markdown) {
    // This is probably a Markdown code fence.
    // If so, then we'll render it as a rich <CodeBlock> component instead
    if (isCodeBlock(children)) {
      return <CodeWrapper><pre {...props}>{children}</pre></CodeWrapper>;
    }
  }

  return <pre {...props}>{children}</pre>;
}


/**
 * Determines if the only child is a `<code>` element
 */
function isCodeBlock(children: ReactNode): boolean {
  const [code, ...otherChildren] = toArray(children);
  const isCodeElement = code && getTypeName(code) === "code";
  const isOnlyChild = otherChildren.length === 0;
  return Boolean(isCodeElement && isOnlyChild);
}
