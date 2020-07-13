"use strict";

const { expect, test } = require("@oclif/test");
const inquirer = require("inquirer");
const ApiKeyStore = require("../../../../lib/core/api-key-store");

describe("The auth:logout command", () => {

  describe("when there is only a ShipEngine API Key", () => {

    before(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.set("shipengine", "test_12346");
    });

    test
      .nock("https://api.shipengine.com", (api) =>
        api
          .get("/v1/environment/whoami")
          .reply(200, { data: { username: "123456" } }),
      )
      .stdout()
      .stderr()
      .command(["logout"])
      .it("clears the API key for the current ShipEngine API Key", (ctx) => {
        expect(ctx.stderr).to.contain("logging out of shipengine  ⚙");
      });
  });

  describe("when there is only an Apps API Key", () => {
    before(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.set("apps", "app_12346");
    });

    test
      .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
        api
          .get("/api/diagnostics/whoami")
          .reply(200, { name: "test", email: "test@test.user.com" }),
      )
      .stdout()
      .stderr()
      .command(["logout"])
      .it("clears the API key for the current Apps API Key", (ctx) => {
        expect(ctx.stderr).to.contain("logging out of auctane 🏎  🔥 ");
      });
  });

  describe("when there is both an Auctane and a ShipEngine API Key and the user logs out of ShipEngine", () => {

    before(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.set("apps", "app_12346");
      ApiKeyStore.set("shipengine", "test_12346");
    });

    test
      .stdout()
      .stderr()
      .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
        api
          .get("/api/diagnostics/whoami")
          .reply(200, { name: "test", email: "test@test.user.com" }),
      )
      .nock("https://api.shipengine.com", (api) =>
        api
          .get("/v1/environment/whoami")
          .reply(200, { data: { username: "123456" } }),
      )
      .stub(inquirer, "prompt", () =>{ return { "api-token": "shipengine" } })
      .command(["logout"])

      .it("Should only clear the ShipEngine API Key", (ctx) => {
        expect(ApiKeyStore.get("shipengine")).to.equal(null);
        expect(ApiKeyStore.get("apps")).to.equal("app_12346");

        expect(ctx.stderr).to.contain("logging out of shipengine  ⚙");
      });
  });

  describe("when there is both an Auctane and a ShipEngine API Key and the user logs out of Auctane", () => {

    before(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.set("apps", "app_12346");
      ApiKeyStore.set("shipengine", "test_12346");
    });

    test
      .stdout()
      .stderr()
      .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
        api
          .get("/api/diagnostics/whoami")
          .reply(200, { name: "test", email: "test@test.user.com" }),
      )
      .nock("https://api.shipengine.com", (api) =>
        api
          .get("/v1/environment/whoami")
          .reply(200, { data: { username: "123456" } }),
      )
      .stub(inquirer, "prompt", () => { return { "api-token": "apps" } })
      .command(["logout"])

      .it("Should only clear the Auctage API Key", (ctx) => {
        expect(ApiKeyStore.get("shipengine")).to.equal("test_12346");
        expect(ApiKeyStore.get("apps")).to.equal(null);

        expect(ctx.stderr).to.contain("logging out of auctane 🏎  🔥 ");
      });
  });

  describe("when there is both an Auctane and a ShipEngine API Key and the user logs out of both", () => {

    before(() => {
      ApiKeyStore.clear("apps");
      ApiKeyStore.clear("shipengine");
      ApiKeyStore.set("apps", "app_12346");
      ApiKeyStore.set("shipengine", "test_12346");
    });

    test
      .stdout()
      .stderr()
      .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
        api
          .get("/api/diagnostics/whoami")
          .reply(200, { name: "test", email: "test@test.user.com" }),
      )
      .nock("https://api.shipengine.com", (api) =>
        api
          .get("/v1/environment/whoami")
          .reply(200, { data: { username: "123456" } }),
      )
      .stub(inquirer, "prompt", () => { return { "api-token": "both" } })
      .command(["logout"])

      .it("Should only clear the Auctage API Key", (ctx) => {
        expect(ApiKeyStore.get("shipengine")).to.equal(null);
        expect(ApiKeyStore.get("apps")).to.equal(null);

        expect(ctx.stderr).to.contain("logging out of auctane 🏎  🔥 ");
        expect(ctx.stderr).to.contain("logging out of shipengine  ⚙");
      });
  });
});
