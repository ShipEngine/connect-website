/* eslint-disable camelcase */
"use strict";

const { OrderApp } = require("@shipengine/connect-sdk/lib/internal/orders/order-app");
const { GetSalesOrdersByDate } = require("../../../../../lib/core/test-app/tests/get-sales-orders-by-date");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");
const sinon = require("sinon");

describe("The getSalesOrdersByDate test suite", () => {
  it("should generate a test", () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new GetSalesOrdersByDate(args);

    const tests = testSuite.tests();
    expect(tests.length).to.equal(1);
  });

  it("should pass the right methodArgs to that test", async () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new GetSalesOrdersByDate(args);
    const tests = testSuite.tests();

    expect(Object.keys(tests[0].methodArgs)).to.include("startDateTime");
    expect(Object.keys(tests[0].methodArgs)).to.include("endDateTime");
  });

  it("should let the testing config data override the defaults", () => {
    let { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new OrderApp(appDefinition);

    const today = new Date();

    staticConfigTests = {
      getSalesOrdersByDate: {
        startDateTime: today,
        endDateTime: new Date()
      }
    };

    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new GetSalesOrdersByDate(args);
    const tests = testSuite.tests();

    expect(tests[0].methodArgs.startDateTime).to.equal(today);
  });

  it("should pass a configured session object to the transaction property of the getSalesOrdersByDate method", async () => {

    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

    const getSalesOrdersByDateStub = sinon.stub(OrderApp.prototype, "getSalesOrdersByDate");

    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new GetSalesOrdersByDate(args);

    const tests = testSuite.tests();

    await tests[0].fn();


    expect(getSalesOrdersByDateStub.getCall(0).args[0].session).to.deep.equal({
      auth: {
        accessToken: "someAccessToken"
      }
    });

    afterEach(() => {
      if (OrderApp.prototype.getSalesOrdersByDate.restore) {
        OrderApp.prototype.getSalesOrdersByDate.restore();
      }
    });
  });

  it("should be able to pass info to the getSalesOrdersByDate function and call it successfully", async () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

    sinon.stub(OrderApp.prototype, "getSalesOrdersByDate").resolves([]);
    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new GetSalesOrdersByDate(args);

    const tests = testSuite.tests();

    await tests[0].fn();
  });
});

function generateBasicAppAndConfigs() {
  const appDefinition = pojo.orderApp();
  appDefinition.getSalesOrdersByDate = () => [];

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

  };

  return { appDefinition, connectArgs, staticConfigTests, options };
}