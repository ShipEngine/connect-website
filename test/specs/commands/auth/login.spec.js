"use strict";

const { expect, test } = require("@oclif/test");
const cli = require("cli-ux").default;
const ApiKeyStore = require("../../../../lib/core/api-key-store");

describe("login", () => {
  beforeEach(() => {
    ApiKeyStore.clear();
  });

  test
    .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
      api
        .get("/api/diagnostics/whoami")
        .reply(200, { name: "test", email: "test@test.user.com" }),
    )
    .stub(cli, "prompt", () => async () => "test")
    .stdout()
    .command(["login"])
    .it("runs login when given a valid API KEY", (ctx) => {
      expect(ctx.stdout).to.contain("\nyou have successfully logged in\n");
    });

  test
    .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
      api.get("/api/diagnostics/whoami").reply(401, {
        statusCode: 401,
        name: "unauthorized",
        errors: [
          {
            message: "invalid auth",
          },
        ],
        status: 401,
      }),
    )
    .stub(cli, "prompt", () => async () => "invalid")
    .stdout()
    .command(["login"])
    .exit(1)
    .it("exits with status 1 when given an invalid API Key");
});

describe("re-login", async () => {
  beforeEach(async () => {
    ApiKeyStore.clear();
    ApiKeyStore.set("test");
  });

  test
    .nock("https://dip-webapi-dev.kubedev.sslocal.com", (api) =>
      api
        .get("/api/diagnostics/whoami")
        .reply(200, { name: "test", email: "test@test.user.com" }),
    )
    .stub(cli, "prompt", () => async () => "n")
    .stdout()
    .command(["login"])
    .it("does not login with the new key when given 'n'", (ctx) => {
      expect(ctx.stdout).to.include("you are currently logged in as");
    });
});
