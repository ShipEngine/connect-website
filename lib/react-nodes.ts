import { JSXElementConstructor, ReactElement, ReactNode, ReactNodeArray, ReactPortal } from "react";

export interface Props {
  children?: ReactNode;
  [key: string]: unknown;
}

interface MDXCreateElement {
  type: MDXElementType;
  props: MDXElementProps;
}

interface MDXElementType {
  displayName: string;
}

interface MDXElementProps {
  mdxType: string;
  originalType: string | JSXElementConstructor<unknown>;
  markdown?: boolean;
  children?: ReactNode;
}

/**
 * If there's only one child, wraps it in an array.
 *
 * NOTE: This is different from `React.Children.toArray()`, which assigns keys to the children
 */
export function toArray(children: ReactNode): ReactNodeArray {
  return Array.isArray(children) ? children : [children];
}

/**
 * Returns only the child elements, not text nodes or fragments
 */
export function getElements<T = unknown>(children: ReactNode): Array<ReactElement<T>> {
  const nodes = toArray(children);
  const elements: Array<ReactElement<T>> = [];

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
  const nodes = toArray(children);
  let text = "";

  for (const child of nodes) {
    if (child === null || child === undefined) {
      continue;
    }
    else if (typeof child === "object") {
      const element = child as ReactElement;
      text += getText((element.props as ReactPortal).children);
    }
    else {
      text += String(child);
    }
  }

  return text;
}

/**
 * Returns the type of React element. For HTML types, this will be a string (e.g. "h1", "table").
 * For React components, this will be the component function.
 */
export function getType(element: ReactElement): string | JSXElementConstructor<unknown> {
  switch (typeof element.type) {
    case "string":
      return element.type;

    case "function":
      return element as unknown as JSXElementConstructor<unknown>;

    case "object":
      const mdxProps = element.props as MDXElementProps;
      return mdxProps.originalType;
  }
}

/**
 * Returns the type of React element (e.g. "h1", "table", "Pager", etc.)
 */
export function getTypeName(element: ReactElement): string {
  const typeName = getNameOfType(element.type);

  if (typeName === "MDXCreateElement") {
    const mdxElement = element as unknown as MDXCreateElement;
    return getNameOfType(mdxElement.props.originalType);
  }
}

function getNameOfType(type: unknown): string {
  switch (typeof type) {
    case "string":
      return type;

    case "function":
      return type.name;

    case "object":
      const mdxType = type as MDXElementType;
      return mdxType.displayName;
  }
}
