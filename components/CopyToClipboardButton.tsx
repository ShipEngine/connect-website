import * as React from "react";

export const CopyToClipboardButton = ({ value }) => {
    const id = Date.now() + Math.round(Math.random() * 1000);
  return (
    <div
      className="gatsby-code-button-container"
      data-toaster-id={`${id}`}
      data-toaster-duration="1500"
      /* tslint:disable */
      onClick={() => window.copyCodeToClipboard(value, id)}
    >
      <div className="gatsby-code-button" title="Copy the code snippet" style={{ display: ''}}>
        Copy
      </div>
      <div
        className={`done-indicator done-indicator-${id}`}
        style={{ display: 'none' }}
      >
        Copied
      </div>
    </div>
  );
};
