"use strict";

const cli = require("cli-ux").default;
const {  test } = require("@oclif/test");

describe("connect login @integration", () => {
  describe("when an invalid Apps API Key is entered", () => {
    test
      .stub(cli, "prompt", () => async () => "invalid")
      .command(["login"])
      .exit(1)
      .it("exits with a status code of 1");
  });
});
