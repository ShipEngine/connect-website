"use strict";

const ipaasLoader = require("../..");
const { expect } = require("chai");
let inlineConfig;

describe("ipaasLoader() with inline config", () => {

  beforeEach(async () => {
    inlineConfig = await ipaasLoader({ pathToModule: "../fixtures/inline-config" });
  });

  it("should not attempt to dereference a config that has all properties inlined", () => {
    expect(inlineConfig.type).to.equal("order-source");
    expect(inlineConfig.getOrders).to.be.a("function");
    expect(inlineConfig.updateOrder).to.be.a("function");
    expect(inlineConfig.services).to.deep.equal(["these", "services"]);
    expect(inlineConfig.packageTypes).to.deep.equal(["these", "package", "types"]);
  });

});
