const { CreateShipmentDomestic } = require("../../../../../../lib/core/test-app/tests/create-shipment-domestic");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");

describe("The create shipment domestic test suite", () => {

  describe("when there is no domestic service", () => {

    const { app, config, options } = generateBasicAppAndConfigs(); 
    app.deliveryServices[0].originCountries = ["MX"]

    const args = { app, config: {}, options: {}, transaction: {} };
    const testSuite = new CreateShipmentDomestic(args);

    it("should not generate tests", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });

  describe("when there is not address available for a domestic services", () => {
    const { app, config, options } = generateBasicAppAndConfigs(); 
    app.deliveryServices[0].originCountries = ["AQ"]
    app.deliveryServices[0].destinationCountries = ["AQ"]

    const args = { app, config, options, transaction: {} };
    const testSuite = new CreateShipmentDomestic(args);

    it("should not generate tests", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  })

  describe("when there is a domestic service with an available address", () => {
    
    const { app, config, options } = generateBasicAppAndConfigs(); 
    const args = { app, config, options, transaction: {} };
    const testSuite = new CreateShipmentDomestic(args);

    it("should generate a test", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(1);
    });

    it("the test params should be reflected in the title", () => {
      const tests = testSuite.tests();

      expect(tests[0].title).to.include("labelFormat: pdf");
      expect(tests[0].title).to.include("labelSize: A4");
      expect(tests[0].title).to.include("weightUnit: lb");
      expect(tests[0].title).to.include("weightValue: 50");
    });
  });

  describe("when there is a config override object of test suite parameters", () => {
    const { app, config, options } = generateBasicAppAndConfigs(); 
    config.createShipment_domestic = {
      weightValue: 200,
      labelFormat: "png"
    };

    const args = { app, config, options, transaction: {} };
    const testSuite = new CreateShipmentDomestic(args);
    const tests = testSuite.tests();

    it("should update the test title", () => {
      expect(tests[0].title).to.include("labelFormat: png");
      expect(tests[0].title).to.include("labelSize: A4");
      expect(tests[0].title).to.include("weightUnit: lb");
      expect(tests[0].title).to.include("weightValue: 200");
    });
  });

  describe("when there is a config override array of test suite parameters", () => {

    const { app, config, options } = generateBasicAppAndConfigs(); 
    config.createShipment_domestic = 
      [
        {
          weightValue: 200,
          labelFormat: "png"
        },
        {
          weightValue: 22,
          labelSize: "A6"
        }
      ];

    const args = { app, config, options, transaction: {} };
    const testSuite = new CreateShipmentDomestic(args);
    const tests = testSuite.tests();

    it("should generate additional tests", () => {
      expect(tests.length).to.equal(2);
    });

    it("should update the test titles", () => {
      expect(tests[0].title).to.include("weightValue: 200");
      expect(tests[0].title).to.include("labelFormat: png");

      expect(tests[1].title).to.include("weightValue: 22");
      expect(tests[1].title).to.include("labelSize: A6");
    });
  });
});

function generateBasicAppAndConfigs() {
  const app = pojo.carrierApp();
  const deliveryService = pojo.deliveryService();
  deliveryService.labelFormats = ["pdf"];
  deliveryService.labelSizes = ["A4"];
  deliveryService.deliveryConfirmations = [pojo.deliveryConfirmation()];
  app.deliveryServices = [deliveryService];

  const options = {
    cli: {
      debug: false,
    },
    rootConfig: {
      debug: false
    },
    defaults: {
      debug: false
    },
    failFast: false,
    retries: undefined,
    timeout: undefined
  };

  const config = {
    createShipment_domestic: {}
  };

  return { app, options, config };
}