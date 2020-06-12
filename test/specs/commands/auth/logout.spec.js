"use strict";

const { expect, test } = require("@oclif/test");

describe("logout", () => {
  test
    .stdout()
    .command(["logout"])
    .it("clears the API key for the current user", (ctx) => {
      expect(ctx.stdout).to.contain("\nYou have been logged out.");
    });
});
