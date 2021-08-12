import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactNodeArray,
} from 'react'

export interface Props {
  className?: string
  children?: ReactNode
  [key: string]: unknown
}

export type Children<P = unknown> = ReactElement<P> | Array<ReactElement<P>>

interface MDXCreateElement {
  type: MDXElementType
  props: MDXElementProps
}

interface MDXElementType {
  displayName: string
}

interface MDXElementProps {
  mdxType: string
  originalType: string | JSXElementConstructor<unknown>
  markdown?: boolean
  children?: ReactNode
}

/**
 * If there's only one child, wraps it in an array.
 *
 * NOTE: This is different from `React.Children.toArray()`, which clones all the children
 *       and assigns unique keys to them
 */
export function toArray(children: ReactNode): ReactNodeArray {
  return Array.isArray(children) ? children : [children]
}

/**
 * Returns only the child elements, not text nodes or fragments
 */
export function getElements<P = unknown>(
  children?: Children<P>,
): Array<ReactElement<P>> {
  const nodes = toArray(children)
  const elements: Array<ReactElement<P>> = []

  for (const child of nodes) {
    if (child && typeof child === 'object' && 'props' in child) {
      elements.push(child)
    }
  }

  return elements
}

/**
 * Returns the first child of a React element, if any
 */
export function getFirstChild(node: ReactNode): ReactNode | undefined {
  if (typeof node === 'object') {
    const element = node as ReactElement<Props>
    return toArray(element.props.children)[0]
  }
}

/**
 * Returns the concatenated text of all descendant text nodes
 */
export function getText(node: ReactNode): string {
  const nodes = toArray(node)
  let text = ''

  for (const child of nodes) {
    if (child === null || child === undefined) {
      continue
    } else if (typeof child === 'object') {
      const element = child as ReactElement<Props>
      text += getText(element.props.children)
    } else {
      text += String(child)
    }
  }

  return text
}

/**
 * Returns the type of React element (e.g. "h1", "table", "Pager", etc.)
 */
export function getTypeName(node: ReactNode): string {
  if (typeof node !== 'object') {
    // This is a literal node, such as a string, boolean, null, or undefined
    return typeof node
  }

  const element = node as ReactElement

  switch (typeof element.type) {
    case 'string':
      return element.type

    case 'function':
      return element.type.name

    case 'object':
      const mdxElement = node as MDXCreateElement
      return mdxElement.props.mdxType
  }
}
