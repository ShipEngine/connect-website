"use strict";

const commonJSExport = require("../../");
const { default: defaultExport, loadApp: namedExport } = require("../../");
const { expect } = require("chai");

describe("@shipengine/integration-platform-loader exports", () => {

  it("should export the Integration Platform Loader object as the default CommonJS export", () => {
    expect(commonJSExport).to.be.an("object");
    expect(commonJSExport.loadApp).to.be.a("function").with.property("name", "loadApp");
  });

  it("should export the Integration Platform Loader object as the default ESM export", () => {
    expect(defaultExport).to.be.an("object");
    expect(defaultExport.loadApp).to.be.a("function").with.property("name", "loadApp");
  });

  it("should export the loadApp() function as a named export", () => {
    expect(namedExport).to.be.a("function");
    expect(namedExport.name).to.equal("loadApp");
    expect(namedExport).to.equal(commonJSExport.loadApp);
    expect(namedExport).to.equal(defaultExport.loadApp);
  });

  it("should not export anything else", () => {
    expect(commonJSExport).to.have.same.keys(
      "default",
      "loadApp",
    );
  });

});
