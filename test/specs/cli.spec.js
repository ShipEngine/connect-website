"use strict";

const { expect } = require("chai");
const chai = require("chai");
const chaiExec = require("@jsdevtools/chai-exec");
const manifest = require("../../package.json");

chai.use(chaiExec);
chaiExec.defaults = { command: "node", args: "bin/connect.js" };

describe("CLI", () => {

  it("should show usage info if run without any arguments", () => {
    let cli = chaiExec();

    expect(cli).to.have.exitCode(0);
    expect(cli).to.have.stderr("");
    expect(cli).to.have.stdout.that.matches(/^Connect CLI\n\nUSAGE\n/);
  });

  describe("connect --help", () => {
    it("should show usage text", () => {
      let cli = chaiExec("--help");

      expect(cli).to.have.exitCode(0);
      expect(cli).to.have.stderr("");
      expect(cli).to.have.stdout.that.matches(/^Connect CLI\n\nUSAGE\n/);
    });

    it("should support -h shorthand", () => {
      let cli = chaiExec("-h");

      expect(cli).to.have.exitCode(0);
      expect(cli).to.have.stderr("");
      expect(cli).to.have.stdout.that.matches(/^Connect CLI\n\nUSAGE\n/);
    });

    it("should show usage text for a specific command", () => {
      let cli = chaiExec("init --help");

      expect(cli).to.have.exitCode(0);
      expect(cli).to.have.stderr("");
      expect(cli).to.have.stdout.that.matches(/^Create a new package to develop a custom ShipEngine app\n\nUSAGE\n/);
    });

    it("should show usage text for a specific command using the -h shorthand", () => {
      let cli = chaiExec("publish -h");

      expect(cli).to.have.exitCode(0);
      expect(cli).to.have.stderr("");
      expect(cli).to.have.stdout.that.matches(/^Packages and publishes your app to the dev server\n\nUSAGE\n/);
    });
  });

  describe("connect --version", () => {
    const cliVersion = manifest.dependencies["@shipengine/connect-cli"].slice(1);

    it("should show the version number", () => {
      let cli = chaiExec("--version");

      expect(cli).to.have.exitCode(0);
      expect(cli).to.have.stderr("");
      expect(cli).to.have.stdout.that.contains(`@shipengine/connect-cli/${cliVersion} `);
    });

    it("should support -v shorthand", () => {
      let cli = chaiExec("-v");

      expect(cli).to.have.exitCode(0);
      expect(cli).to.have.stderr("");
      expect(cli).to.have.stdout.that.contains(`@shipengine/connect-cli/${cliVersion} `);
    });
  });
});
