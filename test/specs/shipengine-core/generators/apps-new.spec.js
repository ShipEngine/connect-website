"use strict";

const helpers = require("yeoman-test");
let assert = require("yeoman-assert");
const path = require("path");
const pathToGenerator = "../../../../lib/shipengine-core/generators/apps-new";
const AppsNew = require(pathToGenerator);

describe("generator apps:new", function () {
  describe("defaults", function () {
    it("generates a new app", function () {
      // The object returned acts like a promise, so return it to wait until the process is done
      return helpers
        .run(AppsNew, {
          resolved: path.join(__dirname, pathToGenerator),
          namespace: "apps:new",
        })
        .withArguments(["test-app"]) // Mock the arguments
        .withPrompts({ name: "test name" })
        .withPrompts({ description: "test description" })
        .withPrompts({ type: "carrier" })
        .withPrompts({ author: "test" })
        .withPrompts({ version: "0.0.0" })
        .withPrompts({ "github.user": "@test" })
        .withPrompts({ "github.repo": "https://github.com/test/test" })
        .withPrompts({ eslint: true })
        .withPrompts({ pkg: true })
        .withPrompts({ definitions: "pojo" })
        .withPrompts({ typescript: true })
        .then(function () {
          assert.file([
            "src/index.ts",
            "src/methods/get-rates.ts",
            "src/methods/create-label.ts",
            "src/methods/schedule-pickup.ts",
            "src/methods/cancel-pickup.ts",
            ".editorconfig",
            "LICENSE",
            "README.md",
            "README.md",
            "package.json",
            "tsconfig.json",
          ]);

          assert.jsonFileContent("package.json", {
            name: "test name",
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
        .withPrompts({ name: "test name" })
        .withPrompts({ description: "test description" })
        .withPrompts({ type: "carrier" })
        .withPrompts({ author: "test" })
        .withPrompts({ version: "0.0.0" })
        .withPrompts({ "github.user": "@test" })
        .withPrompts({ "github.repo": "https://github.com/test/test" })
        .withPrompts({ eslint: true })
        .withPrompts({ pkg: true })
        .withPrompts({ typescript: false })
        .withArguments(["test-app"]) // Mock the arguments
        .then(function () {
          assert.file([
            "src/index.js",
            "src/methods/get-rates.js",
            "src/methods/create-label.js",
            "src/methods/schedule-pickup.js",
            "src/methods/cancel-pickup.js",
            ".editorconfig",
            "LICENSE",
            "README.md",
            "package.json",
          ]);

          assert.noFile([
            "src/index.ts",
            "test/tsconfig.json",
            ".eslintignore",
            "tsconfig.json",
          ]);

          assert.jsonFileContent("package.json", { name: "test name" });
          assert.jsonFileContent("package.json", {
            description: "test description",
          });
          assert.jsonFileContent("package.json", { main: "src/index.js" });
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
      .withPrompts({ name: "test name" })
      .withPrompts({ description: "test description" })
      .withPrompts({ type: "carrier" })
      .withPrompts({ author: "test" })
      .withPrompts({ version: "0.0.0" })
      .withPrompts({ "github.user": "@test" })
      .withPrompts({ "github.repo": "https://github.com/test/test" })
      .withPrompts({ eslint: true })
      .withPrompts({ pkg: true })
      .withPrompts({ definitions: "json" })
      .withPrompts({ typescript: true })
      .then(function () {
        assert.file([
          "src/index.json",
          "src/methods/get-rates.ts",
          "src/methods/create-label.ts",
          "src/methods/schedule-pickup.ts",
          "src/methods/cancel-pickup.ts",
          ".editorconfig",
          "LICENSE",
          "README.md",
          "README.md",
          "package.json",
          "tsconfig.json",
        ]);

        assert.jsonFileContent("package.json", {
          name: "test name",
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
      .withPrompts({ name: "test name" })
      .withPrompts({ description: "test description" })
      .withPrompts({ type: "carrier" })
      .withPrompts({ author: "test" })
      .withPrompts({ version: "0.0.0" })
      .withPrompts({ "github.user": "@test" })
      .withPrompts({ "github.repo": "https://github.com/test/test" })
      .withPrompts({ eslint: true })
      .withPrompts({ pkg: true })
      .withPrompts({ definitions: "yaml" })
      .withPrompts({ typescript: true })
      .then(function () {
        assert.file([
          "src/index.yaml",
          "src/methods/get-rates.ts",
          "src/methods/create-label.ts",
          "src/methods/schedule-pickup.ts",
          "src/methods/cancel-pickup.ts",
          ".editorconfig",
          "LICENSE",
          "README.md",
          "README.md",
          "package.json",
          "tsconfig.json",
        ]);

        assert.jsonFileContent("package.json", {
          name: "test name",
        });
        assert.jsonFileContent("package.json", {
          description: "test description",
        });
        assert.jsonFileContent("package.json", { main: "src/index.yaml" });
      });
  });
});
