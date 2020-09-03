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
    const originCountries = ["US", "MX"];
    const deliveryService = pojo.deliveryService({
      originCountries,
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const subject = findInternationalDeliveryService(app);
    expect(subject.originCountries).to.eql(originCountries);
  });

  it("returns a delivery service when a delivery service has more than 1 destination country", () => {
    const destinationCountries = ["US", "MX"];
    const deliveryService = pojo.deliveryService({
      destinationCountries,
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const subject = findInternationalDeliveryService(app);
    expect(subject.destinationCountries).to.eql(destinationCountries);
  });

  it("returns a delivery service when a delivery service has different destination and origin countries", () => {
    const destinationCountries = ["MX"];
    const originCountries = ["US"];
    const deliveryService = pojo.deliveryService({
      destinationCountries,
      originCountries,
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const subject = findInternationalDeliveryService(app);
    expect(subject.destinationCountries).to.eql(destinationCountries);
    expect(subject.originCountries).to.eql(originCountries);
  });

  it("throws an error when an international delivery service does not exist", () => {
    const app = pojo.carrierApp();
    expect(() => findInternationalDeliveryService(app)).to.throw(
      Error,
      /international delivery service not found/,
    );
  });
});
