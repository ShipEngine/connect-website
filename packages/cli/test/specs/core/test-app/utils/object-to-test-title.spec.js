"use strict";

const { expect } = require("chai");
const objectToTestTitle = require("../../../../../lib/core/test-app/utils/object-to-test-title")
  .default;

describe("objectToTestTitle", () => {
  it("returns a formatted string that includes the key values for an object", () => {
    const subject = {
      foo: "bar",
      baz: "bat",
    };

    expect(objectToTestTitle(subject)).to.equal("foo: bar, baz: bat");
  });

  it("returns a formatted string that includes custom formatting when given the key 'weight'", () => {
    const subject = {
      foo: "bar",
      baz: "bat",
      weight: {
        unit: "lb",
        value: 1,
      },
    };

    expect(objectToTestTitle(subject)).to.equal(
      "foo: bar, baz: bat, weight: 1lb",
    );
  });

  it("returns a formatted string that includes custom formatting when given the key 'shipTo'", () => {
    const subject = {
      foo: "bar",
      baz: "bat",
      shipTo: {
        country: "US",
      },
    };

    expect(objectToTestTitle(subject)).to.equal(
      "foo: bar, baz: bat, shipTo: US",
    );
  });

  it("returns a formatted string that includes custom formatting when given the key 'shipFrom'", () => {
    const subject = {
      foo: "bar",
      baz: "bat",
      shipFrom: {
        country: "US",
      },
    };

    expect(objectToTestTitle(subject)).to.equal(
      "foo: bar, baz: bat, shipFrom: US",
    );
  });
});
