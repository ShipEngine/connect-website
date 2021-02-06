"use strict";

const nock = require("nock");

const apiMock = nock("https://connect-api.shipengine.com");

module.exports = apiMock;
