"use strict";

const { RateShipmentWithMultipleServices } = require("../../../../../../lib/core/test-app/tests/rate-shipment-with-multiple-services");
const { CarrierApp } = require("@shipengine/connect-sdk/lib/internal/carriers/carrier-app");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");
const sinon = require("sinon");

describe("The rate shipment with multiple services test suite", () => {

  describe("when there are less than 2 delivery service definitions", () => {

    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices.pop();

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentWithMultipleServices(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });


  describe("when there is no shared address between the delivery services", () => {
    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].originCountries = ["MX"];
      appDefinition.deliveryServices[0].destinationCountries = ["MX"];

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentWithMultipleServices(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe("when there are multiple delivery services with an available address", () => {

    let testSuite;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };

      testSuite = new RateShipmentWithMultipleServices(args);
    });

    it("should generate a test", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(1);
    });

    it("the test params should be reflected in the title", () => {
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("weight: 50lb");
      expect(tests[0].title).to.include("deliveryServiceNames: Dummy Delivery Service, Better Delivery Service");

    });
  });

  describe("when there is a config override object of test suite parameters", () => {

    it("should update the test title", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);

      staticConfigTests.rateShipment_with_multiple_services = {
        weight: {
          value: 200,
          unit: "lb"
        }
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentWithMultipleServices(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("weight: 200lb");
      expect(tests[0].title).to.include("deliveryServiceNames: Dummy Delivery Service, Better Delivery Service");
    });
  });

  describe("when there is a config override array of test suite parameters", () => {

    let tests;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.rateShipment_with_multiple_services =
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
      const testSuite = new RateShipmentWithMultipleServices(args);
      tests = testSuite.tests();
    });


    it("should generate additional tests", () => {
      expect(tests.length).to.equal(2);
    });

    it("should update the test titles", () => {

      expect(tests[0].title).to.include("weight: 200lb");
      expect(tests[0].title).to.include("deliveryServiceNames: Dummy Delivery Service, Better Delivery Service");

      expect(tests[1].title).to.include("weight: 22lb");
      expect(tests[1].title).to.include("deliveryServiceNames: Dummy Delivery Service, Better Delivery Service");

    });
  });

  describe("When a user configs a delivery service that does not exist", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.rateShipment_with_multiple_services = {
        deliveryServiceNames: ["asdf", "iewojasdf"]
      }

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentWithMultipleServices(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("deliveryServiceName: 'asdf' does not exist");
      }
    });
  });

  describe("When a user configures delivery services that do no share an origin and destination country", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      appDefinition.deliveryServices.push({
        id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
        name: "Another Delivery Service",
        class: "ground",
        grade: "standard",
        originCountries: ["CA"],
        destinationCountries: ["CA"],
        labelFormats: ["pdf"],
        labelSizes: ["A4"],
        packaging: [pojo.packaging()]
      });

      const app = new CarrierApp(appDefinition);
      staticConfigTests.rateShipment_with_multiple_services = {
        deliveryServiceNames: ["Dummy Delivery Service", "Another Delivery Service"]
      }

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentWithMultipleServices(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("Configured delivery services must share origin and destination countries for correct rate generation");
      }
    });
  });

  describe("When a user configs a new delivery service", () => {
    it("should update the title params to reflect the new properties", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices.push({
        id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
        name: "Better Delivery Service",
        class: "ground",
        grade: "standard",
        originCountries: ["MX"],
        destinationCountries: ["MX"],
        labelFormats: ["pdf"],
        labelSizes: ["A4"],
        packaging: [pojo.packaging()]
      });

      staticConfigTests.rateShipment_with_multiple_services = {
        deliveryServiceNames: ["Better Delivery Service", "Dummy Delivery Service"]
      }

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentWithMultipleServices(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("deliveryServiceNames: Better Delivery Service, Dummy Delivery Service");
    });
  });

  describe("When a user configures a Ship To and Ship From address", () => {
    it("should update the test arguments and titles", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const app = new CarrierApp(appDefinition);

      staticConfigTests.rateShipment_with_multiple_services = {
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
      const testSuite = new RateShipmentWithMultipleServices(args);
      const tests = testSuite.tests();

      expect(tests[0].methodArgs.shipFrom.company).to.equal("Domestic Route #1");
      expect(tests[0].methodArgs.shipTo.company).to.equal("Domestic Route #2");

      expect(tests[0].methodArgs.shipTo).to.eql(staticConfigTests.rateShipment_with_multiple_services.shipTo);

      expect(tests[0].title).to.include("shipFrom: US");
      expect(tests[0].title).to.include("shipTo: US");

    });
  });

  describe("When delivery services in the request are missing in the response", () => {
    it("should throw an error", async () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const rate1 = pojo.rate();
      const rateResponse = [rate1];
      sinon.stub(CarrierApp.prototype, "rateShipment").resolves(rateResponse);
      const app = new CarrierApp(appDefinition);

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentWithMultipleServices(args);
      const tests = testSuite.tests();
      try {
        await tests[0].fn();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).includes("Rate for delivery service 'Better Delivery Service' is missing from the response");
      }
    });

    afterEach(() => {
      CarrierApp.prototype.rateShipment.restore();
    });
  });

  describe("When a deliveryService fulfillment property is set", () => {
    it("should throw an error if the response does not match it", async () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[1].fulfillmentService = "dhl_economy_select";

      const rate1 = pojo.rate();
      const rate2 = pojo.rate();
      rate1.deliveryService = appDefinition.deliveryServices[0];

      rate2.deliveryService = appDefinition.deliveryServices[1];

      const app = new CarrierApp(appDefinition);
      const rateResponse = [rate1, rate2];
      sinon.stub(CarrierApp.prototype, "rateShipment").resolves(rateResponse);

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new RateShipmentWithMultipleServices(args);
      const tests = testSuite.tests();
      try {
        await tests[0].fn();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).includes("Fulfillment Service is not set for 'Better Delivery Service' rate");
      }
    });
  });

});

function generateBasicAppAndConfigs() {
  const appDefinition = pojo.carrierApp();
  const deliveryService = pojo.deliveryService();
  deliveryService.labelFormats = ["pdf"];
  deliveryService.labelSizes = ["A4"];
  deliveryService.deliveryConfirmations = [pojo.deliveryConfirmation()];
  appDefinition.deliveryServices = [deliveryService];
  appDefinition.rateShipment = () => { };

  appDefinition.deliveryServices.push({
    id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
    name: "Better Delivery Service",
    class: "ground",
    grade: "standard",
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
    rateShipment_with_multiple_services: {}
  };

  const connectArgs = {};

  return { appDefinition, connectArgs, staticConfigTests, options };
}