/// <reference path="./next-env.d.ts" />
"use strict";

const withMDX = require("@shipengine/next-mdx")();

// Enable MDX in Next.js
module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
