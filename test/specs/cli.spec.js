"use strict";

const shipengine = require("../utils/shipengine");
const manifest = require("../../package.json");
const { expect } = require("chai");

describe("shipengine", () => {

  it("should run without any arguments", () => {
    // Run the CLI without any arguments.
    let cli = shipengine("");

    // It should have printed the default greeting
    expect(cli).to.have.stdout("Hello, world.\n");
  });

  it("should error if an invalid argument is used", () => {
    let cli = shipengine("--fizzbuzz");

    expect(cli).to.have.exitCode(9);
    expect(cli).to.have.stdout("");
    expect(cli).to.have.stderr.that.matches(/^Unknown option: --fizzbuzz\n\nUsage: shipengine \[options\] \[files...\]\n/);
  });

  it("should error if an invalid shorthand argument is used", () => {
    let cli = shipengine("-qhzt");

    expect(cli).to.have.exitCode(9);
    expect(cli).to.have.stdout("");
    expect(cli).to.have.stderr.that.matches(/^Unknown option: -z\n\nUsage: shipengine \[options\] \[files...\]\n/);
  });

  it("should error if an argument is missing its value", () => {
    let cli = shipengine("--subject");

    expect(cli).to.have.exitCode(9);
    expect(cli).to.have.stdout("");
    expect(cli).to.have.stderr.that.matches(/^The --subject option requires a value\.\n\nUsage: shipengine \[options\] \[files...\]\n/);
  });

  it("should print a more detailed error if DEBUG is set", () => {
    let cli = shipengine("--greeting Goodbye", { env: { DEBUG: "true" }});

    expect(cli).to.have.stdout("");
    expect(cli).to.have.exitCode(1);
    expect(cli).to.have.stderr.that.matches(/^Error: Cannot say goodbye\n\s+at \w+/);
  });

});

describe("shipengine --help", () => {

  it("should show usage text", () => {
    let cli = shipengine("--help");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.matches(/\nUsage: shipengine \[options\] \[files...\]\n/);
  });

  it("should support -h shorthand", () => {
    let cli = shipengine("-h");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.matches(/\nUsage: shipengine \[options\] \[files...\]\n/);
  });

  it("should ignore other arguments", () => {
    let cli = shipengine("--quiet --help --version");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.matches(/\nUsage: shipengine \[options\] \[files...\]\n/);
  });

  it("should ignore other shorthand arguments", () => {
    let cli = shipengine("-qhv");

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.contains(manifest.description);
    expect(cli).to.have.stdout.that.matches(/\nUsage: shipengine \[options\] \[files...\]\n/);
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
