/* eslint-disable camelcase */
"use strict";

const { TrackShipmentReturn } = require("../../../../../lib/core/test-app/tests/track-shipment-return");
const { CarrierApp } = require("@shipengine/connect-sdk/lib/internal/carriers/carrier-app");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");
const sinon = require("sinon");

describe("The track return shipment test suite", () => {

  describe("when there is no delivery service", () => {

    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].originCountries = ["MX"];

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });


  describe("when there is not address available for a delivery service", () => {
    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].originCountries = ["AQ"];
      appDefinition.deliveryServices[0].destinationCountries = ["AQ"];

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe("when there is not a delivery service that supports tracking", () => {
    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].isTrackable = false;

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe("when there is not a delivery service that supports returns", () => {
    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].supportsReturns = false;

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe("when there is a delivery service with an available address that supports tracking and returns", () => {

    let testSuite;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };

      testSuite = new TrackShipmentReturn(args);
    });

    it("should generate a test", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(1);
    });

    it("the test params should be reflected in the title", () => {
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("label: A4 pdf");
      expect(tests[0].title).to.include("weight: 50lb");
    });
  });

  describe("when there is a config override object of test suite parameters", () => {

    it("should update the test title", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const newPackaging = pojo.packaging();
      newPackaging.name = "New Package";
      appDefinition.deliveryServices[0].packaging.push(newPackaging);

      const app = new CarrierApp(appDefinition);

      staticConfigTests.trackShipment_return = {
        weight: {
          value: 200,
          unit: "lb"
        },

        label: {
          size: "A6",
          format: "png"
        },
        dimensions: {
          length: 5,
          width: 5,
          height: 5,
          unit: "cm"
        }
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("label: A6 png");
      expect(tests[0].title).to.include("weight: 200lb");
      expect(tests[0].title).to.include("dimensions: 5 x 5 x 5 cm");
    });
  });

  describe("when there is a config override array of test suite parameters", () => {

    let tests;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.trackShipment_return =
        [
          {
            weight: {
              value: 200,
              unit: "lb"
            },
            label: {
              size: "A6",
              format: "png"
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
      const testSuite = new TrackShipmentReturn(args);
      tests = testSuite.tests();
    });


    it("should generate additional tests", () => {
      expect(tests.length).to.equal(2);
    });

    it("should update the test titles", () => {
      expect(tests[0].title).to.include("weight: 200lb");
      expect(tests[0].title).to.include("label: A6 png");

      expect(tests[1].title).to.include("weight: 22lb");
    });
  });

  describe("When a user configs a delivery service that does not exist", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.trackShipment_return = {
        deliveryServiceName: "asdf"
      }

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("deliveryServiceName: 'asdf' does not exist");
      }
    });
  });

  describe("When a user configs a delivery service that does not support tracking", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      
      appDefinition.deliveryServices.push({
        id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
        name: "Better Delivery Service",
        code: "better_ds",
        manifestType: "physical",
        originCountries: ["MX"],
        destinationCountries: ["MX"],
        labelFormats: ["pdf"],
        labelSizes: ["A4"],
        packaging: [pojo.packaging()]
      });

      const app = new CarrierApp(appDefinition);
      staticConfigTests.trackShipment_return = {
        deliveryServiceName: "Better Delivery Service"
      }

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include(`connect.config.js deliveryServiceName: "Better Delivery Service" does not support tracking`);
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
        manifestType: "physical",
        originCountries: ["MX"],
        destinationCountries: ["MX"],
        labelFormats: ["pdf"],
        labelSizes: ["A4"],
        isTrackable: true,
        packaging: [pojo.packaging()]
      });

      const app = new CarrierApp(appDefinition);
      staticConfigTests.trackShipment_return = {
        deliveryServiceName: "Better Delivery Service"
      }

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include(`connect.config.js deliveryServiceName: "Better Delivery Service" does not support returns`);
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
        manifestType: "physical",
        originCountries: ["MX"],
        supportsReturns: true,
        destinationCountries: ["MX"],
        labelFormats: ["pdf"],
        labelSizes: ["A4"],
        isTrackable: true,
        packaging: [pojo.packaging()]
      });

      staticConfigTests.trackShipment_return = {
        deliveryServiceName: "Better Delivery Service"
      }

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("deliveryServiceName: Better Delivery Service");
      expect(tests[0].title).to.include("label: A4 pdf");
    });
  });

  describe("When a delivery service has addresses that we don't have samples but user uses valid configs", () => {
    it("should generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      appDefinition.deliveryServices[0].originCountries = ["AQ", "US"];
      appDefinition.deliveryServices[0].destinationCountries = ["AQ", "US"];


      const app = new CarrierApp(appDefinition);

      staticConfigTests.trackShipment_return = {
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
      const testSuite = new TrackShipmentReturn(args);
      const tests = testSuite.tests();
      expect(tests.length).to.equal(1);
    });
  });

  describe("When a user configures a Ship To and Ship From address", () => {
    it("should update the test arguments and titles", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const app = new CarrierApp(appDefinition);

      staticConfigTests.trackShipment_return = {
        shipFrom: {
          company: "Domestic Route #1",
          addressLines: ["123 New Street"],
          cityLocality: "Houston",
          stateProvince: "TX",
          country: "US",
          postalCode: "77422"
        },
        shipTo: {
          company: "Domestic Route #2",
          addressLines: ["123 New Street"],
          cityLocality: "Houston",
          stateProvince: "TX",
          country: "US",
          postalCode: "77422"
        }
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);
      const tests = testSuite.tests();

      expect(tests[0].methodArgs.shipFrom.company).to.equal("Domestic Route #1");
      expect(tests[0].methodArgs.shipTo.company).to.equal("Domestic Route #2");

      expect(tests[0].methodArgs.shipTo).to.eql(staticConfigTests.trackShipment_return.shipTo);

      expect(tests[0].title).to.include("shipFrom: US");
      expect(tests[0].title).to.include("shipTo: US");

    });
  });

  describe("When the packages in the tracking info does not match those from the shipment confirmation", () => {

    it("should throw an error for a packaging length mismatch", async () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const confirmationMock = pojo.shipmentConfirmation();
      
      const trackingInfoMock = {
        packages: [
          confirmationMock.packages[0],
          pojo.packageConfirmation()
        ]
      };

      sinon.stub(CarrierApp.prototype, "createShipment").resolves(confirmationMock);
      sinon.stub(CarrierApp.prototype, "trackShipment").resolves(trackingInfoMock);
      const app = new CarrierApp(appDefinition);

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);
      const tests = testSuite.tests();
      try {
        await tests[0].fn();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).includes("The tracking info packages array should have the same number of packages that were on the shipment confirmation");
      }
    });

    afterEach(() => {
      CarrierApp.prototype.createShipment.restore();
      CarrierApp.prototype.trackShipment.restore();
    });
  });

  describe("When the tracking number in the tracking info does not match the tracking number from the shipment confirmation", () => {

    it("should throw an error for a tracking number mismatch", async () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const confirmationMock = pojo.shipmentConfirmation();
      confirmationMock.trackingNumber = "8765-4321";

      const trackingInfoMock = {
        trackingNumber: "1234-5678",
        packages: [
          confirmationMock.packages[0],
        ]
      };

      sinon.stub(CarrierApp.prototype, "createShipment").resolves(confirmationMock);
      sinon.stub(CarrierApp.prototype, "trackShipment").resolves(trackingInfoMock);
      const app = new CarrierApp(appDefinition);

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new TrackShipmentReturn(args);
      const tests = testSuite.tests();
      try {
        await tests[0].fn();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.have.string("The tracking number from the shipping confirmation does not match the tracking number from the tracking info response");
      }
    });

    afterEach(() => {
      CarrierApp.prototype.createShipment.restore();
      CarrierApp.prototype.trackShipment.restore();
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
  deliveryService.deliveryConfirmations = [pojo.deliveryConfirmation()];
  deliveryService.isTrackable = true;
  deliveryService.supportsReturns = true;
  deliveryService.packaging.push(pojo.packaging());
  appDefinition.deliveryServices = [deliveryService];
  appDefinition.createShipment = () => { };
  appDefinition.trackShipment = () => { };

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
    trackShipment: {}
  };

  const connectArgs = {};

  return { appDefinition, connectArgs, staticConfigTests, options };
}
