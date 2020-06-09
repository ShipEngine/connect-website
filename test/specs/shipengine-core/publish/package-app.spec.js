"use strict";

const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");
const { packageApp } = require("../../../../lib/shipengine-core/publish/package-app");

let projectPath;
let tmpPath;
describe("The package app function", () => {

  before(async () => {
    tmpPath = path.join(process.cwd(), "test", "tmp");
    projectPath = path.join(process.cwd(), "test", "fixtures", "apps", "carrier", "valid");

    // copy fixture to tmp directory
    await fsExtra.remove(tmpPath);
    await fsExtra.copy(projectPath, tmpPath);

    await packageApp(tmpPath);
  });


  it("should copy all dependencies to the bundledDepencies array", async () => {

    const pJsonString = await fs.promises.readFile(path.join(tmpPath, "package.json"), "utf-8");
    const pjson = JSON.parse(pJsonString);
    expect(pjson.bundledDependencies).to.have.members(["axios"]);
  });

  it("should create a tarball", () => {
    expect(tmpPath).to.be.and.directory().and.include.files(["carrier-inline-app-0.0.1.tgz"]);
  });

  after(async () => {
    // delete the tmp directory
    tmpPath = path.join(process.cwd(), "test", "tmp");

    await fsExtra.remove(tmpPath);
  });

});
