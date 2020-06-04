"use strict";

const { expect } = require("chai");
const Test = require("../../../../../lib/shipengine-core/test-app/tiny-test/test")
  .default;

describe("Test", () => {
  describe(".toString", () => {
    it("returns a formatted string that includes the sha and title", () => {
      const subject = new Test({ title: "test subject", fn: () => {} });
      expect(subject.toString()).to.be.a("string");
      expect(subject.toString()).to.be.include(subject.title);
      expect(subject.toString()).to.be.include(subject.truncatedSha());
    });
  });

  describe(".truncatedSha", () => {
    it("returns a sha substring", () => {
      const subject = new Test({ title: "test subject", fn: () => {} });
      expect(subject.truncatedSha()).to.be.a("string");
      expect(subject.sha).to.be.include(subject.truncatedSha());
    });
  });

  describe("fn", () => {
    it("calls the function", () => {
      let foo = 1;

      const subject = new Test({ title: "test subject", fn: () => foo++ });

      subject.fn();

      expect(foo).to.equal(2);
    });
  });
});
