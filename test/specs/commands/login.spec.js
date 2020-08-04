"use strict";

const { expect, test } = require("@oclif/test");
const cli = require("cli-ux").default;
const ApiKeyStore = require("../../../lib/core/api-key-store");

describe("The auth:login command", () => {
  describe("when a valid Apps API Key is entered", () => {
    beforeEach(() => {
      ApiKeyStore.clear("apps");
    });

    test
      .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
        api
          .get("/api/diagnostics/whoami")
          .reply(200, { name: "test", email: "test@test.user.com" }),
      )
      .stub(cli, "prompt", () => async () => "app_123456")
      .stdout()
      .command(["login"])
      .it("runs login when given a valid Apps API KEY", (ctx) => {
        expect(ctx.stdout).to.contain(
          "\nyou have logged in with an Integrations API key\n",
        );
      });
  });

  describe("when an invalid Apps API Key is entered", () => {
    test
      .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
        api
          .get("/api/diagnostics/whoami")
          .reply(401, { name: "test", email: "test@test.user.com" }),
      )
      .stub(cli, "prompt", () => async () => "app_123456")
      .command(["login"])
      .exit(1)
      .it("exits with a status code of 1");
  });

  describe("when a re-login for an Apps API Key occurs", () => {
    beforeEach(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.set("apps", "app_123465");
    });

    test
      .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
        api
          .get("/api/diagnostics/whoami")
          .reply(200, { name: "test", email: "test@test.user.com" }),
      )
      .stub(cli, "prompt", () => async () => "app_98765")
      .stdout()
      .command(["login"])
      .it("should login with the new valid ShipEngine API KEY", (ctx) => {
        const appToken = ApiKeyStore.get("apps");
        expect(appToken).to.equal("app_98765");
        expect(ctx.stdout).to.contain(
          "\nyou have logged in with an Integrations API key\n",
        );
      });
  });
});
