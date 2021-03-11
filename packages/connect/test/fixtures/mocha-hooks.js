"use strict";
const chai = require("chai");
/**
 * Perform one-time setup before any tests are run.
 */
before("Setup test environment", () => {
  chai.use(require("chai-fs"));
});
