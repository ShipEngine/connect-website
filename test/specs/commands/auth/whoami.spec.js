"use strict";

const { expect, test } = require("@oclif/test");
const ApiKeyStore = require("../../../../lib/core/api-key-store");
const whoami = require("../../../../lib/commands/auth/whoami");
const nock = require("nock")

describe("whoami when unauthenticated", () => {
  beforeEach(() => {
    ApiKeyStore.clear("apps");
    ApiKeyStore.clear("shipengine");
    ApiKeyStore.set("apps", "app_12345");
    ApiKeyStore.set("shipengine", "123456");
  });


  test
    .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
      api
        .get("/api/diagnostics/whoami")
        .reply(401, { name: "test", email: "test@test.user.com" }),
    )
    .nock("https://api.shipengine.com", (api) =>
      api
        .get("/v1/environment/whoami")
        .reply(401)
    )
    .stdout()
    .command(["whoami"])
    .exit(1)
    .it("exits with status 1 when the user is not logged in");

});

describe("whoami when authenticated with only a Apps account", () => {
  beforeEach(() => {
    ApiKeyStore.clear();
    ApiKeyStore.set("apps", "app_12345");
  });

  test
    .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
      api
        .get("/api/diagnostics/whoami")
        .reply(200, { name: "test", email: "test@test.user.com" }),
    )
    .nock("https://api.shipengine.com", (api) =>
      api
        .get("/v1/environment/whoami")
        .reply(401)
    )
    .stdout()
    .command(["whoami"])
    .it("runs whoami", (ctx) => {
      expect(ctx.stdout).to.include("you are currently logged in as");
    });
});

describe("whoami when authenticated with only a ShipEngine account", () => {
  beforeEach(() => {
    ApiKeyStore.clear();
    ApiKeyStore.set("shipengine", "123456");
  });

  test
    .nock("https://api.shipengine.com", (api) =>
      api
        .get("/v1/environment/whoami")
        .reply(200, { username: "1243456" }),
    )
    .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
      api
        .get("/api/diagnostics/whoami")
        .reply(401),
    )
    .stdout()
    .command(["whoami"])
    .it("runs whoami", (ctx) => {
      expect(ctx.stdout).to.include("you are currently logged in as");
    });
});
