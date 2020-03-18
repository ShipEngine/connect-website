"use strict";

const shipengine = require("../utils/shipengine");
const manifest = require("../../package.json");
const { expect } = require("chai");
const { ipaasHelpText } = require("../../lib/cli/help/ipaas-help");


describe("shipengine ipaas", () => {

  it("should show ipaas help text without any arguments", async () => {
    // Run the CLI without any arguments.
    let cli = await shipengine("ipaas");

    // It should have printed the default greeting
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.contains(ipaasHelpText);
    expect(cli).to.have.exitCode(0);

  });

  it("should error if an invalid argument is used", () => {
    let cli = shipengine("ipaas --fizzbuzz");

    expect(cli).to.have.exitCode(9);
    expect(cli).to.have.stdout("");
    expect(cli).to.have.stderr.that.matches(/^Unknown option: --fizzbuzz\n/);
  });

  it("should error if an invalid shorthand argument is used", () => {
    let cli = shipengine("ipaas -qhzt");

    expect(cli).to.have.exitCode(9);
    expect(cli).to.have.stdout("");
    expect(cli).to.have.stderr.that.matches(/^Unknown option: -z\n/);
  });

});

describe("shipengine ipaas --help", () => {

  it("should show usage text", () => {
    let cli = shipengine("ipaas --help");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.contains(ipaasHelpText);
  });

  it("should support -h shorthand", () => {
    let cli = shipengine("ipaas -h");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.contains(ipaasHelpText);

  });

});

describe("shipengine ipaas new", () => {
  it.skip("should call the `createTemplate` ipaas lib function");
});

