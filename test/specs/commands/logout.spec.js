"use strict";

const ApiKeyStore = require("../../../lib/core/utils/api-key-store");
const { expect, test } = require("@oclif/test");

describe("connect logout", () => {
  describe("when authenticated", () => {
    before(async () => {
      await ApiKeyStore.set("test");
    });

    test
      .stdout()
      .stderr()
      .command(["logout"])
      .it("clears the API key for the current Apps API Key", async () => {
        let result;
        let errorResult;

        try {
          result = await ApiKeyStore.get();
        } catch (error) {
          errorResult = error;
        }

        expect(result).to.be.undefined;
        expect(errorResult.code).equal("ERR_API_KEY_NOT_FOUND");
      });
  });
});
