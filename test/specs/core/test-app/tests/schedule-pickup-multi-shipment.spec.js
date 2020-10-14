/* eslint-disable camelcase */
"use strict";

const { SchedulePickupMultiShipment } = require("../../../../../lib/core/test-app/tests/schedule-pickup-multi-shipment");
const { CarrierApp } = require("@shipengine/connect-sdk/lib/internal/carriers/carrier-app");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");

describe.only("The schedule pickup multi shipment test suite", () => {

  describe("when there is no address available for the delivery service", () => {
    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].originCountries = ["AQ"];
      appDefinition.deliveryServices[0].destinationCountries = ["AQ"];

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new SchedulePickupMultiShipment(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe.only("when there is a delivery service with an available address", () => {

    let testSuite;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };

      testSuite = new SchedulePickupMultiShipment(args);
    });

    it("should generate a test", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(1);
    });

    it("the test params should be reflected in the title", () => {
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("shipments: 2");
      expect(tests[0].title).to.include("pickupServiceName: Dummy Pickup Service");
      expect(tests[0].methodArgs.shipments[0].deliveryService.name).to.equal("Dummy Delivery Service");

    });
  });

  describe("when there is a config override object of test suite parameters", () => {

    it("should update the test title", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);

      staticConfigTests.schedulePickup_same_day = {
        contact: { name: "Jane Doe" },
        shipments: [{
          deliveryServiceName: "Dummy Delivery Service",
          packages: [
            {
              packagingName: "Dummy Packaging",
              dimensions: {
                length: 5,
                width: 5,
                height: 5,
                unit: "in"
              },
              weight: {
                value: 1,
                unit: "lb"
              }
            }
          ]
        }]

      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new SchedulePickupMultiShipment(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("contact: Jane Doe");
      expect(tests[0].title).to.include("deliveryServiceName: Dummy Delivery Service");
    });
  });

  describe("when there is a config override array of test suite parameters", () => {

    let tests;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.schedulePickup_same_day =
        [
          {
            contact: { name: "Jane Doe" }
          },
          {
            contact: { name: "Doe Jane" }
          }
        ];

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new SchedulePickupMultiShipment(args);
      tests = testSuite.tests();
    });


    it("should generate additional tests", () => {
      expect(tests.length).to.equal(2);
    });

    it("should update the test titles", () => {

      expect(tests[0].title).to.include("contact: Jane Doe");
      expect(tests[0].title).to.include("deliveryServiceName: Dummy Delivery Service");

      expect(tests[1].title).to.include("contact: Doe Jane");
      expect(tests[1].title).to.include("deliveryServiceName: Dummy Delivery Service");

    });
  });

  describe("When a user configs a pickup service that does not exist", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.schedulePickup_same_day = {
        pickupServiceName: "asdf"
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new SchedulePickupMultiShipment(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("pickupServiceName: 'asdf' does not exist");
      }
    });
  });

  describe("When a user configs a delivery service that does not exist", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.schedulePickup_same_day = {
        deliveryServiceName: "asdf"
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new SchedulePickupMultiShipment(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("deliveryServiceName: 'asdf' does not exist");
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
        originCountries: ["MX"],
        destinationCountries: ["MX"],
        labelFormats: ["pdf"],
        manifestType: "physical",
        labelSizes: ["A4"],
        packaging: [pojo.packaging()]
      });

      staticConfigTests.schedulePickup_same_day = {
        deliveryServiceName: "Better Delivery Service"
      };

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new SchedulePickupMultiShipment(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("deliveryServiceName: Better Delivery Service");
    });
  });

  describe("When a user configs a new pickup service", () => {
    it("should update the title params to reflect the new properties", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.pickupServices.push({
        id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
        name: "Better Pickup Service",
        code: "better_ds"
      });

      staticConfigTests.schedulePickup_same_day = {
        pickupServiceName: "Better Pickup Service"
      };

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new SchedulePickupMultiShipment(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("pickupServiceName: Better Pickup Service");
    });
  });

  describe("When a user configures an address", () => {
    it("should update the test arguments and titles", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const app = new CarrierApp(appDefinition);

      staticConfigTests.schedulePickup_same_day = {
        address: {
          company: "Domestic Route #1",
          addressLines: ["123 New Street"],
          cityLocality: "Houston",
          stateProvince: "TX",
          country: "US",
          postalCode: "77422",
          timeZone: "America/Chicago"
        }
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new SchedulePickupMultiShipment(args);
      const tests = testSuite.tests();

      expect(tests[0].methodArgs.address.company).to.equal("Domestic Route #1");

      expect(tests[0].methodArgs.address).to.eql(staticConfigTests.schedulePickup_same_day.address);

      expect(tests[0].title).to.include("address: US");
    });
  });
});

function generateBasicAppAndConfigs() {
  const appDefinition = pojo.carrierApp();
  const deliveryService = pojo.deliveryService();
  deliveryService.labelFormats = ["pdf"];
  deliveryService.labelSizes = ["A4"];
  // deliveryService.deliveryConfirmations = [pojo.deliveryConfirmation()];
  appDefinition.deliveryServices = [deliveryService];
  appDefinition.pickupServices = [pojo.pickupService()];
  appDefinition.schedulePickup = () => { };

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
    schedulePickup_same_day: {}
  };

  const connectArgs = {};

  return { appDefinition, connectArgs, staticConfigTests, options };
}
