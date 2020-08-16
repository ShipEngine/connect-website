import { ReactElement, ReactNode } from "react";

export const isProd = process.env.NODE_ENV === "production";
export const isDev = !isProd;

/**
 * Returns only the child elements, not text nodes or fragments
 */
export function getElements<T = unknown>(children: ReactNode): Array<ReactElement<T>> {
  const elements: Array<ReactElement<T>> = [];

  // If there's only one child, wrap it in an array
  const nodes = Array.isArray(children) ? children : [children];

  for (const child of nodes) {
    if (typeof child === "object" && "props" in child) {
      elements.push(child);
    }
  }

  return elements;
}
