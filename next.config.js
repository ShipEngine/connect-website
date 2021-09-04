/// <reference path="./next-env.d.ts" />
'use strict'

const nextMDX = require('@jsdevtools/next-mdx')

const withMDX = nextMDX({
  layoutsDir: './src/layouts',
  pagesDir: './src/pages',
  siteURL: 'https://connect.shipengine.com',
})

// Enable MDX in Next.js
module.exports = withMDX({
  pageExtensions: ['tsx', 'mdx'],
})
