"use strict";

const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");
const { packageApp } = require("../../../lib/core/package-app");
const tar = require("tar");

let projectPath;
let tmpPath;
let tarballName;
let unarchivePath;

describe("The package app function", () => {

  before(async () => {
    tmpPath = path.join(process.cwd(), "test", "tmp");
    projectPath = path.join(process.cwd(), "test", "fixtures", "apps", "carrier", "valid");

    // copy fixture to tmp directory
    await fsExtra.remove(tmpPath);
    await fsExtra.copy(projectPath, tmpPath);

    tarballName = await packageApp(tmpPath);
    unarchivePath = path.join(tmpPath, "unarchive");
    await fs.promises.mkdir(unarchivePath);
    await tar.x({ cwd: unarchivePath, file: path.join(tmpPath, tarballName) });
  });

  it("should create a tarball", () => {
    expect(tarballName).to.include("carrier-inline-app-0.0.1.tgz");
    expect(tmpPath).to.be.and.directory().and.include.files(["carrier-inline-app-0.0.1.tgz"]);
  });

  it("should copy all dependencies to the bundledDependencies array", async () => {
    const pJsonString = await fs.promises.readFile(path.join(unarchivePath, "package", "package.json"), "utf-8");
    const pjson = JSON.parse(pJsonString);
    expect(pjson.bundledDependencies).to.have.members(["axios"]);
  });

  it("should restore the normal package.json without the bundled dependencies", async () => {
    const restoredPJSONString = await fs.promises.readFile(path.join(tmpPath, "package.json"));
    const restoredPJSON = JSON.parse(restoredPJSONString);
    expect(restoredPJSON.bundledDependencies).to.not.exist;
  });

  after(async () => {
    // delete the tmp directory
    tmpPath = path.join(process.cwd(), "test", "tmp");

    await fsExtra.remove(tmpPath);
  });
});
