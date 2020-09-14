"use strict";

const { expect, test } = require("@oclif/test");

describe("connect versions", () => {
  test
    .stdout()
    .command(["versions"])
    .it("prints versions", (ctx) => {
      expect(ctx.stdout).to.contain("node");
      expect(ctx.stdout).to.contain("@shipengine/connect-cli");
      expect(ctx.stdout).to.contain("@shipengine/connect-sdk");
      expect(ctx.stdout).to.contain("@shipengine/connect-loader");
      expect(ctx.stdout).to.contain("@shipengine/connect-local-dev-ui");
      expect(ctx.stdout).to.contain("@shipengine/connect-local-dev-api");
    });
});
