"use strict";

const ApiKeyStore = require("../../../lib/core/utils/api-key-store");
const { expect, test } = require("@oclif/test");
const { testApiKey } = require('../../utils/test-api-key')

describe("connect whoami @integration", () => {
  describe("when authenticated", () => {
    beforeEach(async () => {
      await ApiKeyStore.clear();
      await ApiKeyStore.set(testApiKey);
    });

    test
      .stdout()
      .command(["whoami"])
      .it("runs whoami", (ctx) => {
        expect(ctx.stdout).to.include("You are currently logged in as: pierce");
      });

    afterEach(async () => {
      await ApiKeyStore.clear();
    });
  });

  describe("when unauthenticated", () => {
    beforeEach(async () => {
      await ApiKeyStore.clear();
    });

    test
      .stdout()
      .command(["whoami"])
      .exit(1)
      .it("exits with status 1 when the user is not logged in");
  });
});
