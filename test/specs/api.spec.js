"use strict";

const shipengine = require("../../");
const { expect } = require("chai");

describe("shipengine() API", () => {

  it("should work without any arguments", () => {
    let result = shipengine();
    expect(result).to.equal("Hello, world.");
  });

  it("should accept a custom greeting", () => {
    let result = shipengine({ greeting: "Hi there" });
    expect(result).to.equal("Hi there, world.");
  });

  it("should accept a custom subject", () => {
    let result = shipengine({ subject: "Michael" });
    expect(result).to.equal("Hello, Michael.");
  });

  it("should accept a custom greeting and subject", () => {
    let result = shipengine({ greeting: "Yo", subject: "man" });
    expect(result).to.equal("Yo, man.");
  });

  it('should not allow a greeting of "goodbye"', () => {
    function sayGoodbye () {
      shipengine({ greeting: "Goodbye" });
    }

    expect(sayGoodbye).to.throw("Cannot say goodbye");
  });

});
