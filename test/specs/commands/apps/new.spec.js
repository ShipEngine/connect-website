"use strict";

const { expect, test } = require("@oclif/test");
const sinon = require("sinon");
const yeomanEnv = require("yeoman-environment");

const double = {
  run: (namespace, options, callback) => {
    callback();
  },
  register: () => {},
};

describe("apps:new", () => {
  beforeEach(() => {
    sinon.stub(yeomanEnv, "createEnv").returns(double);
  });

  test
    .stdout()
    .command(["apps:new"])
    .it("calls the apps:new generator with the given args and flags", (ctx) => {
      expect(ctx.stdout).to.contain("Time to build a ShipEngine app!\n");
    });

  afterEach(() => {
    sinon.restore();
  });
});
