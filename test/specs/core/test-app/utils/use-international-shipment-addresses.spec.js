"use strict";

const { expect } = require("chai");
const pojo = require("../../../../utils/pojo");
const useInternationalShipmentAddresses = require("../../../../../lib/core/test-app/utils/use-international-shipment-addresses")
  .default;

describe("useInternationalShipmentAddresses", () => {
  it("returns a a tuple of international addresses when there is only 1 origin country for the app", () => {
    const availableCountries = ["US"];
    const deliveryService = pojo.deliveryService({
      availableCountries
    });

    const [
      originAddress,
      destinationAddress,
    ] = useInternationalShipmentAddresses(deliveryService);
    expect(originAddress.country).to.equal("US");
    expect(destinationAddress.country).to.not.equal("US");
  });

  it("returns a a tuple of international addresses when there is more than 1 origin and destination country for the app", () => {
    const availableCountries = ["US", "MX"];
    const deliveryService = pojo.deliveryService({
      availableCountries,
    });

    const [
      originAddress,
      destinationAddress,
    ] = useInternationalShipmentAddresses(deliveryService);
    expect(originAddress.country).to.equal("US");
    expect(destinationAddress.country).to.not.equal("US");
  });
});
