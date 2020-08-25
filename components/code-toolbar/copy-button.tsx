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

  // Temporarily changes the button text to signal that the code sample was copied
  const button = event.currentTarget;
  button.textContent = "Copied!";
  setTimeout(() => button.textContent = "Copy", 2500);
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
