"use strict";

const { expect, test } = require("@oclif/test");
const path = require("path");
const cli = require("cli-ux");

let cwd;
let projectPath;
describe("apps:publish", () => {

  test
    .stdout()
    .command(["apps:publish", "-h"])
    .exit(0)
    .it("calls the apps:publish -h command", (ctx) => {
      expect(ctx.stdout).to.contain("publish your app");
    });

  test
    .stdout()
    .command(["apps:publish", "--help"])
    .exit(0)
    .it("calls the apps:publish --help command", (ctx) => {
      expect(ctx.stdout).to.contain("publish your app");
    });

  // TODO: Come up with a decent way to mock the `getAPIKey()` function or 
  // working with the .netrc file in an E2E test such as this.
  // test
  //   .nock("http://localhost:3000", (api) => {
  //     api.post(uri => uri.includes("deploy")).reply(200, { deployId: "12345" });
  //   })
  //   .do(() => {
  //     cwd = process.cwd();
  //     projectPath = path.join(cwd, "test", "fixtures", "apps", "carrier", "valid");
  //     process.chdir(projectPath);
  //   })
  //   .stderr()
  //   .command(["apps:publish"])
  //   // .exit(0)
  //   .do(() => {
  //     process.chdir(cwd);
  //   })
  //   .it("should publish the app", (ctx) => {
  //     // It should also delete the npm package tarball
  //     expect(projectPath).to.not.include.files(["carrier-inline-app-0.0.1.tgz"]);
  //     expect(ctx.stderr).to.contain("Publishing App");
  //   });

  // test
  //   .stub(cli.default, "prompt", () => {
  //     return () => "12345";
  //   })
  //   .nock("http://localhost:3000", (api) => {
  //     api.post(uri => uri.endsWith("deploys")).reply(200, { deployId: "12345" });
  //   })
  //   .nock("http://localhost:3000", (api) => {
  //     api.get(uri => uri.includes("deploys/")).reply(200, { status: "running" });
  //   })
  //   .do(() => {
  //     cwd = process.cwd();
  //     projectPath = path.join(cwd, "test", "fixtures", "apps", "carrier", "valid");
  //     process.chdir(projectPath);
  //   })
  //   .stderr()
  //   .command(["apps:publish", "--watch"])
  //   .do(() => {
  //     process.chdir(cwd);
  //   })
  //   .it("should publish the app and watch the deployment status", (ctx) => {
  //     expect(ctx.stderr).to.contain("Your app was published successfully");
  //   });
});
