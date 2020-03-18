"use strict";

const shipengine = require("../utils/shipengine");
const manifest = require("../../package.json");
const { expect } = require("chai");
const { shipEngineHelpText } = require("../../lib/cli/help/shipengine-help");


describe("shipengine", () => {

  it("should show root help text without any arguments", async () => {
    // Run the CLI without any arguments.
    let cli = await shipengine();

    // It should have printed the default greeting
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.contains(shipEngineHelpText);
    expect(cli).to.have.exitCode(0);

  });

  it("should error if an invalid argument is used", () => {
    let cli = shipengine("--fizzbuzz");

    expect(cli).to.have.exitCode(9);
    expect(cli).to.have.stdout("");
    expect(cli).to.have.stderr.that.matches(/^Unknown option: --fizzbuzz\n/);
  });

  it("should error if an invalid shorthand argument is used", () => {
    let cli = shipengine("-qhzt");

    expect(cli).to.have.exitCode(9);
    expect(cli).to.have.stdout("");
    expect(cli).to.have.stderr.that.matches(/^Unknown option: -z\n/);
  });

});

describe("shipengine --help", () => {

  it("should show usage text", () => {
    let cli = shipengine("--help");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.contains(shipEngineHelpText);
  });

  it("should support -h shorthand", () => {
    let cli = shipengine("-h");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.contains(shipEngineHelpText);

  });

  it("should ignore other arguments", () => {
    let cli = shipengine("--quiet --help --version");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.contains(shipEngineHelpText);
  });

  it("should ignore other shorthand arguments", () => {
    let cli = shipengine("-qhv");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.contains(shipEngineHelpText);
  });

});

describe("shipengine --version", () => {

  it("should show the version number", () => {
    let cli = shipengine("--version");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout(manifest.version + "\n");
  });

  it("should support -v shorthand", () => {
    let cli = shipengine("-v");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout(manifest.version + "\n");
  });

  it("should ignore other arguments", () => {
    let cli = shipengine("--quiet --version");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout(manifest.version + "\n");
  });

  it("should ignore other shorthand arguments", () => {
    let cli = shipengine("-qv");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout(manifest.version + "\n");
  });

});
