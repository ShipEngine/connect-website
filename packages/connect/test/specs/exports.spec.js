"use strict";

const namedExports = require('../..');
const { default: defaultExport } = require('../..');
const { expect } = require("chai");

describe("package exports", () => {
  it("should not have a default ESM export", () => {
    expect(defaultExport).to.equal(undefined);
    expect(namedExports).not.to.include.key("default");
  });

  for (let [name, namedExport] of Object.entries(namedExports)) {
    it(`exports the ${name}`, function () {
      expect(name).to.match(/^[A-Z][a-z]+/, "all exported classes/enumerations must start with a capital letter");

      if (typeof namedExport === "object") {
        this.test.title += " enumeration";

        // Verify that this is an enumeration
        for (let value of Object.values(namedExport)) {
          expect(value).to.be.a("string", `${name} is not an enumeration or class`);
        }
      }
      else {
        this.test.title += " class";

        // Verify that this is a class
        expect(namedExport).to.be.a("function", `${name} is not an enumeration or class`);
        expect(namedExport.name).to.equal(name, `${name} is not an enumeration or class`);
      }
    });
  }
});
