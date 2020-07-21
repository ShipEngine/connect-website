"use strict";

const { expect } = require("chai");
const pojo = require("../../../utils/pojo");
const useInternationalShipmentAddresses = require("../../../../../lib/core/test-app/utils/use-international-shipment-addresses")
  .default;

describe("useInternationalShipmentAddresses", () => {
  it("returns a a tuple of international addresses when there is only 1 origin country for the app", () => {
    const originCountries = ["US"];
    const destinationCountries = ["US", "MX"];
    const deliveryService = pojo.deliveryService({
      destinationCountries,
      originCountries,
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const [
      originAddress,
      destinationAddress,
    ] = useInternationalShipmentAddresses(app);
    expect(originAddress.country).to.equal("US");
    expect(destinationAddress.country).to.equal("MX");
  });

  it("returns a a tuple of international addresses when there is only 1 destination country for the app", () => {
    const originCountries = ["US", "MX"];
    const destinationCountries = ["US"];
    const deliveryService = pojo.deliveryService({
      destinationCountries,
      originCountries,
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const [
      originAddress,
      destinationAddress,
    ] = useInternationalShipmentAddresses(app);
    expect(originAddress.country).to.equal("MX");
    expect(destinationAddress.country).to.equal("US");
  });


  it("returns a a tuple of international addresses when there is more than 1 origin and destination country for the app", () => {
    const originCountries = ["US", "MX"];
    const destinationCountries = ["US", "MX"];
    const deliveryService = pojo.deliveryService({
      destinationCountries,
      originCountries,
    });
    const app = pojo.carrierApp({
      deliveryServices: [deliveryService],
    });

    const [
      originAddress,
      destinationAddress,
    ] = useInternationalShipmentAddresses(app);
    expect(originAddress.country).to.equal("US");
    expect(destinationAddress.country).to.equal("MX");
  });
});
