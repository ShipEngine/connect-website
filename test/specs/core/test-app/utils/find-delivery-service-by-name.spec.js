"use strict";

const { expect } = require("chai");
const pojo = require("../../../utils/pojo");
const findDeliveryServiceByName = require("../../../../../lib/core/test-app/utils/find-delivery-service-by-name")
  .default;

const app = pojo.carrierApp();

describe("findDeliveryServiceByName", () => {
  it("returns a delivery service when a delivery service exist for the given name", () => {
    const name = "Dummy Delivery Service";
    const subject = findDeliveryServiceByName(name, app);
    expect(subject.name).to.equal(name);
  });

  it("throws an error when a delivery service does not exist for the given name", () => {
    expect(() => findDeliveryServiceByName("invalid", app)).to.throw(
      Error,
      /connect.config.js deliveryServiceName:/,
    );
  });
});
