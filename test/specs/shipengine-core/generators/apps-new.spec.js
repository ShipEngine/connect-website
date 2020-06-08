"use strict";

const helpers = require("yeoman-test");
let assert = require("yeoman-assert");
const path = require("path");
const pathToGenerator = "../../../../lib/shipengine-core/generators/apps-new";
const AppsNew = require(pathToGenerator);

describe("apps:new generator", function () {
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

  describe("carrier apps", function () {
    describe("when prompts are skipped", function () {
      it("generates an app with defaults", function () {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "apps:new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .then(function () {
            assert.file([
              "src/index.yaml",
              "src/methods/connect.js",
              "src/methods/cancel-pickups.js",
              "src/methods/create-shipment.js",
              "src/methods/schedule-pickup.js",
              "src/methods/rate-shipment.js",
              "src/methods/cancel-shipments.js",
              "src/methods/create-manifest.js",
              "src/methods/track-shipment.js",
              "src/definitions/example-delivery-confirmation.yaml",
              "src/definitions/example-delivery-service.yaml",
              "src/definitions/example-packaging.yaml",
              "src/forms/connect.yaml",
              "src/forms/settings.yaml",
              ".editorconfig",
              "LICENSE",
              "README.md",
              "package.json",
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

    describe("when configured with TypeScript", function () {
      it("generates a new app with TypeScript", function () {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "apps:new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ typescript: true })
          .withPrompts({ definitions: "pojo" })
          .withArguments(["test-app"]) // Mock the arguments
          .then(function () {
            assert.file([
              "src/index.ts",
              "src/methods/connect.ts",
              "src/methods/cancel-pickups.ts",
              "src/methods/create-shipment.ts",
              "src/methods/schedule-pickup.ts",
              "src/methods/rate-shipment.ts",
              "src/methods/cancel-shipments.ts",
              "src/methods/create-manifest.ts",
              "src/methods/track-shipment.ts",
              "src/methods/session.ts",
              "src/definitions/example-delivery-confirmation.ts",
              "src/definitions/example-delivery-service.ts",
              "src/definitions/example-packaging.ts",
              "src/forms/connect.ts",
              "src/forms/settings.ts",
              ".editorconfig",
              "LICENSE",
              "README.md",
              "README.md",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
            });
            assert.jsonFileContent("package.json", {
              description: "test description",
            });
          });
      });
    });

    describe("when configured with JSON definitions", function () {
      it("generates an app with JSON", function () {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "apps:new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ definitions: "json" })
          .then(function () {
            assert.file([
              "src/index.json",
              "src/methods/connect.js",
              "src/methods/cancel-pickups.js",
              "src/methods/create-shipment.js",
              "src/methods/schedule-pickup.js",
              "src/methods/rate-shipment.js",
              "src/methods/cancel-shipments.js",
              "src/methods/create-manifest.js",
              "src/methods/track-shipment.js",
              "src/definitions/example-delivery-confirmation.json",
              "src/definitions/example-delivery-service.json",
              "src/definitions/example-packaging.json",
              "src/forms/connect.json",
              "src/forms/settings.json",
              ".editorconfig",
              "LICENSE",
              "README.md",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
            });
            assert.jsonFileContent("package.json", {
              description: "test description",
            });
            assert.jsonFileContent("package.json", {
              main: "src/index.json",
            });
          });
      });
    });

    describe("when configured with YAML definitions", function () {
      it("generates an app with JSON", function () {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "apps:new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ definitions: "yaml" })
          .then(function () {
            assert.file([
              "src/index.yaml",
              "src/methods/connect.js",
              "src/methods/cancel-pickups.js",
              "src/methods/create-shipment.js",
              "src/methods/schedule-pickup.js",
              "src/methods/rate-shipment.js",
              "src/methods/cancel-shipments.js",
              "src/methods/create-manifest.js",
              "src/methods/track-shipment.js",
              "src/definitions/example-delivery-confirmation.yaml",
              "src/definitions/example-delivery-service.yaml",
              "src/definitions/example-packaging.yaml",
              "src/forms/connect.yaml",
              "src/forms/settings.yaml",
              ".editorconfig",
              "LICENSE",
              "README.md",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
            });
            assert.jsonFileContent("package.json", {
              description: "test description",
            });
            assert.jsonFileContent("package.json", {
              main: "src/index.yaml",
            });
          });
      });
    });
  });

  describe("order source apps", function () {});
});
