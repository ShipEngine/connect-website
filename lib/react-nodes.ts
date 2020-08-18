import { ReactElement, ReactNode } from "react";

/**
 * Returns only the child elements, not text nodes or fragments
 */
export function getElements<T = unknown>(children: ReactNode): Array<ReactElement<T>> {
  const elements: Array<ReactElement<T>> = [];

  // If there's only one child, wrap it in an array
  const nodes = Array.isArray(children) ? children : [children];

  for (const child of nodes) {
    if (child && typeof child === "object" && "props" in child) {
      elements.push(child);
    }
  }

  return elements;
}

/**
 * Returns the concatenated text of all descendant text nodes
 */
export function getText(children: ReactNode): string {
  // If there's only one child, wrap it in an array
  const nodes = Array.isArray(children) ? children : [children];

  let text = "";

  for (const child of nodes) {
    if (child === null || child === undefined) {
      continue;
    }
    else if (typeof child === "object") {
      text += getText(child);
    }
    else {
      text += String(child);
    }
  }

  return text;
}
