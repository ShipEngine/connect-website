"use strict";

const { expect, test } = require("@oclif/test");

describe("integration", () => {
  test
    .stdout()
    .command(["integration"])
    .exit(0)
    .it("runs integration info message", ctx => {
      expect(ctx.stdout).to.contain("integration:new");
    });
});
