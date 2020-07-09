/* eslint-disable brace-style */
"use strict";

const { expect } = require("chai");
const ShipengineApiClient = require("../../../lib/core/integrations-api-client")
  .default;
const apiMock = require("../api-mock");
const path = require("path");

describe("IntegrationsApiClient", () => {
  describe("apps", () => {
    describe("create", () => {
      it("returns an app", async () => {
        const apiResponse = {
          id: "a9a84a1c-55ce-49f3-8cd7-f088e93ccada",
          name: "test app",
          type: "carrier",
        };
        apiMock.post("/api/apps").reply(200, apiResponse);

        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;
        try {
          response = await client.apps.create({
            name: "test app",
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponse);
      });

      it("returns an error when given an invalid API key", async () => {
        const apiResponse = {
          statusCode: 401,
          name: "unauthorized",
          errors: [
            {
              message: "invalid auth",
            },
          ],
          status: 401,
        };
        apiMock.post("/api/apps").reply(401, apiResponse);

        const client = new ShipengineApiClient("invalid");
        let response, errorResponse;
        try {
          response = await client.apps.create({
            name: "test app",
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse).to.be.eql(apiResponse);
      });
    });

    describe("findOrCreateByName", () => {
      it("finds an app when one already exists", async () => {
        const apiResponse = {
          items: [
            {
              id: "a9a84a1c-55ce-49f3-8cd7-f088e93ccada",
              name: "test-app",
              type: "carrier",
            },
          ],
          itemsPerPage: 100000,
          totalPages: 1,
          pageNumber: 0,
        };

        apiMock.get("/api/apps?name=test-app").reply(200, apiResponse);

        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;
        try {
          response = await client.apps.findOrCreateByName({
            name: "test-app",
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponse.items[0]);
      });

      it("creates an app when one does not already exists", async () => {
        const apiResponseOne = {
          items: [],
          itemsPerPage: 100000,
          totalPages: 1,
          pageNumber: 0,
        };
        apiMock.get("/api/apps?name=test-app").reply(200, apiResponseOne);
        const apiResponseTwo = {
          id: "a9a84a1c-55ce-49f3-8cd7-f088e93ccada",
          name: "test app",
          type: "carrier",
        };
        apiMock.post("/api/apps").reply(200, apiResponseTwo);

        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;
        try {
          response = await client.apps.findOrCreateByName({
            name: "test-app",
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponseTwo);
      });

      it("returns an error when given an invalid API key", async () => {
        const apiResponse = {
          statusCode: 401,
          name: "unauthorized",
          errors: [
            {
              message: "invalid auth",
            },
          ],
          status: 401,
        };
        apiMock.get("/api/apps?name=test-app").reply(401, apiResponse);

        const client = new ShipengineApiClient("invalid");
        let response, errorResponse;
        try {
          response = await client.apps.findOrCreateByName({
            name: "test-app",
            type: "carrier",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse).to.be.eql(apiResponse);
      });
    });

    describe("getAll", () => {
      it("returns an array of apps", async () => {
        const apiResponse = {
          items: [
            {
              id: "a9a84a1c-55ce-49f3-8cd7-f088e93ccada",
              name: "test-app",
              type: "carrier",
            },
          ],
          itemsPerPage: 100000,
          totalPages: 1,
          pageNumber: 0,
        };

        apiMock.get("/api/apps").reply(200, apiResponse);

        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;
        try {
          response = await client.apps.getAll();
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponse);
      });

      it("returns an error when given an invalid API key", async () => {
        const apiResponse = {
          statusCode: 401,
          name: "unauthorized",
          errors: [
            {
              message: "invalid auth",
            },
          ],
          status: 401,
        };
        apiMock.get("/api/apps").reply(401, apiResponse);

        const client = new ShipengineApiClient("invalid");
        let response, errorResponse;
        try {
          response = await client.apps.getAll();
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse).to.be.eql(apiResponse);
      });
    });

    describe("getById", () => {
      it("returns an app", async () => {
        const apiResponse = {
          id: "a9a84a1c-55ce-49f3-8cd7-f088e93ccada",
          name: "test app",
          type: "carrier",
        };
        apiMock
          .get("/api/apps/a9a84a1c-55ce-49f3-8cd7-f088e93ccada")
          .reply(200, apiResponse);

        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;
        try {
          response = await client.apps.getById(
            "a9a84a1c-55ce-49f3-8cd7-f088e93ccada",
          );
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponse);
      });

      it("returns an error when given an invalid API key", async () => {
        const apiResponse = {
          statusCode: 401,
          name: "unauthorized",
          errors: [
            {
              message: "invalid auth",
            },
          ],
          status: 401,
        };
        apiMock.get("/api/apps/test-id").reply(401, apiResponse);

        const client = new ShipengineApiClient("invalid");
        let response, errorResponse;
        try {
          response = await client.apps.getById("test-id");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse).to.be.eql(apiResponse);
      });
    });

    describe("getByName", () => {
      it("returns an app", async () => {
        const apiResponse = {
          items: [
            {
              id: "a9a84a1c-55ce-49f3-8cd7-f088e93ccada",
              name: "test-app",
              type: "carrier",
            },
          ],
          itemsPerPage: 100000,
          totalPages: 1,
          pageNumber: 0,
        };

        apiMock.get("/api/apps?name=test-app").reply(200, apiResponse);

        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;
        try {
          response = await client.apps.getByName("test-app");
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponse.items[0]);
      });

      it("returns an error when given an invalid API key", async () => {
        const apiResponse = {
          statusCode: 401,
          name: "unauthorized",
          errors: [
            {
              message: "invalid auth",
            },
          ],
          status: 401,
        };
        apiMock.get("/api/apps?name=test-app").reply(401, apiResponse);

        const client = new ShipengineApiClient("invalid");
        let response, errorResponse;
        try {
          response = await client.apps.getByName("test-app");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse).to.be.eql(apiResponse);
      });
    });
  });

  describe("deployments", () => {
    describe("create", () => {
      it("creates a deployment", async () => {
        const apiResponse = {
          id: "a9a84a1c-55ce-49f3-8cd7-f088e93ccada",
          package: {
            name: "test app",
          },
        };
        apiMock.post("/api/apps/test/deploys").reply(200, apiResponse);

        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;
        try {
          response = await client.deployments.create({
            appId: "test",
            pathToTarball: path.join(process.cwd(), "test/fixtures/test.tgz"),
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponse);
      });

      it("returns an error when given an invalid API key", async () => {
        const apiResponse = {
          statusCode: 401,
          name: "unauthorized",
          errors: [
            {
              message: "invalid auth",
            },
          ],
          status: 401,
        };
        apiMock.post("/api/apps/test/deploys").reply(401, apiResponse);

        const client = new ShipengineApiClient("invalid");
        let response, errorResponse;
        try {
          response = await client.deployments.create({
            appId: "test",
            pathToTarball: path.join(process.cwd(), "test/fixtures/test.tgz"),
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse).to.be.eql(apiResponse);
      });
    });

    describe("getAllForAppId", () => {
      it("returns an array of deployments for the given app ID", async () => {
        const apiResponse = {
          items: [
            {
              deployId: "1",
              package: {
                name: "test-1.0.0.tgz",
                version: null,
              },
              createdAt: "2020-06-11T22:48:46.555Z",
              updatedAt: "2020-06-11T22:50:54.109Z",
              status: "error",
              definitionErrors: null,
            },
          ],
          itemsPerPage: 100000,
          totalPages: 1,
          pageNumber: 0,
        };
        apiMock.get("/api/apps/test/deploys").reply(200, apiResponse);

        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;
        try {
          response = await client.deployments.getAllForAppId("test");
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponse);
      });

      it("returns an error when given an invalid API key", async () => {
        const apiResponse = {
          statusCode: 401,
          name: "unauthorized",
          errors: [
            {
              message: "invalid auth",
            },
          ],
          status: 401,
        };
        apiMock.get("/api/apps/test/deploys").reply(401, apiResponse);

        const client = new ShipengineApiClient("invalid");
        let response, errorResponse;
        try {
          response = await client.deployments.getAllForAppId("test");
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse).to.be.eql(apiResponse);
      });
    });

    describe("getById", () => {
      it("returns an array of deployments for the given app ID", async () => {
        const apiResponse = {
          deployId: "1",
          package: {
            name: "test-1.0.0.tgz",
            version: null,
          },
          createdAt: "2020-06-11T22:48:46.555Z",
          updatedAt: "2020-06-11T22:50:54.109Z",
          status: "error",
          definitionErrors: null,
        };
        apiMock.get("/api/apps/test/deploys/1").reply(200, apiResponse);

        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;
        try {
          response = await client.deployments.getById({
            appId: "test",
            deployId: apiResponse.deployId,
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponse);
      });

      it("returns an error when given an invalid API key", async () => {
        const apiResponse = {
          statusCode: 401,
          name: "unauthorized",
          errors: [
            {
              message: "invalid auth",
            },
          ],
          status: 401,
        };
        apiMock.get("/api/apps/test/deploys/1").reply(401, apiResponse);

        const client = new ShipengineApiClient("invalid");
        let response, errorResponse;
        try {
          response = await client.deployments.getById({
            appId: "test",
            deployId: "1",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse).to.be.eql(apiResponse);
      });
    });

    describe("getLogsById", () => {
      it("returns an array of deployments for the given app ID", async () => {
        const apiResponse = "test";
        apiMock.get("/api/apps/test/deploys/1/logs").reply(200, apiResponse);

        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;

        try {
          response = await client.deployments.getLogsById({
            appId: "test",
            deployId: "1",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponse);
      });

      it("returns an error when given an invalid API key", async () => {
        const apiResponse = {
          statusCode: 401,
          name: "unauthorized",
          errors: [
            {
              message: "invalid auth",
            },
          ],
          status: 401,
        };

        apiMock.get("/api/apps/test/deploys/1/logs").reply(401, apiResponse);

        const client = new ShipengineApiClient("invalid");
        let response, errorResponse;

        try {
          response = await client.deployments.getLogsById({
            appId: "test",
            deployId: "1",
          });
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse).to.be.eql(apiResponse);
      });
    });
  });

  describe("diagnostics", () => {
    const client = new ShipengineApiClient("api key");

    describe("heartBeat", () => {
      it("returns a pulse", async () => {
        apiMock.get("/api/diagnostics/heartbeat").reply(200, {
          pulse: "yes",
        });

        let response, errorResponse;
        try {
          response = await client.diagnostics.heartBeat();
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
      it("returns a user", async () => {
        const apiResponse = { name: "test", email: "test@test.user.com" };
        apiMock.get("/api/diagnostics/whoami").reply(200, apiResponse);
        const client = new ShipengineApiClient("valid key");
        let response, errorResponse;
        try {
          response = await client.users.getCurrent();
        } catch (error) {
          errorResponse = error;
        }

        expect(errorResponse).to.be.undefined;
        expect(response).to.eql(apiResponse);
      });

      it("returns an error when given an invalid API key", async () => {
        const apiResponse = {
          statusCode: 401,
          name: "unauthorized",
          errors: [
            {
              message: "invalid auth",
            },
          ],
          status: 401,
        };
        apiMock.get("/api/diagnostics/whoami").reply(401, apiResponse);
        const client = new ShipengineApiClient("invalid");
        let response, errorResponse;
        try {
          response = await client.users.getCurrent();
        } catch (error) {
          errorResponse = error;
        }

        expect(response).to.be.undefined;
        expect(errorResponse).to.be.eql(apiResponse);
      });
    });
  });
});
