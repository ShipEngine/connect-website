"use strict";
const { expect } = require("chai");
const subject = require("../../../../lib/core/utils/read-file");
const path = require("path");

describe("readFile", () => {
  it("reads and imports a commonjs file as a module", async () => {
    const response = await subject.readFile(
      path.join(process.cwd(), "test/fixtures/files/read-commonjs-test.js"),
    );
    expect(response.foo).equal("bar");
  });

  it("reads and imports a json file as a module", async () => {
    const response = await subject.readFile(
      path.join(process.cwd(), "test/fixtures/files/read-json-test.json"),
    );
    expect(response.foo).equal("bar");
  });

  it("reads and imports a yaml file as a module", async () => {
    const response = await subject.readFile(
      path.join(process.cwd(), "test/fixtures/files/read-yaml-test.yaml"),
    );
    expect(response.foo).equal("bar");
  });

  it("reads and imports a yml file as a module", async () => {
    const response = await subject.readFile(
      path.join(process.cwd(), "test/fixtures/files/read-yaml-test.yml"),
    );
    expect(response.foo).equal("bar");
  });

  it("throws an error when an absolute path is not given", async () => {
    let response;
    let errorResponse;

    try {
      response = await subject.readFile(
        "test/fixtures/files/read-json-test.json",
      );
    } catch (error) {
      errorResponse = error;
    }

    expect(response).to.be.undefined;
    expect(errorResponse).to.be.ok;
  });
});
