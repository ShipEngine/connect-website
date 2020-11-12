/* eslint-disable camelcase */
"use strict";

const { CreateShipmentMultiPackage } = require("../../../../../lib/core/test-app/tests/create-shipment-multipackage");
const { CarrierApp } = require("@shipengine/connect-sdk/lib/internal/carriers/carrier-app");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");
const sinon = require("sinon");

describe("The create shipment multipackage test suite", () => {

  describe("when there is no address available for a delivery service", () => {

    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].availableCountries = ["AQ"]

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentMultiPackage(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe("when there is no delivery service that supports multiple packages", () => {

    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].allowsMultiplePackages = false;

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentMultiPackage(args);

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
      testSuite = new CreateShipmentMultiPackage(args);
    });

    it("should generate a test", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(1);
    });

    it("the test params should be reflected in the title", () => {
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("shipFrom: US");
      expect(tests[0].title).to.include("shipTo: US");
      expect(tests[0].title).to.include("packages: 2");
    });
  });



  describe("when there is a config override object of test suite parameters", () => {
    it("should update the test title", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);

      staticConfigTests.createShipment_multi_package = {
        packages: [
          {
            packagingName: "Dummy Packaging",
            weight: {
              value: 200,
              unit: "lb"
            },
            label: {
              size: "4x6",
              format: "png"
            },
            dimensions: {
              length: 5,
              width: 5,
              height: 5,
              unit: "cm"
            }
          },
          {
            packagingName: "Dummy Packaging",
            weight: {
              value: 222,
              unit: "lb"
            },
            label: {
              size: "4x6",
              format: "png"
            }
          }
        ]
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentMultiPackage(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("packages: 2");
    });
  });

  describe("when there is a config override array of test suite parameters", () => {

    let tests;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);

      staticConfigTests.createShipment_multi_package =
        [
          {
            packages: [
              {
                packagingName: "Dummy Packaging",
                weight: {
                  value: 200,
                  unit: "lb"
                },
                label: {
                  size: "4x6",
                  format: "png"
                }
              },
              {
                packagingName: "Dummy Packaging",
                weight: {
                  value: 222,
                  unit: "lb"
                },
                label: {
                  size: "4x6",
                  format: "png"
                }
              }
            ]
          },
          {
            packages: [
              {
                packagingName: "Dummy Packaging",
                weight: {
                  value: 200,
                  unit: "lb"
                },
                label: {
                  size: "4x6",
                  format: "png"
                }
              },
              {
                packagingName: "Dummy Packaging",
                weight: {
                  value: 222,
                  unit: "lb"
                },
                label: {
                  size: "4x6",
                  format: "png"
                }
              }
            ]
          }
        ];

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentMultiPackage(args);
      tests = testSuite.tests();
    });


    it("should generate additional tests", () => {
      expect(tests.length).to.equal(2);
    });

    it("should update the test titles", () => {
      expect(tests[0].title).to.include("packages: 2");


      expect(tests[1].title).to.include("packages: 2");

    });
  });

  describe("When a user configs a delivery service that does not exist", () => {

    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].allowsMultiplePackages = false;
      const app = new CarrierApp(appDefinition);

      staticConfigTests.createShipment_multi_package = {
        deliveryServiceName: "asdf"
      }


      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentMultiPackage(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("deliveryServiceName: 'asdf' does not exist");
      }
    });
  });

  describe("When a user configs a delivery service that does not support multiple packages", () => {

    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].allowsMultiplePackages = false;
      const app = new CarrierApp(appDefinition);

      staticConfigTests.createShipment_multi_package = {
        deliveryServiceName: "Dummy Delivery Service"
      }

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentMultiPackage(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("deliveryServiceName: 'Dummy Delivery Service' does not support multi-package shipments");
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
        manifestType: "digital",
        allowsMultiplePackages: true,
        availableCountries: ["MX"],
        labelFormats: ["pdf"],
        labelSizes: ["A4"],
        packaging: [pojo.packaging()]
      });

      const app = new CarrierApp(appDefinition);

      staticConfigTests.createShipment_multi_package = {
        deliveryServiceName: "Better Delivery Service"
      }

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentMultiPackage(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("deliveryServiceName: Better Delivery Service");
    });
  });

  describe("When a user configures a Ship To and Ship From address", () => {
    it("should update the test arguments and titles", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      staticConfigTests.createShipment_multi_package = {
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

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentMultiPackage(args);
      const tests = testSuite.tests();

      expect(tests[0].methodArgs.shipFrom.company).to.equal("Domestic Route #1");
      expect(tests[0].methodArgs.shipTo.company).to.equal("Domestic Route #2");

      expect(tests[0].methodArgs.shipTo).to.eql(staticConfigTests.createShipment_multi_package.shipTo);

      expect(tests[0].title).to.include("shipFrom: US");
      expect(tests[0].title).to.include("shipTo: US");

    });
  });

  describe("When a delivery service 'isTrackable' property is set", () => {
    it("should throw an error if no tracking number is returned", async () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      appDefinition.deliveryServices[0].isTrackable = true;
      const confirmationMock = pojo.shipmentConfirmation();
      sinon.stub(CarrierApp.prototype, "createShipment").resolves(confirmationMock);
      const app = new CarrierApp(appDefinition);

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentMultiPackage(args);
      const tests = testSuite.tests();
      try {
        await tests[0].fn();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).includes("The shipmentConfirmation.isTrackable returned from createShipment must be present when the given deliveryService.isTrackable is set to 'true'");
      }
    });

    afterEach(() => {
      CarrierApp.prototype.createShipment.restore();
    });
  });
});

function generateBasicAppAndConfigs() {
  const appDefinition = pojo.carrierApp();
  const deliveryService = pojo.deliveryService();
  deliveryService.labelFormats = ["pdf"];
  deliveryService.labelSizes = ["A4"];
  deliveryService.code = "priority_overnight";
  deliveryService.allowsMultiplePackages = true;
  deliveryService.deliveryConfirmations = [pojo.deliveryConfirmation()];
  appDefinition.deliveryServices = [deliveryService];
  appDefinition.createShipment = () => { };

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
    createShipment_multi_package: {}
  };

  const connectArgs = {};

  return { appDefinition, connectArgs, staticConfigTests, options };
}
