"use strict";

const { loadApp } = require("../../lib");
const { expect } = require("chai");

describe("TypeScript apps", () => {

  it("should load a carrier app", async () => {
    let app = await loadApp("test/fixtures/apps/carrier/typescript");

    expect(app.name).to.equal("@carrier/typescript-app");
    expect(app.version).to.equal("0.0.1");
    expect(app.description).to.equal("");

    expect(app.carrier.id).to.be.a("string");
    expect(app.carrier.name).to.equal("My Carrier");
    expect(app.carrier.description).to.equal("My Carrier description goes here");
    expect(app.carrier.websiteURL.href).to.equal("https://www.my-carrier.com/");
    expect(app.carrier.logo).to.be.a("string");

    expect(app.carrier.deliveryServices).to.be.an("array");
    expect(app.carrier.deliveryServices).to.be.an("array").with.lengthOf(1);
    expect(app.carrier.deliveryServices[0].name).to.equal("Ground");
    expect(app.carrier.deliveryServices[0].packaging[0].name).to.equal("Flat-Rate Box");
    expect(app.carrier.deliveryServices[0].packaging[1].name).to.equal("Large Padded Envelope");

    expect(app.carrier.pickupServices).to.be.an("array");
    expect(app.carrier.pickupServices).to.be.an("array").with.lengthOf(2);
    expect(app.carrier.pickupServices[0].name).to.equal("Drop Off Pickup");
    expect(app.carrier.pickupServices[1].name).to.equal("One Time Pickup");

    expect(app.carrier.createLabel).to.be.a("function");
    expect(app.carrier.voidLabels).to.be.a("function");
    expect(app.carrier.getRates).to.be.a("function");
    expect(app.carrier.track).to.be.a("function");
    expect(app.carrier.createManifest).to.be.a("function");
    expect(app.carrier.schedulePickup).to.be.a("function");
    expect(app.carrier.cancelPickup).to.be.a("function");
  });

  it("should load a connection app", async () => {
    let app = await loadApp("test/fixtures/apps/connection/typescript");

    expect(app.name).to.equal("@connection/typescript-app");
    expect(app.version).to.equal("0.0.1");
    expect(app.description).to.equal("");

    expect(app.connection.id).to.be.a("string");
    expect(app.connection.name).to.equal("My Connection");
    expect(app.connection.description).to.equal("My Connection description goes here");
    expect(app.connection.websiteURL.href).to.equal("https://www.my-connection.com/");
    expect(app.connection.logo).to.be.a("string");

    expect(app.connection.connectForm).to.be.an("object");
    expect(app.connection.connectForm.dataSchema.title).to.equal("Connection One Registration");

    expect(app.connection.settingsForm).to.be.an("object");
    expect(app.connection.settingsForm.dataSchema.title).to.equal("Connection One Settings");

    expect(app.connection.connect).to.be.a("function");
  });

});
