"use strict";

const { expect } = require("chai");
const pojo = require("../../../../utils/pojo");
const { findMatchingOriginAndDestinationCountries } = require("../../../../../lib/core/test-app/utils/find-matching-origin-and-destination-countries");
const { CarrierApp } = require("@shipengine/connect-sdk/lib/internal/carriers/carrier-app");

describe("findMatchingOriginAndDestinationCountries", () => {
  it("returns a set of origin and destination countries that all given delivery services share", () => {

    const appDefinition = pojo.carrierApp();
    const deliveryService = pojo.deliveryService();
    appDefinition.deliveryServices = [deliveryService];

    appDefinition.deliveryServices[0].originCountries = ["US", "MX", "CA"];
    appDefinition.deliveryServices[0].destinationCountries = ["US", "MX", "CA"];

    appDefinition.deliveryServices.push({
      id: "9df1bfda-7ee4-4f03-96f6-6eab52243eee",
      name: "Another Delivery Service",
      code: "ad",
      manifestType: "digital",
      originCountries: ["US", "MX", "CA"],
      destinationCountries: ["US", "MX", "CA"],
      labelFormats: ["pdf"],
      labelSizes: ["A4"],
      packaging: [pojo.packaging()]
    });

    appDefinition.deliveryServices.push({
      id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
      name: "Better Delivery Service",
      code: "bd",
      manifestType: "digital",
      originCountries: ["US", "MX"],
      destinationCountries: ["US", "MX"],
      packaging: [pojo.packaging()]
    });

    const app = new CarrierApp(appDefinition);

    const results = findMatchingOriginAndDestinationCountries(app.deliveryServices);
    expect(results.originCountries).to.be.eql(["US", "MX"]);
    expect(results.destinationCountries).to.be.eql(["US", "MX"]);
  });

  it("throw an error if only 0 or 1 delivery services are sent into the function", () => {
    const appDefinition = pojo.carrierApp();
    const deliveryService = pojo.deliveryService();
    appDefinition.deliveryServices = [deliveryService];

    const app = new CarrierApp(appDefinition);

    expect(() => findMatchingOriginAndDestinationCountries(app.deliveryServices)).to.throw(
      Error,
      /Multiple Delivery Services must be specified/,
    );
  });

  it("throws an error when a matching set of countries are unable to be found for the given delivery services", () => {

    const appDefinition = pojo.carrierApp();
    const deliveryService = pojo.deliveryService();
    appDefinition.deliveryServices = [deliveryService];

    appDefinition.deliveryServices[0].originCountries = ["US", "MX", "CA"];
    appDefinition.deliveryServices[0].destinationCountries = ["US", "MX", "CA"];

    appDefinition.deliveryServices.push({
      id: "9df1bfda-7ee4-4f03-96f6-6eab52243eee",
      name: "Another Delivery Service",
      code: "ad",
      manifestType: "digital",
      originCountries: ["CA"],
      destinationCountries: ["CA"],
      packaging: [pojo.packaging()]
    });

    appDefinition.deliveryServices.push({
      id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
      name: "Better Delivery Service",
      code: "bd",
      manifestType: "digital",
      originCountries: ["US", "MX"],
      destinationCountries: ["US", "MX"],
      packaging: [pojo.packaging()]
    });

    const app = new CarrierApp(appDefinition);

    expect(() => findMatchingOriginAndDestinationCountries(app.deliveryServices)).to.throw(
      Error,
      /Specified delivery services do not share origin and destination countries/,
    );
  });
});
