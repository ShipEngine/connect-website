/* eslint-disable camelcase */
"use strict";

const { CancelShipmentsMultiple } = require("../../../../../lib/core/test-app/tests/cancel-shipments-multiple");
const { CarrierApp } = require("@shipengine/connect-sdk/lib/internal/carriers/carrier-app");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");
const sinon = require("sinon");
const { v4 } = require("uuid");

describe("The cancel multiple shipments test suite", () => {

  describe("when there is not address available for the delivery services", () => {
    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].availableCountries = ["AQ"];

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CancelShipmentsMultiple(args);

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

      testSuite = new CancelShipmentsMultiple(args);
    });

    it("should generate a test", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(1);
    });

    it("the test params should be reflected in the title", () => {
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("2 shipments");
      expect(tests[0].methodArgs[0].shipTo.stateProvince).to.equal("CA");
      expect(tests[0].methodArgs[0].shipFrom.stateProvince).to.equal("TX");
      expect(tests[0].methodArgs[1].shipTo.stateProvince).to.equal("CA");
      expect(tests[0].methodArgs[1].shipFrom.stateProvince).to.equal("TX");
    });
  });

  describe("when there is a config override object of test suite parameters", () => {

    it("should update the testParams", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const newPackaging = pojo.packaging();
      newPackaging.name = "New Package";
      appDefinition.deliveryServices[0].packaging.push(newPackaging);

      const app = new CarrierApp(appDefinition);

      staticConfigTests.cancelShipments_multiple = {
        shipments: [
          {
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
          },
          {
            weight: {
              value: 10,
              unit: "lb"
            },
            dimensions: {
              length: 10,
              width: 10,
              height: 10,
              unit: "cm"
            }
          }
        ]
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CancelShipmentsMultiple(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("2 shipments");
      expect(tests[0].methodArgs[0].packages[0].weight.value).to.equal(200);
      expect(tests[0].methodArgs[1].packages[0].weight.value).to.equal(10);
    });
  });


  describe("when the user overrides the tests with only one shipment", () => {
    it("should generate an error", () => {

      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const newPackaging = pojo.packaging();
      newPackaging.name = "New Package";
      appDefinition.deliveryServices[0].packaging.push(newPackaging);

      const app = new CarrierApp(appDefinition);

      staticConfigTests.cancelShipments_multiple = {
        shipments: [
          {
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
          }
        ]
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CancelShipmentsMultiple(args);
      expect(() => testSuite.tests()).to.throw("connect.config.js shipments must contain two or more shipments");
    });
  });

  describe("When a user configs a delivery service that does not exist", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.cancelShipments_multiple = {
        shipments: [
          {
            deliveryServiceName: "asdf"
          },
          {
            deliveryServiceName: "asdf"
          }
        ]
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CancelShipmentsMultiple(args);

      expect(() => testSuite.tests()).to.throw("deliveryServiceName: 'asdf' does not exist");
    });
  });

  describe("When a user configs a new delivery service", () => {
    it("should update the methodargs to reflect the new properties", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices.push({
        id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
        name: "Better Delivery Service",
        code: "better_ds",
        manifestType: "physical",
        availableCountries: ["MX"],
        labelFormats: ["pdf"],
        labelSizes: ["A4"],
        packaging: [pojo.packaging()]
      });

      staticConfigTests.cancelShipments_multiple = {
        shipments: [
          {
            deliveryServiceName: "Better Delivery Service"
          },
          {
            deliveryServiceName: "Dummy Delivery Service"
          }
        ]
      };

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CancelShipmentsMultiple(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("2 shipments");
      expect(tests[0].methodArgs[0].deliveryService.id).to.equal("9cf1bfda-7ee4-4f03-96f6-6eab52243eee");
      expect(tests[0].methodArgs[1].deliveryService.id).to.equal("22222222-2222-2222-2222-222222222222");
    });
  });

  describe("When a user configs a more than two shipments", () => {
    it("should update the methodargs to reflect the new properties", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices.push({
        id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
        name: "Better Delivery Service",
        code: "better_ds",
        manifestType: "physical",
        availableCountries: ["MX"],
        labelFormats: ["pdf"],
        labelSizes: ["A4"],
        packaging: [pojo.packaging()]
      });

      staticConfigTests.cancelShipments_multiple = {
        shipments: [
          {
            deliveryServiceName: "Better Delivery Service"
          },
          {
            deliveryServiceName: "Dummy Delivery Service"
          },
          {
            deliveryServiceName: "Better Delivery Service"
          }
        ]
      };

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CancelShipmentsMultiple(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("3 shipments");
      expect(tests[0].methodArgs[0].deliveryService.id).to.equal("9cf1bfda-7ee4-4f03-96f6-6eab52243eee");
      expect(tests[0].methodArgs[1].deliveryService.id).to.equal("22222222-2222-2222-2222-222222222222");
    });
  });

  describe("When a delivery service has addresses that we don't have samples but user uses valid configs", () => {
    it("should generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      appDefinition.deliveryServices[0].availableCountries = ["AQ", "US"];


      const app = new CarrierApp(appDefinition);

      staticConfigTests.cancelShipments_multiple = {
        shipments: [
          {
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
            },
          },
          {
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
          }
        ]
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CancelShipmentsMultiple(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("2 shipments");
      expect(tests[0].methodArgs[0].shipFrom.cityLocality).to.equal("Houston");
      expect(tests[0].methodArgs[1].shipFrom.cityLocality).to.equal("Houston");
    });
  });

  describe("When a valid shipment is created and the cancellation ids do not match", async () => {

    it("should throw an error", async () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const confirmationMock = pojo.shipmentConfirmation();
      confirmationMock.packages.push(pojo.packageConfirmation());

      sinon.stub(CarrierApp.prototype, "createShipment").resolves(confirmationMock);

      const shipmentCancelledOutcomeMock = [
        {
          cancellationId: v4(),
        },
        {
          cancellationId: v4()
        }
      ];

      sinon.stub(CarrierApp.prototype, "cancelShipments").resolves(shipmentCancelledOutcomeMock);

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CancelShipmentsMultiple(args);
      const tests = testSuite.tests();

      try {
        await tests[0].fn();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).includes("The shipmentCancellationConfirmation cancellationID does not match the one that was included in the shipmentCancellation");
      }
    });

    afterEach(() => {
      CarrierApp.prototype.createShipment.restore();
      CarrierApp.prototype.cancelShipments.restore();
    });
  });

});

function generateBasicAppAndConfigs() {
  const appDefinition = pojo.carrierApp();
  const deliveryService = pojo.deliveryService();
  deliveryService.manifestType = "digital";
  deliveryService.labelFormats = ["pdf"];
  deliveryService.code = "priority_overnight";
  deliveryService.labelSizes = ["A4"];
  deliveryService.availableCountries = ["US"];
  deliveryService.deliveryConfirmations = [pojo.deliveryConfirmation()];
  deliveryService.packaging.push(pojo.packaging());
  appDefinition.deliveryServices = [deliveryService];
  appDefinition.createShipment = () => { };
  appDefinition.cancelShipments = () => { };

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
    cancelShipments: {}
  };

  const connectArgs = {};

  return { appDefinition, connectArgs, staticConfigTests, options };
}
