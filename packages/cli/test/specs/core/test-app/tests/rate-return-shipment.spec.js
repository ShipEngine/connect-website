/* eslint-disable camelcase */
"use strict";

const { RateShipmentReturn } = require("../../../../../lib/core/test-app/tests/rate-shipment-return");
const { CarrierApp } = require("@shipengine/connect-sdk/lib/internal/carriers/carrier-app");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");
const sinon = require("sinon");

describe("The rate return shipment test suite", () => {

  describe("when there is no address available for the delivery service", () => {
    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].availableCountries = ["AQ"];

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentReturn(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe("when there is no delivery service available that supports returns", () => {
    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].supportsReturns = false;

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentReturn(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe("when there is a delivery service with an available address", () => {

    let testSuite;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };

      testSuite = new RateShipmentReturn(args);
    });

    it("should generate a test", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(1);
    });

    it("the test params should be reflected in the title", () => {
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("weight: 50lb");
      expect(tests[0].title).to.include("deliveryServiceName: Dummy Delivery Service");

    });
  });

  describe("when there is a config override object of test suite parameters", () => {

    it("should update the test title", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);

      staticConfigTests.rateShipment_return = {
        weight: {
          value: 200,
          unit: "lb"
        },
        dimensions: {
          length: 5,
          width: 5,
          height: 5,
          unit: "cm"
        }
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentReturn(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("weight: 200lb");
      expect(tests[0].title).to.include("deliveryServiceName: Dummy Delivery Service");
      expect(tests[0].title).to.include("dimensions: 5 x 5 x 5 cm");
    });
  });

  describe("when there is a config override array of test suite parameters", () => {

    let tests;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.rateShipment_return =
        [
          {
            weight: {
              value: 200,
              unit: "lb"
            }
          },
          {
            weight: {
              value: 22,
              unit: "lb"
            }
          }
        ];

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentReturn(args);
      tests = testSuite.tests();
    });


    it("should generate additional tests", () => {
      expect(tests.length).to.equal(2);
    });

    it("should update the test titles", () => {

      expect(tests[0].title).to.include("weight: 200lb");
      expect(tests[0].title).to.include("deliveryServiceName: Dummy Delivery Service");

      expect(tests[1].title).to.include("weight: 22lb");
      expect(tests[1].title).to.include("deliveryServiceName: Dummy Delivery Service");

    });
  });

  describe("When a user configs a delivery service that does not exist", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.rateShipment_return = {
        deliveryServiceName: "asdf"
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentReturn(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("deliveryServiceName: 'asdf' does not exist");
      }
    });
  });

  describe("When a user configs a delivery service that does not support returns", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices.push({
        id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
        name: "Better Delivery Service",
        code: "better_ds",
        availableCountries: ["MX"],
        labelFormats: ["pdf"],
        manifestType: "physical",
        labelSizes: ["A4"],
        packaging: [pojo.packaging()],
        supportsReturns: false
      });
      
      const app = new CarrierApp(appDefinition);
     
      staticConfigTests.rateShipment_return = {
        deliveryServiceName: "Better Delivery Service"
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentReturn(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("deliveryServiceName: 'Better Delivery Service' does not support returns");
      }
    });
  });

  describe("When a user configs a new delivery service", () => {
    it("should update the title params to reflect the new properties", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices.push({
        id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
        name: "Better Delivery Service",
        code: "better_ds",
        availableCountries: ["MX"],
        labelFormats: ["pdf"],
        manifestType: "physical",
        labelSizes: ["A4"],
        supportsReturns: true,
        packaging: [pojo.packaging()]
      });

      staticConfigTests.rateShipment_return = {
        deliveryServiceName: "Better Delivery Service"
      };

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentReturn(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("deliveryServiceName: Better Delivery Service");
    });
  });

  describe("When a user configures a Ship To and Ship From address", () => {
    it("should update the test arguments and titles", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const app = new CarrierApp(appDefinition);

      staticConfigTests.rateShipment_return = {
        shipFrom: {
          company: "Domestic Route #1",
          addressLines: ["123 New Street"],
          cityLocality: "Houston",
          stateProvince: "TX",
          country: "US",
          postalCode: "77422",
          timeZone: "America/Chicago"
        },
        shipTo: {
          company: "Domestic Route #2",
          addressLines: ["123 New Street"],
          cityLocality: "Houston",
          stateProvince: "TX",
          country: "US",
          postalCode: "77422",
          timeZone: "America/Chicago"
        }
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentReturn(args);
      const tests = testSuite.tests();

      expect(tests[0].methodArgs.shipFrom.company).to.equal("Domestic Route #1");
      expect(tests[0].methodArgs.shipTo.company).to.equal("Domestic Route #2");

      expect(tests[0].methodArgs.shipTo).to.eql(staticConfigTests.rateShipment_return.shipTo);

      expect(tests[0].title).to.include("shipFrom: US");
      expect(tests[0].title).to.include("shipTo: US");
    });
  });

  describe("When the delivery service in the request is missing in the response", () => {
    it("should throw an error", async () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const rateResponse = [];
      sinon.stub(CarrierApp.prototype, "rateShipment").resolves(rateResponse);
      const app = new CarrierApp(appDefinition);

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentReturn(args);
      const tests = testSuite.tests();
      try {
        await tests[0].fn();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).includes("Rate for delivery service 'Dummy Delivery Service' is missing from the response");
      }
    });

    afterEach(() => {
      CarrierApp.prototype.rateShipment.restore();
    });
  });
});

function generateBasicAppAndConfigs() {
  const appDefinition = pojo.carrierApp();
  const deliveryService = pojo.deliveryService();
  deliveryService.labelFormats = ["pdf"];
  deliveryService.labelSizes = ["A4"];
  deliveryService.deliveryConfirmations = [pojo.deliveryConfirmation()];
  deliveryService.supportsReturns = true;
  appDefinition.deliveryServices = [deliveryService];
  appDefinition.rateShipment = () => { };

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
    RateShipmentReturn: {}
  };

  const connectArgs = {};

  return { appDefinition, connectArgs, staticConfigTests, options };
}
