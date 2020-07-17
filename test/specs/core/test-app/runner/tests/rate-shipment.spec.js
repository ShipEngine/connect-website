const { RateShipment } = require("../../../../../../lib/core/test-app/tests/rate-shipment");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");

describe.only("The rate shipment test suite", () => {

  describe("when the delivery services do not share origin or desination countries", () => {
    const { app, config, options } = generateBasicAppAndConfigs(); 
    app.deliveryServices[0].originCountries = ["AQ"]
    app.deliveryServices[0].destinationCountries = ["AQ"]

    app.deliveryServices.push(pojo.deliveryService());

    const args = { app, config, options, transaction: {} };
    const testSuite = new RateShipment(args);

    it("should display an error message to the user", () => {
      try {
        testSuite.tests()
        expect(true).to.equal(false);
      }
      catch(error) {
        expect(error.message).to.include("Specified delivery services do not share origin and destination countries");
      }
    });
  })

  describe("when there is one delivery service", () => {
    
    const { app, config, options } = generateBasicAppAndConfigs(); 
    const args = { app, config, options, transaction: {} };
    const testSuite = new RateShipment(args);

    const tests = testSuite.tests();

    it("should generate a test", () => {
      expect(tests.length).to.equal(1);
    });

    it("the test params should be reflected in the title", () => {
      expect(tests[0].title).to.include("weightUnit: lb");
      expect(tests[0].title).to.include("weightValue: 50");
    });
  });

  describe("when there are multiple valid delivery services", () => {
    const { app, config, options } = generateBasicAppAndConfigs(); 
    config.rateShipment = {
      weightValue: 200,
    };

    const args = { app, config, options, transaction: {} };
    const testSuite = new RateShipment(args);
    const tests = testSuite.tests();

    it("should generate tests and reflect that in the title", () => {
      expect(tests.length).to.equal(1);

      expect(tests[0].title).to.include("weightUnit: lb");
      expect(tests[0].title).to.include("weightValue: 200");
    });
  });

  describe("when there is a config override array of test suite parameters", () => {

    const { app, config, options } = generateBasicAppAndConfigs(); 
    config.rateShipment = 
      [
        {
          weightValue: 200,
        },
        {
          weightValue: 22,
        }
      ];

    const args = { app, config, options, transaction: {} };
    const testSuite = new RateShipment(args);
    const tests = testSuite.tests();

    it("should generate additional tests", () => {
      expect(tests.length).to.equal(2);
    });

    it("should update the test titles", () => {
      expect(tests[0].title).to.include("weightValue: 200");
      expect(tests[1].title).to.include("weightValue: 22");
    });
  });

  describe("When a user configs a delivery service that does not exist", () => {

    const { app, config, options } = generateBasicAppAndConfigs(); 
    config.rateShipment = {
      deliveryServiceNames: "asdf"
    }

    const args = { app, config, options, transaction: {} };
    const testSuite = new RateShipment(args);

    it("should throw an error", () => {
      try {
        testSuite.tests();
        expect(true).to.equal(false);
      }
      catch(error) {
        expect(error.message).to.include("deliveryServiceName: asdf does not exist");
      }
    });
  });

  describe("When a user configs a new delivery service", () => {
    const { app, config, options } = generateBasicAppAndConfigs(); 
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

    config.rateShipment = {
      deliveryServiceNames: ["Better Delivery Service"]
    }

    const args = { app, config, options, transaction: {} };
    const testSuite = new RateShipment(args);
    const tests = testSuite.tests();

    it("should update the title params to reflect the new properties", () => {
      expect(tests[0].title).to.include("deliveryServiceNames: Better Delivery Service");
    });
  });

  describe("When a user configs multiple new delivery services", () => {
    const { app, config, options } = generateBasicAppAndConfigs(); 
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

    app.deliveryServices.push({
      id: "123455",
      name: "New Delivery Service",
      class: "ground",
      grade: "standard",
      originCountries: ["MX"],
      destinationCountries: ["MX"],
      labelFormats: ["pdf"],
      labelSizes: ["A4"],
      packaging: [pojo.packaging()]
    });

    config.rateShipment = {
      deliveryServiceNames: ["Better Delivery Service", "New Delivery Service"]
    }

    const args = { app, config, options, transaction: {} };
    const testSuite = new RateShipment(args);
    const tests = testSuite.tests();

    it("should update the title params to reflect the new properties", () => {
      expect(tests[0].title).to.include("deliveryServiceNames: Better Delivery Service");
      expect(tests[0].title).to.include("New Delivery Service");

    });
  });

  describe("When a user configures a Ship To and Ship From address", () => {
    const { app, config, options } = generateBasicAppAndConfigs(); 

    config.rateShipment = {
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

    const args = { app, config, options, transaction: {} };
    const testSuite = new RateShipment(args);
    const tests = testSuite.tests();

    it("should update the test arguments and titles", () => {
      expect(tests[0].methodArgs[1].shipFrom.company).to.equal("Domestic Route #1");
      expect(tests[0].methodArgs[1].shipTo.company).to.equal("Domestic Route #2");

      expect(tests[0].methodArgs[1].shipTo).to.eql(config.rateShipment.shipTo);

      expect(tests[0].title).to.include("shipFrom: US");
      expect(tests[0].title).to.include("shipTo: US");

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
    rateShipment: {}
  };

  return { app, options, config };
}