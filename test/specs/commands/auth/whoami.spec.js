"use strict";

const { expect, test } = require("@oclif/test");
const ApiKeyStore = require("../../../../lib/core/api-key-store");

describe("The auth:whoami command", () => {
  describe("when unauthenticated", () => {
    beforeEach(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
    });

    test
      .stdout()
      .command(["whoami"])
      .exit(1)
      .it("exits with status 1 when the user is not logged in");

  });

  describe("when authenticated with only a Apps account", () => {
    beforeEach(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.set("apps", "app_12345");
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
        expect(ctx.stdout).to.include("you are currently logged in as: test");
      });

    afterEach(() => {
      ApiKeyStore.clear("apps");
    });
  });

  describe("when authenticated with only a ShipEngine account", () => {
    beforeEach(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.set("shipengine", "123456");
    });

    test
      .nock("https://api.shipengine.com", (api) =>
        api
          .get("/v1/environment/whoami")
          .reply(200, { data: { username: "123456" } }),
      )
      .stdout()
      .command(["whoami"])
      .it("runs whoami", (ctx) => {
        expect(ctx.stdout).to.include("you are currently logged in as: 123456");
      });

    afterEach(() => {
      ApiKeyStore.clear("shipengine");
    });
  });

  describe("when authenticated with both a ShipEngine and Apps account", () => {
    beforeEach(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.set("shipengine", "123456");
      ApiKeyStore.set("apps", "app_12345");

    });

    test
      .nock("https://api.shipengine.com", (api) =>
        api
          .get("/v1/environment/whoami")
          .reply(200, { data: { username: "123456" } }),
      )
      .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
        api
          .get("/api/diagnostics/whoami")
          .reply(200, { name: "test", email: "test@test.user.com" }),
      )
      .stdout()
      .command(["whoami"])
      .it("runs whoami", (ctx) => {
        expect(ctx.stdout).to.include("you are currently logged in as the following:");
        expect(ctx.stdout).to.include("shipengine ⚙ : 123456");
        expect(ctx.stdout).to.include("integrations : test");
      });

    afterEach(() => {
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.clear("apps");
    });
  });
});

