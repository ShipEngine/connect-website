"use strict";

const chai = require("chai");
const { loadApp } = require("../../lib");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

describe("App type detection", () => {
  describe("when an app has some but not all required carrier app properties", () => {
    it("should thrown an error", async () => {

      await expect(loadApp("test/fixtures/apps/carrier/missing-delivery-services"))
        .to.be.rejectedWith("Carrier app is missing required 'deliveryServices` property");

    });
  });

  describe("when an app has all required carrier app properties", () => {
    it("should pass validation", async () => {
      await expect(loadApp("test/fixtures/apps/carrier/inline")).to.not.be.rejected;
    });
  });

  describe("when an app has all required order app properties", () => {
    it("should pass validation", async () => {
      await expect(loadApp("test/fixtures/apps/order/inline")).to.not.be.rejected;
    });
  });

  describe("when an app has none of the required carrier app properties and no distinguishing order app properties", () => {
    it("should throw an error message", async () => {
      await expect(loadApp("test/fixtures/apps/carrier/missing-order-and-carrier-props"))
        .to.be.rejectedWith("Your app is missing some required fields. Please refer to the documentation.");
    });
  });
});
