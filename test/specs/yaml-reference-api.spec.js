"use strict";

const ipaasLoader = require("../../lib");
const { expect } = require("chai");
// const path = require("path");
let jsonConfig;

describe("ipaasLoader() with reference to yaml config files that have nested references", () => {

  beforeEach(async () => {
    const pathToModule = "../fixtures/yaml-config";
    jsonConfig = await ipaasLoader({ pathToModule });
  });

  it("should properly dereference a config file", () => {
    expect(jsonConfig.type).to.equal("order-source");
    expect(jsonConfig.getOrders).to.be.a("function");
    expect(jsonConfig.updateOrder).to.be.a("function");
    expect(jsonConfig.services).to.deep.equal(["services", "go", "here"]);
    expect(jsonConfig.packageTypes).to.deep.equal(["package", "types", "go here"]);
  });

});
