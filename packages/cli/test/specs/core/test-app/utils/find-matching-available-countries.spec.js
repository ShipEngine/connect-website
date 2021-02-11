"use strict";

const { expect } = require("chai");
const pojo = require("../../../../utils/pojo");
const { findMatchingAvailableCountries } = require("../../../../../lib/core/test-app/utils/find-matching-available-countries");
const { CarrierApp } = require("@shipengine/connect-sdk/lib/internal/carriers/carrier-app");

describe("findMatchingAvailableCountries", () => {
  it("returns a set of available countries that all given delivery services share", () => {

    const appDefinition = pojo.carrierApp();
    const deliveryService = pojo.deliveryService();
    appDefinition.deliveryServices = [deliveryService];

    appDefinition.deliveryServices[0].availableCountries = ["US", "MX", "CA"];

    appDefinition.deliveryServices.push({
      id: "9df1bfda-7ee4-4f03-96f6-6eab52243eee",
      name: "Another Delivery Service",
      code: "ad",
      manifestType: "digital",
      availableCountries: ["US", "MX", "CA"],
      labelFormats: ["pdf"],
      labelSizes: ["A4"],
      packaging: [pojo.packaging()]
    });

    appDefinition.deliveryServices.push({
      id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
      name: "Better Delivery Service",
      code: "bd",
      manifestType: "digital",
      availableCountries: ["US", "MX"],
      packaging: [pojo.packaging()]
    });

    const app = new CarrierApp(appDefinition);
    const results = findMatchingAvailableCountries(app.deliveryServices);
    expect(results.length).to.equal(2);
  });

  it("throw an error if only 0 or 1 delivery services are sent into the function", () => {
    const appDefinition = pojo.carrierApp();
    const deliveryService = pojo.deliveryService();
    appDefinition.deliveryServices = [deliveryService];

    const app = new CarrierApp(appDefinition);

    expect(() => findMatchingAvailableCountries(app.deliveryServices)).to.throw(
      Error,
      /Multiple Delivery Services must be specified/,
    );
  });

  it("throws an error when a matching set of countries are unable to be found for the given delivery services", () => {

    const appDefinition = pojo.carrierApp();
    const deliveryService = pojo.deliveryService();
    appDefinition.deliveryServices = [deliveryService];

    appDefinition.deliveryServices[0].availableCountries = ["US", "MX", "CA"];

    appDefinition.deliveryServices.push({
      id: "9df1bfda-7ee4-4f03-96f6-6eab52243eee",
      name: "Another Delivery Service",
      code: "ad",
      manifestType: "digital",
      availableCountries: ["CA"],
      packaging: [pojo.packaging()]
    });

    appDefinition.deliveryServices.push({
      id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
      name: "Better Delivery Service",
      code: "bd",
      manifestType: "digital",
      availableCountries: ["US", "MX"],
      packaging: [pojo.packaging()]
    });

    const app = new CarrierApp(appDefinition);

    expect(() => findMatchingAvailableCountries(app.deliveryServices)).to.throw(
      Error,
      /Specified delivery services do not share origin and destination countries/,
    );
  });
});
