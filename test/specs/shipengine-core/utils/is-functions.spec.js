"use strict";

const { expect } = require("chai");
const {
  isCarrierApp,
  isOrderApp,
} = require("../../../../lib/shipengine-core/utils/is-functions");

describe("isCarrierApp", () => {
  it("returns true when the given object has the shape of a CarrierApp", () => {
    const stub = { type: "carrier" };

    expect(isCarrierApp(stub)).equal(true);
  });

  it("returns false when the given object does not have the shape of a CarrierApp", () => {
    const stub = { type: "order" };

    expect(isCarrierApp(stub)).equal(false);
  });
});

describe("isOrderApp", () => {
  it("returns true when the given object has the shape of a OrderApp", () => {
    const stub = { type: "order" };

    expect(isOrderApp(stub)).equal(true);
  });

  it("returns false when the given object does not have the shape of a OrderApp", () => {
    const stub = { type: "carrier" };

    expect(isOrderApp(stub)).equal(false);
  });
});
