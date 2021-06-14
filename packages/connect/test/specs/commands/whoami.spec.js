"use strict";

const ApiKeyStore = require("../../../lib/core/utils/api-key-store");
const { test } = require("@oclif/test");

describe("connect whoami @integration", () => {
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
