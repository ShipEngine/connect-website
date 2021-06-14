/* eslint-disable brace-style */
"use strict";

const { expect } = require("chai");
const AppsApiClient = require("../../../lib/core/api-client")
  .default;
const path = require("path");

const invalidClient = new AppsApiClient("invalid");

describe("AppsApiClient @integration", () => {
  describe("apps", () => {
    describe("create", () => {
      it("returns an error when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.apps.create({
            name: "test app",
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });

    describe("findOrCreateByName", () => {
      it("returns an error when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.apps.findOrCreateByName({
            name: "app",
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });

    describe("getAll", () => {
      it("returns an error when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.apps.getAll();
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });

    describe("getById", () => {
      it("returns an error when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.apps.getById("invalid");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });

    describe("getByName", () => {
      it("returns an error when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.apps.getByName("invalid");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });
  });

  describe("deployments", () => {
    describe("create", () => {
      it("returns an error when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.deployments.create({
            appId: "test",
            pathToTarball: path.join(process.cwd(), "test/fixtures/test.tgz"),
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });

    describe("getAllForAppId", () => {
      it("returns an error when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.deployments.getAllForAppId("id");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });

    describe("getById", () => {
      it("returns an error when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.deployments.getById("appId", "deploymentId");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });

    describe.skip("getLogsById", () => {
      it("returns an error when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.deployments.getLogsById("appId", "deploymentId");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });
  });

  describe("diagnostics", () => {
    describe("heartBeat", () => {
      it("returns a pulse when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.diagnostics.heartBeat();
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql({
          pulse: "yes",
        });
      });
    });
  });

  describe("users", () => {
    describe("getCurrent", () => {
      it("returns an ERR_UNAUTHORIZED when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.users.getCurrent();
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });
  });

  describe("sellers", () => {
    describe("getSellersForAppId", () => {
      it("returns an ERR_UNAUTHORIZED when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.sellers.getSellersForAppId();
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });

    describe("createSeller", () => {
      it("returns an ERR_UNAUTHORIZED when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.sellers.createSeller("id", "test@test.com", "test", "US");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_UNAUTHORIZED");
        expect(errorResponse.message).equal("The given API key is not valid");
      });
    });
  });
});
