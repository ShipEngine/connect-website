import React, { ReactNode } from "react";

interface CodeProps {
  markdown?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

export const Code = ({ markdown, children, ...props }: CodeProps) => {
  return <code {...props} class="connect-code">{children}</code>;
};
