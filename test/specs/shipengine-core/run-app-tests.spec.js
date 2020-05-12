"use strict";

const { expect } = require("chai");
const runAppTests = require("../../../lib/shipengine-core/run-app-tests");

describe("runAppTests() with a valid app", function () {
  it("returns the total number of successful test", async function () {
    const pathToApp = "../../fixtures/sample-apps/valid-app";
    const app = runAppTests("..");
  });
});
