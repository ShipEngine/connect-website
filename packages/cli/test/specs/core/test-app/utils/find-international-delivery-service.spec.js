"use strict";

const { expect } = require("chai");
const pojo = require("../../../../utils/pojo");
const findInternationalDeliveryService = require("../../../../../lib/core/test-app/utils/find-international-delivery-service")
  .default;

describe("findDeliveryServiceByName", () => {
  it("returns a delivery service when a delivery service serviceArea attribute is 'international'", () => {
    const serviceArea = "international";
    const deliveryService = pojo.deliveryService({
      serviceArea,
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const subject = findInternationalDeliveryService(app);
    expect(subject.serviceArea).to.equal(serviceArea);
  });

  it("returns a delivery service when a delivery service serviceArea attribute is 'global'", () => {
    const serviceArea = "global";
    const deliveryService = pojo.deliveryService({
      serviceArea,
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const subject = findInternationalDeliveryService(app);
    expect(subject.serviceArea).to.equal(serviceArea);
  });

  it("returns a delivery service when a delivery service has more than 1 orgin country", () => {
    const availableCountries = ["US", "MX"];
    const deliveryService = pojo.deliveryService({
      availableCountries,
      serviceArea: 'international'
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const subject = findInternationalDeliveryService(app);
    expect(subject.availableCountries).to.eql(availableCountries);
  });

  it("returns a delivery service when a delivery service has more than 1 destination country", () => {
    const availableCountries = ["US", "MX"];
    const deliveryService = pojo.deliveryService({
      availableCountries,
      serviceArea: 'international'
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const subject = findInternationalDeliveryService(app);
    expect(subject.availableCountries).to.eql(availableCountries);
  });

  it("returns a delivery service when a delivery service has different destination and origin countries", () => {
    const availableCountries = ["US"];
    const deliveryService = pojo.deliveryService({
      availableCountries,
      serviceArea: 'international'
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const subject = findInternationalDeliveryService(app);
    expect(subject.availableCountries).to.eql(availableCountries);
  });

  it("throws an error when an international delivery service does not exist", () => {
    const app = pojo.carrierApp();
    expect(() => findInternationalDeliveryService(app)).to.throw(
      Error,
      /international delivery service not found/,
    );
  });
});
