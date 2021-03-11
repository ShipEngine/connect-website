"use strict";

const { expect, test } = require("@oclif/test");

describe("connect versions", () => {
  test
    .stdout()
    .command(["versions"])
    .it("prints versions", (ctx) => {
      expect(ctx.stdout).to.contain("node");
      expect(ctx.stdout).to.contain("@shipengine/connect");
      expect(ctx.stdout).to.contain("@shipengine/connect-sdk");
      expect(ctx.stdout).to.contain("@shipengine/connect-loader");
    });
});
