import { ReactNode } from "react";

/**
 * A Prism-React-Renderer token object
 */
export interface Token {
  types: string[];
  content: string;
  empty?: boolean;
}

export interface TokenProps {
  key: number;
  types: string[];
  className: string;
  children: ReactNode;
  [key: string]: unknown;
}

/**
 * A single token in a CodeBlock, such as an identifier, value, operator, etc.
 */
export function Token({ key, className, children }: TokenProps) {
  return (
    <span key={key} className={className}>{ children }</span>
  )
}


/**
 * Call Prism-React-Renderer's `getTokenProps` function, and cast the result to a `TokenProps` object
 *
 * @param token - The token being rendered
 * @param index - The zero-based index of this token on the line
 * @param getTokenProps - Prism-React-Renderer's `getTokenProps` function
 *
 * @see https://github.com/FormidableLabs/prism-react-renderer#gettokenprops
 */
export function toTokenProps(token: Token, index: number, getTokenProps: Function): TokenProps {
  return getTokenProps({ token, key: index, types: token.types }) as TokenProps;
}
