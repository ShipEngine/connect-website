"use strict";
const appLoader = require("@shipengine/integration-platform-loader");
const { before } = require("mocha");

// const chai = require("chai");
/**
 * Perform one-time setup before any tests are run.
 */
before("Setup test environment", async () => {
  global.app = await appLoader.loadApp(process.cwd());
});
