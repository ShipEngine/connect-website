const { CreateShipmentDomestic } = require("../../../../../../lib/core/test-app/tests/create-shipment-domestic");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");

describe("The create shipment domestic test suite", () => {

  describe("when there is no domestic service", () => {

    const app = pojo.carrierApp();
    const deliveryService = pojo.deliveryService();
    deliveryService.originCountries = ["MX"];
    app.deliveryServices = [deliveryService];

    const args = { app, config: {}, options: {}, transaction: {}};
    const testSuite = new CreateShipmentDomestic(args);

    it("should not generate tests", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe("when there is not address available for a domestic services", () => {
    const app = pojo.carrierApp();
    const deliveryService = pojo.deliveryService();
    deliveryService.originCountries = ["AQ"];
    deliveryService.destinationCountries = ["AQ"];

    app.deliveryServices = [deliveryService];

    const args = { app, config: {}, options: {}, transaction: {}};
    const testSuite = new CreateShipmentDomestic(args);
    it("should not generate tests", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  })

  describe.only("when there is a domestic service with an available address", () => {
    const app = pojo.carrierApp();
    const deliveryService = pojo.deliveryService();
    deliveryService.labelFormats = ["pdf"];
    deliveryService.labelSizes = ["A4"];

    app.deliveryServices = [deliveryService]; 
    
    const args = { app, config: {}, options: {}, transaction: {}};
    const testSuite = new CreateShipmentDomestic(args);

    it("should generate a test", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(1);
    });

    it("the test params should be reflected in the title")
  });

  describe("when therer is a config override object of test suite parameters", () => {
    it("should update the test configurations")
    it("should update the test title");
  });

  describe("when therer is a config override array of test suite parameters", () => {
    it("should update the test configurations");
    it("should update the test titles");
    it("should generate additional tests");
  });

});