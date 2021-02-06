"use strict";

const { expect } = require("chai");
const getVersions = require("../../../../lib/core/utils/get-versions").default;


describe("getVersions", () => {
  it("returns an object with all the connect versions", () => {
    expect(getVersions()).to.haveOwnProperty("node");
    expect(getVersions()).to.haveOwnProperty("@shipengine/connect-cli");
    expect(getVersions()).to.haveOwnProperty("@shipengine/connect-sdk");
    expect(getVersions()).to.haveOwnProperty("@shipengine/connect-loader");
    expect(getVersions()).to.haveOwnProperty("@shipengine/connect-local-dev-api");
    expect(getVersions()).to.haveOwnProperty("@shipengine/connect-local-dev-ui");
  });
});
