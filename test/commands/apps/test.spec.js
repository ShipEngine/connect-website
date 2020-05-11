"use strict";

const { expect, test } = require("@oclif/test");

describe("apps:test", () => {
  test
    .stdout()
    .command(["apps:test"])
    .it("runs the app test harness", (ctx) => {
      expect(ctx.stdout).to.contain("testint 1, 2, 3\n");
    });
});
