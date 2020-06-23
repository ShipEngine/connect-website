"use strict";

const { expect } = require("chai");
const path = require("path");
const { loadStaticConfig } = require("../../../../../lib/core/test-app/tiny-test/load-static-config");

let originalCwd;
describe("The shipengine.config.js project file", () => {

  before(() => {
    originalCwd = process.cwd();
  });

  afterEach(() => {
    process.chdir(originalCwd);
  });

  describe("when properly configured", () => {

    before(async () => {
      const fixturePath = path.join(process.cwd(), "test", "fixtures", "apps", "carrier", "shipengine-config", "valid-config");
      process.chdir(fixturePath);
    });

    it("should not throw an error", async () => {
      try {
        const result = await loadStaticConfig();
        expect(result).to.not.be.undefined;
      }
      catch (error) {
        expect(error).to.be.undefined;
      }
    });
  });

  describe("When an invalid property is present", () => {

    before(async () => {
      const fixturePath = path.join(process.cwd(), "test", "fixtures", "apps", "carrier", "shipengine-config", "invalid-top-level-config");
      process.chdir(fixturePath);
    });

    it("should throw an error", async () => {
      try {
        const result = await loadStaticConfig();
        expect(result).to.be.undefined;
      }
      catch (error) {
        expect(error).to.not.be.undefined;
      }
    });

  });

  describe("When a method value is the wrong type", () => {
    before(async () => {
      const fixturePath = path.join(process.cwd(), "test", "fixtures", "apps", "carrier", "shipengine-config", "invalid-method-prop-config");
      process.chdir(fixturePath);
    });

    it("should throw an error", async () => {
      try {
        const result = await loadStaticConfig();
        expect(result).to.be.undefined;
      }
      catch (error) {
        expect(error).to.not.be.undefined;
      }
    });
  });
});
