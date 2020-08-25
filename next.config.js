/// <reference path="./next-env.d.ts" />
"use strict";

const withMDX = require("@shipengine/next-mdx")({
  layoutsDir: "./src/layouts",
  pagesDir: "./src/pages",
});

// Enable MDX in Next.js
module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
