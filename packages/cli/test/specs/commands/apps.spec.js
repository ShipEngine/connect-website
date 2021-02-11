"use strict";

const ApiKeyStore = require("../../../lib/core/utils/api-key-store");
const cli = require("cli-ux").default;
const { test } = require("@oclif/test");
const { testApiKey } = require('../../utils/test-api-key')

describe("connect apps @integration", () => {
  describe("when authenticated", () => {
    beforeEach(async () => {
      await ApiKeyStore.clear();
      await ApiKeyStore.set(testApiKey);
    });

    test
      .stdout()
      .command(["apps"])
      .it("runs apps");

    afterEach(async () => {
      await ApiKeyStore.clear();
    });
  });

  describe("when unauthenticated", () => {
    beforeEach(async () => {
      await ApiKeyStore.clear();
    });

    test
      .stub(cli, "prompt", () => async () => "invalid")
      .stdout()
      .command(["apps"])
      .exit(1)
      .it("exits with status 1 when the user is not logged in");
  });
});
