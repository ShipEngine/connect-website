"use strict";

const helpers = require("yeoman-test");
let assert = require("yeoman-assert");
const path = require("path");
const pathToGenerator = "../../../../lib/shipengine-core/generators/apps-new";
const AppsNew = require(pathToGenerator);
describe("generator apps:new", function () {
  /**
   * The yeoman generator tests alter the cwd of the mocha process. Need to change it back
   * to the original otherwise could cause unintended side effects to other tests.
   */
  let currentCwd = "";
  before(() => {
    currentCwd = process.cwd();
  });

  after(() => {
    process.chdir(currentCwd);
  });

  describe("defaults", function () {
    it("generates a new app", function () {
      // The object returned acts like a promise, so return it to wait until the process is done
      return helpers
        .run(AppsNew, {
          resolved: path.join(__dirname, pathToGenerator),
          namespace: "apps:new",
        })
        .withArguments(["test-app"]) // Mock the arguments
        .withPrompts({ name: "testname" })
        .withPrompts({ description: "test description" })
        .withPrompts({ type: "carrier" })
        .withPrompts({ author: "test" })
        .withPrompts({ version: "0.0.0" })
        .withPrompts({ "github.user": "@test" })
        .withPrompts({ "github.repo": "https://github.com/test/test" })
        .withPrompts({ definitions: "pojo" })
        .withPrompts({ typescript: true })
        .then(function () {
          assert.file([
            "src/index.ts",
            "src/methods/cancel-pickups.ts",
            "src/methods/create-shipment.ts",
            "src/methods/schedule-pickup.ts",
            "src/methods/rate-shipment.ts",
            "src/methods/cancel-shipments.ts",
            "src/methods/create-manifest.ts",
            "src/methods/track-shipment.ts",
            "src/methods/session.ts",
            ".editorconfig",
            "LICENSE",
            "README.md",
            "README.md",
            "package.json",
            "tsconfig.json",
          ]);

          assert.jsonFileContent("package.json", {
            name: "@shipengine/testname",
          });
          assert.jsonFileContent("package.json", {
            description: "test description",
          });
          assert.jsonFileContent("package.json", { main: "src/index.ts" });
        });
    });
  });

  describe("when configured without TypeScript", function () {
    it("generates a new app", function () {
      // The object returned acts like a promise, so return it to wait until the process is done
      return helpers
        .run(AppsNew, {
          resolved: path.join(__dirname, pathToGenerator),
          namespace: "apps:new",
        })
        .withArguments(["test-app"]) // Mock the arguments
        .withPrompts({ name: "testname" })
        .withPrompts({ description: "test description" })
        .withPrompts({ type: "carrier" })
        .withPrompts({ author: "test" })
        .withPrompts({ version: "0.0.0" })
        .withPrompts({ "github.user": "@test" })
        .withPrompts({ "github.repo": "https://github.com/test/test" })
        .withPrompts({ typescript: false })
        .withArguments(["test-app"]) // Mock the arguments
        .then(function () {
          assert.file([
            "src/index.yaml",
            "src/methods/cancel-pickups.js",
            "src/methods/create-shipment.js",
            "src/methods/schedule-pickup.js",
            "src/methods/rate-shipment.js",
            "src/methods/cancel-shipments.js",
            "src/methods/create-manifest.js",
            "src/methods/track-shipment.js",
            ".editorconfig",
            "LICENSE",
            "README.md",
            "package.json",
          ]);

          assert.noFile(["test/tsconfig.json", "tsconfig.json"]);

          assert.jsonFileContent("package.json", {
            name: "@shipengine/testname",
          });
          assert.jsonFileContent("package.json", {
            description: "test description",
          });
          assert.jsonFileContent("package.json", { main: "src/index.yaml" });
        });
    });
  });

  it("generates app definitiions in json when given that option", function () {
    // The object returned acts like a promise, so return it to wait until the process is done
    return helpers
      .run(AppsNew, {
        resolved: path.join(__dirname, pathToGenerator),
        namespace: "apps:new",
      })
      .withArguments(["test-app"]) // Mock the arguments
      .withPrompts({ name: "testname" })
      .withPrompts({ description: "test description" })
      .withPrompts({ type: "carrier" })
      .withPrompts({ author: "test" })
      .withPrompts({ version: "0.0.0" })
      .withPrompts({ "github.user": "@test" })
      .withPrompts({ "github.repo": "https://github.com/test/test" })
      .withPrompts({ definitions: "json" })
      .withPrompts({ typescript: true })
      .then(function () {
        assert.file([
          "src/index.json",
          "src/methods/cancel-pickups.ts",
          "src/methods/create-shipment.ts",
          "src/methods/schedule-pickup.ts",
          "src/methods/rate-shipment.ts",
          "src/methods/cancel-shipments.ts",
          "src/methods/create-manifest.ts",
          "src/methods/track-shipment.ts",
          "src/methods/session.ts",
          ".editorconfig",
          "LICENSE",
          "README.md",
          "README.md",
          "package.json",
          "tsconfig.json",
        ]);

        assert.jsonFileContent("package.json", {
          name: "@shipengine/testname",
        });
        assert.jsonFileContent("package.json", {
          description: "test description",
        });
        assert.jsonFileContent("package.json", { main: "src/index.json" });
      });
  });

  it("generates app definitiions in yaml when given that option", function () {
    // The object returned acts like a promise, so return it to wait until the process is done
    return helpers
      .run(AppsNew, {
        resolved: path.join(__dirname, pathToGenerator),
        namespace: "apps:new",
      })
      .withArguments(["test-app"]) // Mock the arguments
      .withPrompts({ name: "testname" })
      .withPrompts({ description: "test description" })
      .withPrompts({ type: "carrier" })
      .withPrompts({ author: "test" })
      .withPrompts({ version: "0.0.0" })
      .withPrompts({ "github.user": "@test" })
      .withPrompts({ "github.repo": "https://github.com/test/test" })
      .withPrompts({ definitions: "yaml" })
      .withPrompts({ typescript: true })
      .then(function () {
        assert.file([
          "src/index.yaml",
          "src/methods/cancel-pickups.ts",
          "src/methods/create-shipment.ts",
          "src/methods/schedule-pickup.ts",
          "src/methods/rate-shipment.ts",
          "src/methods/cancel-shipments.ts",
          "src/methods/create-manifest.ts",
          "src/methods/track-shipment.ts",
          "src/methods/session.ts",
          ".editorconfig",
          "LICENSE",
          "README.md",
          "README.md",
          "package.json",
          "tsconfig.json",
        ]);

        assert.jsonFileContent("package.json", {
          name: "@shipengine/testname",
        });
        assert.jsonFileContent("package.json", {
          description: "test description",
        });
        assert.jsonFileContent("package.json", { main: "src/index.yaml" });
      });
  });
});
