import * as React from "react";
import { CopyToClipboardButton } from './CopyToClipboardButton';

export const CodeWrapper = ({ children }) => {
  return (
    <div className="code-wrapper">
        <CopyToClipboardButton value={children} />
      <div className="gatsby-highlight" data-language="typescript">
        <pre className="language-typescript">
            {children}
        </pre>
      </div>
    </div>
  );
};
