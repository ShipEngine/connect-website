"use strict";

const ipaasLoader = require("../../lib");
const { expect } = require("chai");
let jsonConfig;

describe("ipaasLoader() with reference to json config files that have nested schema references", () => {

  beforeEach(async () => {
    const pathToModule = "../fixtures/integration-apps/carrier-json-app";
    jsonConfig = await ipaasLoader({ pathToModule });
  });

  it("should properly dereference a config file", () => {
    expect(jsonConfig.type).to.equal("carrier");
    expect(jsonConfig.name).to.equal("My Carrier");
    expect(jsonConfig.description).to.equal("My Carrier description goes here");
    expect(jsonConfig.url).to.equal("https://www.my-carrier.com");
    expect(jsonConfig.logo).to.equal("./logo.svg");

    expect(jsonConfig.deliveryServices).to.be.an("array");
    expect(jsonConfig.deliveryServices).to.be.an("array").with.lengthOf(1);
    expect(jsonConfig.deliveryServices[0].name).to.equal("Priority Overnight");


    expect(jsonConfig.pickupServices).to.be.an("array");
    expect(jsonConfig.pickupServices).to.be.an("array").with.lengthOf(2);
    expect(jsonConfig.pickupServices[0].name).to.equal("Drop Off Pickup");
    expect(jsonConfig.pickupServices[1].name).to.equal("One Time Pickup");

    expect(jsonConfig.registrationForm).to.be.an("object");
    expect(jsonConfig.registrationForm.dataSchema.title).to.equal("Carrier One Registration");

    expect(jsonConfig.settingsForm).to.be.an("object");
    expect(jsonConfig.settingsForm.dataSchema.title).to.equal("Carrier One Settings");

    expect(jsonConfig.requestPickup).to.be.a("function");
  });

});
