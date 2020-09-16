/* eslint-disable brace-style */
"use strict";

const { expect } = require("chai");
const { testApiKey } = require('../../utils/test-api-key');
const AppsApiClient = require("../../../lib/core/api-client")
  .default;
const uuid = require("uuid");
const path = require("path");

const validClient = new AppsApiClient(testApiKey);
const invalidClient = new AppsApiClient("invalid");

describe("AppsApiClient @integration", () => {
  describe("apps", () => {
    describe("create", () => {
      it("returns an app", async () => {
        let response;
        let errorResponse;

        const appName = `test app ${uuid.v4()}`;

        try {
          response = await validClient.apps.create({
            name: appName,
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response.name).equal(appName);
      });

      it("returns an error when an app already exist for the given name", async () => {
        let response;
        let errorResponse;

        const appName = `test app ${uuid.v4()}`;

        await validClient.apps.create({
          name: appName,
          type: "carrier",
        });

        try {
          response = await validClient.apps.create({
            name: appName,
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_BAD_REQUEST");
        expect(errorResponse.message).equal(`An app named '${appName}' already exists`);
      });

      it("returns an error when given invalid params", async () => {
        let response;
        let errorResponse;

        const appName = `test app ${uuid.v4()}`;

        try {
          response = await validClient.apps.create({
            name: appName,
            type: "invalid",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_BAD_REQUEST");
        expect(errorResponse.message).equal("The request was invalid");
      });

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
      it("finds an app when one already exists", async () => {
        const appName = `test app ${uuid.v4()}`;

        await validClient.apps.create({
          name: appName,
          type: "carrier",
        });

        let response;
        let errorResponse;
        try {
          response = await validClient.apps.findOrCreateByName({
            name: appName,
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response.name).to.eql(appName);
        expect(errorResponse).to.be.undefined;
      });

      it("creates an app when one does not already exists", async () => {
        const appName = `test app ${uuid.v4()}`;

        let response;
        let errorResponse;

        try {
          response = await validClient.apps.findOrCreateByName({
            name: appName,
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response.name).to.eql(appName);
        expect(errorResponse).to.be.undefined;
      });

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
      it("returns an array of apps w/ pagination data", async () => {
        let response;
        let errorResponse;

        try {
          response = await validClient.apps.getAll();
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response.items).to.be.an('array')
        expect(response.itemsPerPage).to.be.an('number')
        expect(response.totalPages).to.be.an('number')
        expect(response.pageNumber).to.be.an('number')
      });

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
      it("returns an app", async () => {
        const appName = `test app ${uuid.v4()}`;

        const app = await validClient.apps.create({
          name: appName,
          type: "carrier",
        });

        let response;
        let errorResponse;

        try {
          response = await validClient.apps.getById(app.id);
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response.id).to.eql(app.id);
      });

      it("returns an error when given an invalid app name", async () => {
        let response;
        let errorResponse;

        try {
          response = await validClient.apps.getById("invalid");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_NOT_FOUND");
        expect(errorResponse.message).equal("The record could not be found");
      });

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
      it("returns an app", async () => {
        const appName = `test app ${uuid.v4()}`;

        const app = await validClient.apps.create({
          name: appName,
          type: "carrier",
        });

        let response;
        let errorResponse;

        try {
          response = await validClient.apps.getByName(app.name);
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response.name).to.eql(app.name);
      });

      it("returns an error when given an invalid app name", async () => {
        let response;
        let errorResponse;

        try {
          response = await validClient.apps.getByName("invalid");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_NOT_FOUND");
        expect(errorResponse.message).equal("The record could not be found");
      });

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
      it("creates a deployment", async () => {
        const app = await validClient.apps.findOrCreateByName({
          name: "test app",
          type: "carrier",
        });

        let response;
        let errorResponse;

        const packageName = 'test.tgz';

        try {
          response = await validClient.deployments.create({
            appId: app.id,
            pathToTarball: path.join(process.cwd(), `test/fixtures/${packageName}`),
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response.package.name).to.eql(packageName);
      });

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
      it("returns an array of deployments for the given app ID", async () => {
        const app = await validClient.apps.findOrCreateByName({
          name: "test app",
          type: "carrier",
        });

        const packageName = 'test.tgz';

        await validClient.deployments.create({
          appId: app.id,
          pathToTarball: path.join(process.cwd(), `test/fixtures/${packageName}`),
        });

        let response;
        let errorResponse;

        try {
          response = await validClient.deployments.getAllForAppId(app.id);
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response.items).to.be.an('array')
        expect(response.itemsPerPage).to.be.an('number')
        expect(response.totalPages).to.be.an('number')
        expect(response.pageNumber).to.be.an('number')
      });

      it("returns an error when given an invalid ID", async () => {
        let response;
        let errorResponse;

        try {
          response = await validClient.deployments.getAllForAppId("invalid");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_NOT_FOUND");
        expect(errorResponse.message).equal("The record could not be found");
      });

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
      it("returns a deployment for a given ID", async () => {
        const app = await validClient.apps.findOrCreateByName({
          name: "test app",
          type: "carrier",
        });

        const packageName = 'test.tgz';
        const deployment = await validClient.deployments.create({
          appId: app.id,
          pathToTarball: path.join(process.cwd(), `test/fixtures/${packageName}`),
        });

        let response;
        let errorResponse;

        try {
          response = await validClient.deployments.getById({ appId: app.id, deployId: deployment.deployId });
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response.package.name).to.eql(packageName);
      });

      it("returns an error when given an invalid ID", async () => {
        let response;
        let errorResponse;

        try {
          response = await validClient.deployments.getById("invalid", "invalid");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_NOT_FOUND");
        expect(errorResponse.message).equal("The record could not be found");
      });

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

    describe("getLogsById", () => {
      it("returns logs for a given ID", async () => {
        const app = await validClient.apps.findOrCreateByName({
          name: "test app",
          type: "carrier",
        });

        const packageName = 'test.tgz';
        const deployment = await validClient.deployments.create({
          appId: app.id,
          pathToTarball: path.join(process.cwd(), `test/fixtures/${packageName}`),
        });

        let response;
        let errorResponse;

        try {
          response = await validClient.deployments.getLogsById({ appId: app.id, deployId: deployment.deployId });
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.be.a('string');
      });

      it("returns an error when given an invalid ID", async () => {
        let response;
        let errorResponse;

        try {
          response = await validClient.deployments.getLogsById("invalid", "invalid");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse.code).equal("ERR_NOT_FOUND");
        expect(errorResponse.message).equal("The record could not be found");
      });

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
      it("returns a pulse", async () => {
        let response;
        let errorResponse;

        try {
          response = await validClient.diagnostics.heartBeat();
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql({
          pulse: "yes",
        });
      });
    });

    it("returns a pulse when given an invalid API key", async () => {
      let response;
      let errorResponse;

      try {
        response = await validClient.diagnostics.heartBeat();
      } catch (error) {
        errorResponse = error;
      }

      expect(errorResponse).to.be.undefined;
      expect(response).to.eql({
        pulse: "yes",
      });
    });
  });

  describe("users", () => {
    describe("getCurrent", () => {
      it("returns a user", async () => {
        let response;
        let errorResponse;

        try {
          response = await validClient.users.getCurrent();
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql({ name: "pierce", email: "pierce.harmon@shipengine.com" });
      });

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
      it("returns an array of sellers", async () => {
        const app = await validClient.apps.findOrCreateByName({
          name: "test app",
          type: "carrier",
        });

        const packageName = 'test.tgz';

        await validClient.deployments.create({
          appId: app.id,
          pathToTarball: path.join(process.cwd(), `test/fixtures/${packageName}`),
        });

        let response;
        let errorResponse;

        try {
          response = await validClient.sellers.getSellersForAppId(app.id);
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.be.an('array')
      });

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
      it("returns a seller", async () => {
        const app = await validClient.apps.findOrCreateByName({
          name: "test app",
          type: "carrier",
        });

        const packageName = 'test.tgz';

        await validClient.deployments.create({
          appId: app.id,
          pathToTarball: path.join(process.cwd(), `test/fixtures/${packageName}`),
        });

        let response;
        let errorResponse;

        try {
          response = await validClient.sellers.createSeller(app.id, `${uuid.v4()}@test.com`, uuid.v4());
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql('')
      });

      it("returns an ERR_UNAUTHORIZED when given an invalid API key", async () => {
        let response;
        let errorResponse;

        try {
          response = await invalidClient.sellers.createSeller("id", "test@test.com", "test");
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
