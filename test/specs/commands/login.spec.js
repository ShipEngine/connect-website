"use strict";

const ApiKeyStore = require("../../../lib/core/utils/api-key-store");
const cli = require("cli-ux").default;
const { expect, test } = require("@oclif/test");
const { testApiKey } = require('../../utils/test-api-key')

describe("connect login @integration", () => {
  describe("when a valid Apps API Key is entered", () => {
    beforeEach(async () => {
      await ApiKeyStore.clear();
    });

    test
      .stub(cli, "prompt", () => async () => testApiKey)
      .stdout()
      .command(["login"])
      .it("runs login when given a valid Apps API KEY", (ctx) => {
        expect(ctx.stdout).to.contain(
          "You have logged in with a Connect API key\n",
        );
      });
  });

  describe("when an invalid Apps API Key is entered", () => {
    test
      .stub(cli, "prompt", () => async () => "invalid")
      .command(["login"])
      .exit(1)
      .it("exits with a status code of 1");
  });

  describe("when a re-login for an Apps API Key occurs", () => {
    beforeEach(async () => {
      await ApiKeyStore.clear();
      await ApiKeyStore.set(testApiKey);
    });

    test
      .stub(cli, "prompt", () => async () => testApiKey)
      .stdout()
      .command(["login"])
      .it("should login with the new valid ShipEngine API KEY", async (ctx) => {
        const appToken = await ApiKeyStore.get("apps");
        expect(appToken).to.equal(testApiKey);
        expect(ctx.stdout).to.contain(
          "You have logged in with a Connect API key\n",
        );
      });
  });
});
