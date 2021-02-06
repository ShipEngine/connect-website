"use strict";

const { expect } = require("chai");
const pojo = require("../../../../utils/pojo");
const findDeliveryConfirmationByName = require("../../../../../lib/core/test-app/utils/find-delivery-confirmation-by-name")
  .default;

const deliveryConfirmation = pojo.deliveryConfirmation();
const app = pojo.carrierApp({ deliveryConfirmations: [deliveryConfirmation] });

describe("findDeliveryConfirmationByName", () => {
  it("returns a delivery confirmation when a delivery confirmation exist for the given name", () => {
    const name = "Dummy Confirmation";
    const subject = findDeliveryConfirmationByName(name, app);
    expect(subject.name).to.be.equal(name);
  });

  it("throws an error when a delivery confirmation does not exist for the given name", () => {
    expect(() => findDeliveryConfirmationByName("invalid", app)).to.throw(
      Error,
      /connect.config.js deliveryConfirmationName:/,
    );
  });
});
