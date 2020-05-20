"use strict";
const appLoader = require("@shipengine/integration-platform-loader");
const chai = require("chai");
const chaiPromise = require("chai-as-promised");
/**
 * Perform one-time setup before any tests are run.
 */
before("Setup test environment", async () => {
  chai.use(chaiPromise);
  global.app = await appLoader.loadApp(process.cwd());
});
