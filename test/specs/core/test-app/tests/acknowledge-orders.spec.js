/* eslint-disable camelcase */
"use strict";

const { OrderApp } = require("@shipengine/connect-sdk/lib/internal/orders/order-app");
const { AcknowledgeOrders } = require("../../../../../lib/core/test-app/tests/acknowledge-orders");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");

describe("The acknowledge orders test suite", () => {
  it("should generate a test", () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new AcknowledgeOrders(args);

    const tests = testSuite.tests();
    expect(tests.length).to.equal(1);
  });

  it("should pass the right methodArgs to that test", async () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new AcknowledgeOrders(args);
    const tests = testSuite.tests();

    expect(Object.keys(tests[0].methodArgs.notifications[0])).to.include("id");
    expect(Object.keys(tests[0].methodArgs.notifications[0])).to.include("identifiers");
    expect(Object.keys(tests[0].methodArgs.notifications[0])).to.include("orderNumber");
    expect(Object.keys(tests[0].methodArgs.notifications[0])).to.include("importedDate");
  });

  it("should let the testing config data override the defaults", () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new AcknowledgeOrders(args);
    const tests = testSuite.tests();

    expect(tests[0].methodArgs.notifications[0].id).to.equal('a09cma09cm');
  });

  it("should be able to pass info to the acknowledgeOrders function and call it successfully", async () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new OrderApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new AcknowledgeOrders(args);

    const tests = testSuite.tests();

    await tests[0].fn();
  });
});

function generateBasicAppAndConfigs() {
  const appDefinition = pojo.orderApp();
  appDefinition.acknowledgeOrders = () => [];

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
    },
    defaults: {
      debug: false
    },
    failFast: false,
    retries: undefined,
    timeout: undefined
  };

  const staticConfigTests = {
    acknowledgeOrders: [
      {
        notifications: [
          {
            id: 'a09cma09cm',
            identifiers: {
              id: 'lksldm',
            },
            orderNumber: "987987987",
            importedDate: "2005-09-23T17:30:00+05:30",
          }
        ]
      },
    ]
  };

  return { appDefinition, connectArgs, staticConfigTests, options };
}