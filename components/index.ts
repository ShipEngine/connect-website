import Callout from "./callout";
import CodeBlock from "./code-block";
import a from "./mdx/a";
import blockquote from "./mdx/blockquote";
import { H1, H2, H3, H4, H5, H6 } from "./mdx/headings";
import img from "./mdx/img";
import passThru from "./mdx/pass-thru";
import pre from "./mdx/pre";
import Pager from "./pager";
import { DefaultValue, Description, Field, Reference, Type } from "./reference";
import { Left, Right, Section } from "./section";

// Customize the components that are used to render MDX pages
export default {
  a,
  blockquote,
  img,
  pre,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  code: passThru("code"),
  inlineCode: passThru("code"),
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
  Callout,
  CodeBlock,
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
