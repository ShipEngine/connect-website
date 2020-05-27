"use strict";

const { expect } = require("chai");
const { validateApp } = require("../../../lib/shipengine-core/validate-app");

describe.skip("validateApp() with a valid app", function () {
  it("returns the app", async function () {
    const app = await validateApp("test/fixtures/apps/carrier/valid");
    expect(app.carrier.id).to.be.a("string");
  });
});

describe.skip("validateApp() when there is not a manifest file", function () {
  it("returns errors", async function () {
    try {
      await validateApp("test/fixtures/apps/carrier/missing-pjson");
    } catch (error) {
      expect(error.errors).to.be.a("array");
    }
  });
});

describe.skip("validateApp() when the SDK is not a dependency", function () {
  it("returns errors", async function () {
    try {
      await validateApp("test/fixtures/apps/carrier/missing-sdk");
    } catch (error) {
      expect(error.errors).to.be.a("array");
    }
  });
});

describe.skip("validateApp() when the apps structure is invalid", function () {
  it("returns errors", async function () {
    try {
      await validateApp("test/fixtures/apps/carrier/missing-name");
    } catch (error) {
      expect(error.errors).to.be.a("array");
    }
  });
});
