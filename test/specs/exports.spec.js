"use strict";

const commonJSExport = require("../../");
const { default: defaultExport, shipengine: namedExport } = require("../../");
const { expect } = require("chai");

describe("shipengine-cli package exports", () => {

  it("should export the shipengine() function as the default CommonJS export", () => {
    expect(commonJSExport).to.be.a("function");
    expect(commonJSExport.name).to.equal("shipengine");
  });

  it("should export the shipengine() function as the default ESM export", () => {
    expect(defaultExport).to.be.a("function");
    expect(defaultExport).to.equal(commonJSExport);
  });

  it("should export the shipengine() function as a named export", () => {
    expect(namedExport).to.be.a("function");
    expect(namedExport).to.equal(commonJSExport);
  });

  it("should not export anything else", () => {
    expect(commonJSExport).to.have.same.keys(
      "default",
      "shipengine",
    );
  });

});
