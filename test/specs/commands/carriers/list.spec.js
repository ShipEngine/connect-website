"use strict";

const { expect, test } = require("@oclif/test");
const cli = require("cli-ux").default;
const ApiKeyStore = require("../../../../lib/core/api-key-store");

describe("The carriers:list command", () => {
  describe("when the user has not entered a valid ShipEngine API Key", () => {
    beforeEach(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
    });

    test
      .nock("https://api.shipengine.com", (api) =>
        api
          .get("/v1/environment/whoami")
          .reply(200, { data: { username: "123456" } }),
      )
      .nock("https://api.shipengine.com", (api) =>
        api
          .get("/v1/carriers")
          .reply(200, { carriers: [{ carrier_id: "se-123456", carrier_code: "stamps_com", friendly_name: "Stamps.com" }] }),
      )
      .stub(cli, "prompt", () => async () => "test_123456")
      .stdout()
      .command(["carriers:list"])
      .it("should prompt the user to enter a valid ShipEngine API Key and then return a list of carriers", (ctx) => {
        expect(ctx.stdout).to.include("you need to login before you can access the ShipEngine API");
        expect(ctx.stdout).to.include("Stamps.com");
      });
  });

  describe("when the user has entered a valid ShipEngine API Key", () => {
    beforeEach(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.set("shipengine", "test_12345");
    });

    test
      .nock("https://api.shipengine.com", (api) =>
        api
          .get("/v1/environment/whoami")
          .reply(200, { data: { username: "123456" } }),
      )
      .nock("https://api.shipengine.com", (api) =>
        api
          .get("/v1/carriers")
          .reply(200, { carriers: [{ carrier_id: "se-123456", carrier_code: "stamps_com", friendly_name: "Stamps.com" }] }),
      )
      .stdout()
      .command(["carriers:list"])
      .it("should return a list of carriers associated with that account", (ctx) => {
        expect(ctx.stdout).to.include("Stamps.com");
      });

    afterEach(() => {
      ApiKeyStore.clear("apps");
    });
  })
});
