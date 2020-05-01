"use strict";

const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");
const sinon = require("sinon");

const tmpPath = path.join(process.cwd(), "tmp");
const { createTemplate } = require("../../lib/shipengine-core/create-template");
const cliPrompt = require("../../lib/shipengine-core/utils/cli-prompt");

describe("create template", () => {

  beforeEach(async () => {
    await fs.promises.mkdir(tmpPath);
    sinon.stub(cliPrompt, "cliPrompt").resolves({
      "project-name": "shipengine-integration",
      "project-type": "carrier"
    });
  });

  it("should create a project template with the default name", async () => {
    await createTemplate(tmpPath);
    const sampleAppPath = path.join(tmpPath, "shipengine-integration");
    expect(sampleAppPath).to.be.a.directory().with.contents(["src", "package.json", "tsconfig.json", "tslint.yaml"]);
  });

  afterEach(async () => {
    await fsExtra.remove(tmpPath);
  });
});
