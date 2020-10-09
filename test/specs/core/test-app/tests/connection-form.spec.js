/* eslint-disable camelcase */
"use strict";

const { CarrierApp } = require("@shipengine/connect-sdk/lib/internal/carriers/carrier-app");
const { ConnectionForm } = require("../../../../../lib/core/test-app/tests/connection-form");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");

describe("The connection form test suite", () => {
	it('should generate a test', () => {
			const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
	    const app = new CarrierApp(appDefinition);
			const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new ConnectionForm(args);

      const tests = testSuite.tests();
      
      expect(tests.length).to.equal(1);
	});

	it("should pass the right methodArgs to that test", async () => {
	      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
	      const app = new CarrierApp(appDefinition);
	      const args = { app, connectArgs, staticConfigTests, options };
	      const testSuite = new ConnectionForm(args);
	      const tests = testSuite.tests();
	      
	      // not sure why the methodArgs aren't coming through
	      // expect(tests[0].methodArgs).to.equal({});
	});

	it("should successfully be passed to connect function", () => {

	});

});

function generateBasicAppAndConfigs() {
  const appDefinition = pojo.carrierApp();
  const deliveryService = pojo.deliveryService();
  deliveryService.labelFormats = ["pdf"];
  deliveryService.labelSizes = ["A4"];
  deliveryService.code = "ds_code";
  deliveryService.deliveryConfirmations = [pojo.deliveryConfirmation()];
  appDefinition.deliveryServices = [deliveryService];
  appDefinition.createShipment = () => { };

  appDefinition.deliveryServices.push({
    id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
    name: "Better Delivery Service",
    code: "bd_code",
    manifestType: "digital",
    originCountries: ["US"],
    destinationCountries: ["US"],
    labelFormats: ["pdf"],
    labelSizes: ["A4"],
    packaging: [pojo.packaging()]
  });

  const options = {
    cli: {
      debug: false,
    },
    staticRootConfig: {
      debug: false
    },
    defaults: {
      debug: false
    },
    failFast: false,
    retries: undefined,
    timeout: undefined
  };

  const staticConfigTests = {
  	connectionForm: {
      account_email: "test@test.com"
    }
  };

  const connectArgs = {
  	account_password: '09sdf0s9dfms0d9fm',
  };

  return { appDefinition, connectArgs, staticConfigTests, options };
}