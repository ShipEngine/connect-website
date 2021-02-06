"use strict";

const { expect } = require("chai");
const {
  indent,
  indentLines,
} = require("../../../../lib/core/utils/log-helpers");

describe(".indent", () => {
  it("returns an indented string", () => {
    expect(indent(2)).to.be.equal("    ");
  });

  it("returns an indented string with the original value", () => {
    expect(indentLines("test", 2)).to.be.equal("    test");
  });
});
