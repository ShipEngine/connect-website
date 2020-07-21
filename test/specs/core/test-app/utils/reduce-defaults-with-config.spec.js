"use strict";

const { expect } = require("chai");
const reduceDefaultsWithConfig = require("../../../../../lib/core/test-app/utils/reduce-defaults-with-config")
  .default;

describe("reduceDefaultsWithConfig", () => {
  it("returns a reduced object of the two objects and gives presedence to key/values in the configObject", () => {
    const defaultObject = {
      foo: "bar",
      baz: "bat",
    };

    const configObject = {
      baz: "test",
    };

    expect(reduceDefaultsWithConfig(defaultObject, configObject)).to.eql({
      foo: "bar",
      baz: "test",
    });
  });

  it("does not deeply merge the objects", () => {
    const defaultObject = {
      label: {
        unit: "lb",
        value: 1,
      },
    };

    const configObject = {
      label: {
        value: 2,
      },
    };

    expect(reduceDefaultsWithConfig(defaultObject, configObject)).to.eql({
      label: {
        value: 2
      },
    });
  });
});
