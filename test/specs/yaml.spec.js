"use strict";

const { loadApp } = require("../../lib");
const { expect } = require("chai");

describe("YAML apps", () => {

  it("should load a carrier app", async () => {
    let app = await loadApp("test/fixtures/apps/carrier/yaml");

    expect(app.manifest.name).to.equal("@carrier/yaml-app");
    expect(app.manifest.version).to.equal("0.0.1");
    expect(app.manifest.description).to.equal("");

    expect(app.type).to.equal("carrier");
    expect(app.id).to.be.a("string");
    expect(app.name).to.equal("My Carrier");
    expect(app.description).to.equal("My Carrier description goes here");
    expect(app.websiteURL.href).to.equal("https://www.my-carrier.com/");
    expect(app.logo).to.be.a("string");

    expect(app.deliveryServices).to.be.an("array");
    expect(app.deliveryServices).to.be.an("array").with.lengthOf(1);
    expect(app.deliveryServices[0].name).to.equal("Priority Overnight");

    expect(app.deliveryServices[0].deliveryConfirmations[0].name).to.equal("Adult Signature");

    expect(app.deliveryServices[0].packaging[0].name).to.equal("Flat-Rate Box");
    expect(app.deliveryServices[0].packaging[1].name).to.equal("Large Padded Envelope");

    expect(app.pickupServices).to.be.an("array");
    expect(app.pickupServices).to.be.an("array").with.lengthOf(2);
    expect(app.pickupServices[0].name).to.equal("Drop Off Pickup");
    expect(app.pickupServices[1].name).to.equal("One Time Pickup");

    expect(app.connectionForm).to.be.an("object");
    expect(app.connectionForm.dataSchema.title).to.equal("Order One Registration");

    expect(app.settingsForm).to.be.an("object");
    expect(app.settingsForm.dataSchema.title).to.equal("Order One Settings");

    expect(app.connect).to.be.a("function");
    expect(app.schedulePickup).to.equal(undefined);
    expect(app.cancelPickups).to.equal(undefined);
    expect(app.createShipment).to.equal(undefined);
    expect(app.cancelShipments).to.equal(undefined);
    expect(app.rateShipment).to.equal(undefined);
    expect(app.trackShipment).to.equal(undefined);
    expect(app.createManifest).to.equal(undefined);
  });

  it("should load a order app", async () => {
    let app = await loadApp("test/fixtures/apps/order/yaml");

    expect(app.manifest.name).to.equal("@order/yaml-app");
    expect(app.manifest.version).to.equal("0.0.1");
    expect(app.manifest.description).to.equal("");

    expect(app.id).to.be.a("string");
    expect(app.name).to.equal("My Order");
    expect(app.description).to.equal("My Order description goes here");
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
