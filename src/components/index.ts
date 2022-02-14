import { CodeWrapper } from "./code-wrapper/code-wrapper";
import { A } from "./html/a";
import { Blockquote } from "./html/blockquote";
import { Code } from "./html/code";
import { H1, H2, H3, H4, H5, H6 } from "./html/headings";
import { Img } from "./html/img";
import { passThru } from "./html/pass-thru";
import { Pre } from "./html/pre";
import { Pager } from "./pager/pager";
import { DefaultValue, Description, Field, Reference, Type } from "./reference/reference";
import { Left, Right, Section } from "./section/section";

/**
 * Components that are used on MDX pages
 */
export const components = {
  a: A,
  blockquote: Blockquote,
  img: Img,
  pre: Pre,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  code: passThru("code"),
  inlineCode: Code,
  p: passThru("p"),
  ul: passThru("ul"),
  ol: passThru("ol"),
  li: passThru("li"),
  table: passThru("table"),
  thead: passThru("thead"),
  tbody: passThru("tbody"),
  tr: passThru("tr"),
  th: passThru("th"),
  td: passThru("td"),
  em: passThru("em"),
  strong: passThru("strong"),
  del: passThru("del"),
  hr: passThru("hr"),
  CodeWrapper,
  Pager,
  Section,
  Left,
  Right,
  Reference,
  Field,
  DefaultValue,
  Description,
  Type,
};
