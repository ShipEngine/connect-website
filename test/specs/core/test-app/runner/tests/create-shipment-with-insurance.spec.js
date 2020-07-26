"use strict";

const { CreateShipmentWithInsurance } = require("../../../../../../lib/core/test-app/tests/create-shipment-with-insurance");
const { CarrierApp } = require("@shipengine/integration-platform-sdk/lib/internal/carriers/carrier-app");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");
const sinon = require("sinon");

describe("The create shipment insured test suite", () => {

  describe("when there is no delivery service that supports insurance", () => {

    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].isInsurable = false;
      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentWithInsurance(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });


  describe("when there is not address available for a delivery service services", () => {
    it("should not generate tests", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices[0].originCountries = ["AQ"];
      appDefinition.deliveryServices[0].destinationCountries = ["AQ"];

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentWithInsurance(args);

      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe("when there is a insurable delivery service with an available address", () => {

    let testSuite;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };

      testSuite = new CreateShipmentWithInsurance(args);
    });

    it("should generate a test", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(1);
    });

    it("the test params should be reflected in the title", () => {
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("packageInsuredValue: 10 USD");
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

      staticConfigTests.createShipment_with_insurance = {
        weight: {
          value: 200,
          unit: "lb"
        },
        packagingName: "New Package",
        packageInsuredValue: {
          value: "50",
          currency: "usd"
        }
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentWithInsurance(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("packagingName: New Package");
      expect(tests[0].title).to.include("packageInsuredValue: 50 usd");

    });
  });

  describe("when there is a config override array of test suite parameters", () => {

    let tests;
    beforeEach(() => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.createShipment_with_insurance =
        [
          {
            weight: {
              value: 200,
              unit: "lb"
            },
            packageInsuredValue: {
              value: "50",
              currency: "usd"
            }
          },
          {
            weight: {
              value: 22,
              unit: "lb"
            },
            packageInsuredValue: {
              value: "50",
              currency: "usd"
            }
          }
        ];

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentWithInsurance(args);
      tests = testSuite.tests();
    });


    it("should generate additional tests", () => {
      expect(tests.length).to.equal(2);
    });

    it("should update the test titles", () => {
      expect(tests[0].title).to.include("weight: 200lb");
      expect(tests[0].title).to.include("packageInsuredValue: 50 usd");


      expect(tests[1].title).to.include("weight: 22lb");
      expect(tests[1].title).to.include("packageInsuredValue: 50 usd");
    });
  });

  describe("When a user configs a delivery service that does not exist", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      const app = new CarrierApp(appDefinition);
      staticConfigTests.createShipment_with_insurance = {
        deliveryServiceName: "asdf"
      };

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentWithInsurance(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("deliveryServiceName: 'asdf' does not exist");
      }
    });
  });

  describe("When a user configs a delivery service that is not insurable", () => {
    it("should throw an error", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices.push({
        id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
        isInsurable: false,
        name: "Uninsured Delivery Service",
        class: "ground",
        grade: "standard",
        originCountries: ["MX"],
        destinationCountries: ["MX"],
        labelFormats: ["pdf"],
        labelSizes: ["A4"],
        packaging: [pojo.packaging()]
      });

      const app = new CarrierApp(appDefinition);
      staticConfigTests.createShipment_with_insurance = {
        deliveryServiceName: "Uninsured Delivery Service"
      };
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentWithInsurance(args);

      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("The configured delivery service 'Uninsured Delivery Service' does not support insuring packages");
      }
    });
  });

  describe("When a user configs a new delivery service", () => {
    it("should update the title params to reflect the new properties", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
      appDefinition.deliveryServices.push({
        id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
        isInsurable: true,
        name: "Better Delivery Service",
        class: "ground",
        grade: "standard",
        originCountries: ["MX"],
        destinationCountries: ["MX"],
        labelFormats: ["pdf"],
        labelSizes: ["A4"],
        packaging: [pojo.packaging()]
      });

      staticConfigTests.createShipment_with_insurance = {
        deliveryServiceName: "Better Delivery Service"
      }

      const app = new CarrierApp(appDefinition);
      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentWithInsurance(args);
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("deliveryServiceName: Better Delivery Service");
    });
  });

  describe("When a user configures a Ship To and Ship From address", () => {
    it("should update the test arguments and titles", () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const app = new CarrierApp(appDefinition);

      staticConfigTests.createShipment_with_insurance = {
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
      const testSuite = new CreateShipmentWithInsurance(args);
      const tests = testSuite.tests();

      expect(tests[0].methodArgs.shipFrom.company).to.equal("Domestic Route #1");
      expect(tests[0].methodArgs.shipTo.company).to.equal("Domestic Route #2");

      expect(tests[0].methodArgs.shipTo).to.eql(staticConfigTests.createShipment_with_insurance.shipTo);

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
      const testSuite = new CreateShipmentWithInsurance(args);
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

  describe("When the input parameters do not match the return shipment", () => {

    it("should throw an error for a packaging length mismatch", async () => {
      const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

      const confirmationMock = pojo.shipmentConfirmation();
      confirmationMock.packages.push(pojo.packageConfirmation());
      sinon.stub(CarrierApp.prototype, "createShipment").resolves(confirmationMock);
      const app = new CarrierApp(appDefinition);

      const args = { app, connectArgs, staticConfigTests, options };
      const testSuite = new CreateShipmentWithInsurance(args);
      const tests = testSuite.tests();
      try {
        await tests[0].fn();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).includes("The shipment confirmation packages array should have the same number of packages that were on the request");
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
  deliveryService.isInsurable = true;
  deliveryService.deliveryConfirmations = [pojo.deliveryConfirmation()];
  deliveryService.packaging.push(pojo.packaging());
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
    createShipment_with_insurance: {}
  };

  const connectArgs = {};

  return { appDefinition, connectArgs, staticConfigTests, options };
}