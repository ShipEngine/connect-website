"use strict";

const nock = require("nock");

const apiMock = nock("https://dip-webapi-dev.kubedev.sslocal.com");

module.exports = apiMock;
