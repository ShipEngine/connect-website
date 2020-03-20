"use strict";

const ipaasLoader = require("../..");
const { expect } = require("chai");

describe("ipaasLoader() with inline config", () => {


  it("should work without any arguments", () => {
    let result = ipaasLoader();
    expect(result).to.equal("Hello, world.");
  });

  it("should accept a custom greeting", () => {
    let result = ipaasLoader({ greeting: "Hi there" });
    expect(result).to.equal("Hi there, world.");
  });

  it("should accept a custom subject", () => {
    let result = ipaasLoader({ subject: "Michael" });
    expect(result).to.equal("Hello, Michael.");
  });

  it("should accept a custom greeting and subject", () => {
    let result = ipaasLoader({ greeting: "Yo", subject: "man" });
    expect(result).to.equal("Yo, man.");
  });

  it('should not allow a greeting of "goodbye"', () => {
    function sayGoodbye () {
      ipaasLoader({ greeting: "Goodbye" });
    }

    expect(sayGoodbye).to.throw("Cannot say goodbye");
  });

});
