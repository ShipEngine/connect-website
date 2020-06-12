"use strict";

const { expect, test } = require("@oclif/test");
const ApiKeyStore = require("../../../../lib/core/api-key-store");

describe("whoami when autheticated", () => {
  beforeEach(() => {
    ApiKeyStore.clear();
    ApiKeyStore.set("test");
  });

  test
    .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
      api
        .get("/api/diagnostics/whoami")
        .reply(200, { name: "test", email: "test@test.user.com" }),
    )
    .stdout()
    .command(["whoami"])
    .it("runs whoami", (ctx) => {
      expect(ctx.stdout).to.include("you are currently logged in as");
    });
});

describe("whoami when unautheticated", () => {
  beforeEach(() => {
    ApiKeyStore.clear();
  });

  test
    .stdout()
    .command(["whoami"])
    .exit(1)
    .it("exits with status 1 when the user is not logged in");
});
