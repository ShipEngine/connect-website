"use strict";

const { expect, test } = require("@oclif/test");
const ApiKeyStore = require("../../../lib/core/api-key-store");

describe("The auth:logout command", () => {

  describe("when there is only an Apps API Key", () => {
    before(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.set("apps", "app_12346");
    });

    test
      .stdout()
      .stderr()
      .command(["logout"])
      .it("clears the API key for the current Apps API Key", () => {
        const appsKey = ApiKeyStore.get("apps");
        expect(appsKey).to.equal(null);
      });
  });
});
