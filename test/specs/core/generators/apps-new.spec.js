"use strict";

const helpers = require("yeoman-test");
let assert = require("yeoman-assert");
const path = require("path");
const pathToGenerator = "../../../../lib/core/generators/apps-new";
const AppsNew = require(pathToGenerator);

describe("new generator", () => {
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

  describe("carrier apps", () => {
    describe("when prompts are skipped", () => {
      it("generates an app with defaults", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .then(() => {
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
              ".npmignore",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              main: "src/index.yaml",
              description: "test description",
              scripts: { 
                test: "shipengine test",
                start: "shipengine start"
              },
            });
          });
      });
    });

    describe("when configured with TypeScript", () => {
      it("generates a new app with TypeScript and POJO description", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ typescript: true })
          .withPrompts({ definitions: "pojo" })
          .withArguments(["test-app"]) // Mock the arguments
          .then(() => {
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
              ".npmignore",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              scripts: {
                build: "tsc",
                watch: "tsc --watch",
                postbuild: "copyfiles -u 1 src/**/!\\(*.ts\\) lib; copyfiles -u 1 src/!\\(*.ts\\) lib",
                start: "shipengine start",
                test: "shipengine test"
              },
              main: "lib/index.js",
            });
          });
      });

      it("generates a new app with TypeScript and JSON description", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ typescript: true })
          .withPrompts({ definitions: "json" })
          .withArguments(["test-app"]) // Mock the arguments
          .then(() => {
            assert.file([
              "src/index.json",
              "src/methods/connect.ts",
              "src/methods/cancel-pickups.ts",
              "src/methods/create-shipment.ts",
              "src/methods/schedule-pickup.ts",
              "src/methods/rate-shipment.ts",
              "src/methods/cancel-shipments.ts",
              "src/methods/create-manifest.ts",
              "src/methods/track-shipment.ts",
              "src/methods/session.ts",
              "src/definitions/example-delivery-confirmation.json",
              "src/definitions/example-delivery-service.json",
              "src/definitions/example-packaging.json",
              "src/forms/connect.json",
              "src/forms/settings.json",
              ".editorconfig",
              "LICENSE",
              "README.md",
              ".npmignore",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              main: "lib/index.json",
              scripts: {
                build: "tsc",
                watch: "tsc --watch",
                postbuild: "copyfiles -u 1 src/**/!\\(*.ts\\) lib; copyfiles -u 1 src/!\\(*.ts\\) lib",
                start: "shipengine start",
                test: "shipengine test",
              }
            });
          });
      });

      it("generates a new app with TypeScript and YAML description", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ typescript: true })
          .withPrompts({ definitions: "yaml" })
          .withArguments(["test-app"]) // Mock the arguments
          .then(() => {
            assert.file([
              "src/index.yaml",
              "src/methods/connect.ts",
              "src/methods/cancel-pickups.ts",
              "src/methods/create-shipment.ts",
              "src/methods/schedule-pickup.ts",
              "src/methods/rate-shipment.ts",
              "src/methods/cancel-shipments.ts",
              "src/methods/create-manifest.ts",
              "src/methods/track-shipment.ts",
              "src/methods/session.ts",
              "src/definitions/example-delivery-confirmation.yaml",
              "src/definitions/example-delivery-service.yaml",
              "src/definitions/example-packaging.yaml",
              "src/forms/connect.yaml",
              "src/forms/settings.yaml",
              ".editorconfig",
              "LICENSE",
              "README.md",
              ".npmignore",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              main: "lib/index.yaml",
              scripts: {
                build: "tsc",
                watch: "tsc --watch",
                postbuild: "copyfiles -u 1 src/**/!\\(*.ts\\) lib; copyfiles -u 1 src/!\\(*.ts\\) lib",
                start: "shipengine start",
                test: "shipengine test"
              },
            });
          });
      });
    });

    describe("when configured with JSON definitions", () => {
      it("generates an app with JSON", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ definitions: "json" })
          .then(() => {
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
              ".npmignore",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              scripts: {
                start: "shipengine start",
                test: "shipengine test"
              },
              main: "src/index.json"
            });
          });
      });
    });

    describe("when configured with YAML definitions", () => {
      it("generates an app with JSON", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ definitions: "yaml" })
          .then(() => {
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
              ".npmignore",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              scripts: {
                start: "shipengine start",
                test: "shipengine test"
              },
              main: "src/index.yaml"
            });
          });
      });
    });
  });

  describe("order source apps", () => {
    describe("when prompts are skipped", () => {
      it("generates an app with defaults", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ type: "order" })
          .then(() => {
            assert.file([
              "src/index.yaml",
              "src/methods/connect.js",
              "src/methods/get-sales-order-by-date.js",
              "src/methods/shipment-cancelled.js",
              "src/methods/shipment-created.js",
              "src/forms/connect.yaml",
              "src/forms/settings.yaml",
              ".editorconfig",
              "LICENSE",
              "README.md",
              ".npmignore",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              scripts: {
                start: "shipengine start",
                test: "shipengine test"
              },
              main: "src/index.yaml"
            });
          });
      });
    });

    describe("when configured with TypeScript", () => {
      it("generates a new app with TypeScript and POJO definitions", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ type: "order" })
          .withPrompts({ typescript: true })
          .withPrompts({ definitions: "pojo" })
          .withArguments(["test-app"]) // Mock the arguments
          .then(() => {
            assert.file([
              "src/index.ts",
              "src/methods/connect.ts",
              "src/methods/get-sales-order-by-date.ts",
              "src/methods/shipment-cancelled.ts",
              "src/methods/shipment-created.ts",
              "src/forms/connect.ts",
              "src/forms/settings.ts",
              ".editorconfig",
              "LICENSE",
              "README.md",
              ".npmignore",
              "package.json",
              "tsconfig.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              main: "lib/index.js",
              scripts: {
                build: "tsc",
                watch: "tsc --watch",
                start: "shipengine start",
                test: "shipengine test",
              },
            });
          });
      });

      it("generates a new app with TypeScript and JSON definitions", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ type: "order" })
          .withPrompts({ typescript: true })
          .withPrompts({ definitions: "json" })
          .withArguments(["test-app"]) // Mock the arguments
          .then(() => {
            assert.file([
              "src/index.json",
              "src/methods/connect.ts",
              "src/methods/get-sales-order-by-date.ts",
              "src/methods/shipment-cancelled.ts",
              "src/methods/shipment-created.ts",
              "src/forms/connect.json",
              "src/forms/settings.json",
              ".editorconfig",
              "LICENSE",
              "README.md",
              "package.json",
              ".npmignore",
              "tsconfig.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              scripts: {
                build: "tsc",
                watch: "tsc --watch",
                start: "shipengine start",
                test: "shipengine test"
              },
              main: "lib/index.json"
            });
          });
      });

      it("generates a new app with TypeScript and YAML definitions", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ type: "order" })
          .withPrompts({ typescript: true })
          .withPrompts({ definitions: "yaml" })
          .withArguments(["test-app"]) // Mock the arguments
          .then(() => {
            assert.file([
              "src/index.yaml",
              "src/methods/connect.ts",
              "src/methods/get-sales-order-by-date.ts",
              "src/methods/shipment-cancelled.ts",
              "src/methods/shipment-created.ts",
              "src/forms/connect.yaml",
              "src/forms/settings.yaml",
              ".editorconfig",
              "LICENSE",
              "README.md",
              "package.json",
              ".npmignore",
              "tsconfig.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              scripts: {
                build: "tsc",
                watch: "tsc --watch",
                start: "shipengine start",
                test: "shipengine test"
              },
              main: "lib/index.yaml",
            });
          });
      });
    });

    describe("when configured with JSON definitions", () => {
      it("generates a new app with JSON", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ type: "order" })
          .withPrompts({ definitions: "json" })
          .withArguments(["test-app"]) // Mock the arguments
          .then(() => {
            assert.file([
              "src/index.json",
              "src/methods/connect.js",
              "src/methods/get-sales-order-by-date.js",
              "src/methods/shipment-cancelled.js",
              "src/methods/shipment-created.js",
              "src/forms/connect.json",
              "src/forms/settings.json",
              ".editorconfig",
              "LICENSE",
              "README.md",
              ".npmignore",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              scripts: {
                start: "shipengine start",
                test: "shipengine test"
              },
              main: "src/index.json",
            });
          });
      });
    });

    describe("when configured with YAML definitions", () => {
      it("generates a new app with YAML", () => {
        return helpers
          .run(AppsNew, {
            resolved: path.join(__dirname, pathToGenerator),
            namespace: "new",
          })
          .withArguments(["test-app"]) // Mock the arguments
          .withPrompts({ name: "testname" })
          .withPrompts({ description: "test description" })
          .withPrompts({ author: "test" })
          .withPrompts({ version: "0.0.0" })
          .withPrompts({ type: "order" })
          .withPrompts({ definitions: "yaml" })
          .withArguments(["test-app"]) // Mock the arguments
          .then(() => {
            assert.file([
              "src/index.yaml",
              "src/methods/connect.js",
              "src/methods/get-sales-order-by-date.js",
              "src/methods/shipment-cancelled.js",
              "src/methods/shipment-created.js",
              "src/forms/connect.yaml",
              "src/forms/settings.yaml",
              ".editorconfig",
              "LICENSE",
              "README.md",
              ".npmignore",
              "package.json",
            ]);

            assert.jsonFileContent("package.json", {
              name: "@shipengine/testname",
              description: "test description",
              scripts: {
                start: "shipengine start",
                test: "shipengine test"
              },
              main: "src/index.yaml"
            });
          });
      });
    });
  });
});
