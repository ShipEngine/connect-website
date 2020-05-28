"use strict";

const { loadApp } = require("../../lib");
const { expect } = require("chai");

describe("loadApp() with inline config", () => {

  it("should load a carrier app", async () => {
    let app = await loadApp("test/fixtures/apps/carrier/inline");

    expect(app.manifest.name).to.equal("@carrier/inline-app");
    expect(app.manifest.version).to.equal("0.0.1");
    expect(app.manifest.description).to.equal("");

    expect(app.type).to.equal("carrier");
    expect(app.sdkVersion).to.equal(0);
    expect(app.name).to.equal("My Carrier");
    expect(app.description).to.equal("My Carrier description goes here");
    expect(app.websiteURL.href).to.equal("https://www.my-carrier.com/");
    expect(app.logo).to.be.a("string");

    expect(app.deliveryServices).to.be.an("array");
    expect(app.deliveryServices).to.be.an("array").with.lengthOf(1);
    expect(app.deliveryServices[0].name).to.equal("Priority Overnight");

    expect(app.deliveryServices[0].deliveryConfirmations[0].name).to.equal("Adult Signature");

    expect(app.pickupServices).to.be.an("array");
    expect(app.pickupServices).to.be.an("array").with.lengthOf(1);
    expect(app.pickupServices[0].name).to.equal("Drop Off Pickup");

    expect(app.connectionForm).to.be.an("object");
    expect(app.connectionForm.dataSchema.title).to.equal("Carrier One Registration");

    expect(app.settingsForm).to.be.an("object");
    expect(app.settingsForm.dataSchema.title).to.equal("Carrier One Settings");

    expect(app.connect).to.be.a("function");
    expect(app.schedulePickup).to.be.a("function");
    expect(app.cancelPickups).to.be.a("function");
    expect(app.createShipment).to.be.a("function");
    expect(app.cancelShipments).to.be.a("function");
    expect(app.rateShipment).to.be.a("function");
    expect(app.trackShipment).to.be.a("function");
    expect(app.createManifest).to.be.a("function");
  });

  it("should load a order app", async () => {
    let app = await loadApp("test/fixtures/apps/order/inline");

    expect(app.manifest.name).to.equal("@order/inline-app");
    expect(app.manifest.version).to.equal("0.0.1");
    expect(app.manifest.description).to.equal("");

    expect(app.type).to.equal("order");
    expect(app.sdkVersion).to.equal(0);
    expect(app.name).to.equal("My Order");
    expect(app.description).to.equal("My order description goes here");
    expect(app.websiteURL.href).to.equal("https://www.my-order.com/");
    expect(app.logo).to.be.a("string");

    expect(app.connectionForm).to.be.an("object");
    expect(app.connectionForm.dataSchema.title).to.equal("Order One Registration");

    expect(app.settingsForm).to.be.an("object");
    expect(app.settingsForm.dataSchema.title).to.equal("Order One Settings");

    expect(app.connect).to.be.a("function");
    expect(app.getSeller).to.be.a("function");
    expect(app.getSalesOrder).to.be.a("function");
    expect(app.getSalesOrdersByDate).to.be.a("function");
  });

});
