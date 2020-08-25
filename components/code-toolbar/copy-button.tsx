import { MouseEvent } from "react";


export interface CopyButtonProps {
  getCode(): string;
}


/**
 * A "Copy" button that copies the contents of a CodeBlock to the OS clipboard
 */
export function CopyButton({ getCode }: CopyButtonProps) {
  return (
    <button className="button-small" onClick={(e) => copyCode(e, getCode())}>
      Copy
    </button>
  );
}


/**
 * Copies the current code block to the clipboard
 */
function copyCode(event: MouseEvent, code: string): void {
  event.preventDefault();
  copyToClipboard(code);

  // TODO: Temporarily change the button text to "Copied!"
}



/**
 * Copies the given text to the OS clipboard.
 */
function copyToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.textContent = text;
  textArea.className = "visually-hidden";
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}
