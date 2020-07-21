const { CreateShipmentDomestic } = require("../../../../../../lib/core/test-app/tests/create-shipment-domestic");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");

describe("The create shipment domestic test suite", () => {

  describe("when there is no domestic service", () => {

    const { app, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    app.deliveryServices[0].originCountries = ["MX"]

    const args = { app, connectArgs, staticConfigTests, options };

    const testSuite = new CreateShipmentDomestic(args);

    it("should not generate tests", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  });


  describe("when there is not address available for a domestic services", () => {
    const { app, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    app.deliveryServices[0].originCountries = ["AQ"]
    app.deliveryServices[0].destinationCountries = ["AQ"]

    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new CreateShipmentDomestic(args);

    it("should not generate tests", () => {
      const tests = testSuite.tests();
      expect(tests.length).to.equal(0);
    });
  })

  describe("when there is a domestic service with an available address", () => {

    const { app, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const args = { app, connectArgs, staticConfigTests, options };
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

  describe.skip("when there is a config override object of test suite parameters", () => {
    const { app, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    staticConfigTests.createShipment_domestic = {
      weight: {
        value: 200
      },
      labelFormat: "png"
    };

    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new CreateShipmentDomestic(args);
    const tests = testSuite.tests();

    it("should update the test title", () => {
      expect(tests[0].title).to.include("labelFormat: png");
      expect(tests[0].title).to.include("labelSize: A4");
      expect(tests[0].title).to.include("weightUnit: lb");
      expect(tests[0].title).to.include("weightValue: 200");
    });
  });

  describe.skip("when there is a config override array of test suite parameters", () => {

    const { app, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    staticConfigTests.createShipment_domestic =
      [
        {
          weight: {
            value: 200
          },
          labelFormat: "png"
        },
        {
          weight: {
            value: 22
          },
          labelSize: "A6"
        }
      ];

    const args = { app, connectArgs, staticConfigTests, options };
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

  describe("When a user configs a delivery service that does not exist", () => {

    const { app, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    staticConfigTests.createShipment_domestic = {
      deliveryServiceName: "asdf"
    }

    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new CreateShipmentDomestic(args);

    it("should throw an error", () => {
      try {
        const tests = testSuite.tests();
        expect(true).to.equal(false);
      }
      catch (error) {
        expect(error.message).to.include("deliveryServiceName: 'asdf' does not exist");
      }
    });
  });

  describe("When a user configs a new delivery service", () => {
    const { app, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    app.deliveryServices.push({
      id: "123455",
      name: "Better Delivery Service",
      class: "ground",
      grade: "standard",
      originCountries: ["MX"],
      destinationCountries: ["MX"],
      labelFormats: ["pdf"],
      labelSizes: ["A4"],
      packaging: [pojo.packaging()]
    });

    staticConfigTests.createShipment_domestic = {
      deliveryServiceName: "Better Delivery Service"
    }

    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new CreateShipmentDomestic(args);
    const tests = testSuite.tests();

    it("should update the title params to reflect the new properties", () => {
      expect(tests[0].title).to.include("deliveryServiceName: Better Delivery Service");
      expect(tests[0].title).to.include("labelFormat: pdf");
    });
  });

  describe("When the input parameters do not match the return shipment", () => {

    it("should throw an error for a shipFrom mismatch");
    it("should throw an error for a shipTo mismatch");
    it("should throw an error for a deliveryService mismatch");
    it("should throw an error for a packaging mismatch");
    it("should throw an error for a weight mismatch");
    it("should throw an error for a dimensions mismatch");

  });

  describe("When a user configures a Ship To and Ship From address", () => {
    const { app, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();

    staticConfigTests.createShipment_domestic = {
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
    const testSuite = new CreateShipmentDomestic(args);
    const tests = testSuite.tests();

    it("should update the test arguments and titles", () => {
      expect(tests[0].methodArgs.shipFrom.company).to.equal("Domestic Route #1");
      expect(tests[0].methodArgs.shipTo.company).to.equal("Domestic Route #2");

      expect(tests[0].methodArgs.shipTo).to.eql(staticConfigTests.createShipment_domestic.shipTo);

      expect(tests[0].title).to.include("shipFrom: US");
      expect(tests[0].title).to.include("shipTo: US");

    });
  });

  
  describe("When a deliveryService fulfillment property is set", () => {

    it("should throw an error if the response does not match it")
  });

  describe("When a delivery service 'isTrackable' property is set", () => {
    it("")
  })

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
    createShipment_domestic: {}
  };

  const connectArgs = {};

  return { app, connectArgs, staticConfigTests, options };
}