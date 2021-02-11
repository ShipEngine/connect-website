"use strict";

const { expect } = require("chai");
const loadAndValidateApp = require("../../../lib/core/load-and-validate-app")
  .default;

describe("loadAndValidateApp() with a valid app", function () {
  it("returns the app", async function () {
    const app = await loadAndValidateApp("test/fixtures/apps/carrier/valid");
    expect(app.name).to.be.a("string");
  });
});

describe("loadAndValidateApp() when there is not a manifest file", function () {
  it("returns errors", async function () {
    try {
      await loadAndValidateApp("test/fixtures/apps/carrier/missing-pjson");
    } catch (error) {
      expect(error.errors).to.be.a("array");
    }
  });
});

describe("loadAndValidateApp() when the SDK is not a dependency", function () {
  it("returns errors", async function () {
    try {
      await loadAndValidateApp("test/fixtures/apps/carrier/missing-sdk");
    } catch (error) {
      expect(error.errors).to.be.a("array");
    }
  });
});

describe("loadAndValidateApp() when the apps structure is invalid", function () {
  it("returns errors", async function () {
    try {
      await loadAndValidateApp("test/fixtures/apps/carrier/missing-name");
    } catch (error) {
      expect(error.errors).to.be.a("array");
    }
  });
});
