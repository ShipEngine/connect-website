/* eslint-disable camelcase */
"use strict";

const { OrderApp } = require("@shipengine/connect-sdk/lib/internal/orders/order-app");
const { ShipmentCreated } = require("../../../../../lib/core/test-app/tests/shipment-created");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");
const sinon = require("sinon");


describe("The shipment created test suite", () => {
  it("should generate a test", () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new ShipmentCreated(args);

    const tests = testSuite.tests();
    expect(tests.length).to.equal(1);

    expect(Object.keys(tests[0].methodArgs)).to.include("trackingURL");
    expect(Object.keys(tests[0].methodArgs)).to.include("salesOrder");
    expect(Object.keys(tests[0].methodArgs)).to.include("carrierCode");
    expect(Object.keys(tests[0].methodArgs)).to.include("contents");
    expect(Object.keys(tests[0].methodArgs)).to.include("shipFrom");
  });

  it("should pass the right default methodArgs to that test", async () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    delete args.staticConfigTests;
    options.staticRootConfig.session.auth.accessToken = undefined;
    const testSuite = new ShipmentCreated(args);
    const tests = testSuite.tests();

    expect(tests[0].methodArgs.trackingNumber).to.equal(undefined);
    expect(tests[0].methodArgs.trackingURL).to.equal(undefined);
    expect(tests[0].methodArgs.salesOrder.id).to.equal("123456");
    expect(tests[0].methodArgs.carrierCode).to.equal(undefined);
    expect(tests[0].methodArgs.contents[0].salesOrderItem.id).to.equal("123456");
  });

  it("should let the testing config data override the defaults", () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new ShipmentCreated(args);
    const tests = testSuite.tests();

    expect(tests[0].methodArgs.trackingURL).to.equal("https://www.trackingUrl.com");
  });


  it("should pass a configured session object to the transaction property of the shipmentCreated method", async () => {

    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

    const shipmentCreatedStub = sinon.stub(OrderApp.prototype, "shipmentCreated");

    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new ShipmentCreated(args);

    const tests = testSuite.tests();

    await tests[0].fn();


    expect(shipmentCreatedStub.getCall(0).args[0].session).to.deep.equal({
      auth: {
        accessToken: "someAccessToken"
      }
    });

    afterEach(() => {
      if(OrderApp.prototype.shipmentCreated.restore) {
        OrderApp.prototype.shipmentCreated.restore();
      }
    });
  });

  it("should be able to pass info to the ShipmentCreated function and call it successfully", async () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new ShipmentCreated(args);

    const tests = testSuite.tests();

    await tests[0].fn();
  });


});

function generateBasicAppAndConfigs() {
  const appDefinition = pojo.orderApp();
  appDefinition.shipmentCreated = () => [];

  const connectArgs = {
    account_password: '1000000000001',
  };

  const options = {
    cli: {
      debug: false,
    },
    staticRootConfig: {
      debug: false,
      connectArgs: connectArgs,
      session: {
        auth: {
          accessToken: "someAccessToken",
        },
      },
    },
    defaults: {
      debug: false
    },
    failFast: false,
    retries: undefined,
    timeout: undefined
  };

  const staticConfigTests = {
    shipmentCreated: [
      {
        trackingURL: "https://www.trackingUrl.com"
      },
    ]
  };

  return { appDefinition, connectArgs, staticConfigTests, options };
}