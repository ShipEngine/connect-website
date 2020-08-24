import React, { ReactNode } from "react";

interface MarkdownProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Just renders a standard HTML element and passes all props and children to it
 */
export default function passThru(tagName: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function PassThru({ markdown, children, ...props }: MarkdownProps) {
    return React.createElement(tagName, props, children);
  };
}
