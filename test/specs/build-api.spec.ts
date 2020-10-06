import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import express from "express";
import { loadApp } from "@shipengine/connect-loader";
import { AppPOJO } from "@shipengine/connect-sdk/lib/internal";
import { SdkApp } from '../../src/types'

import logger from "../../src/utils/logger";
import buildAPI from "../../src/build-api";

// Disable the logger to make test less noisy
logger.disable = true;

chai.use(chaiHttp);

describe("buildAPI", () => {
  it("sets the GET '/' endpoint", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .get("/")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty("name", "ShipEngine Testing");
        expect(res.body).to.haveOwnProperty("description", "Another test app!");
        expect(res.body).to.haveOwnProperty(
          "websiteURL",
          "http://www.carier-site.com/",
        );
        expect(res.body).to.haveOwnProperty("settingsForm");
        expect(res.body).to.haveOwnProperty("connectionForm");
        expect(res.body).to.haveOwnProperty("deliveryServices");
      });
  });

  it("sets the PUT '/connect' endpoint and returns 200 when given a valid input", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/connect")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        connectionFormData: {
          email: "jdoe87@example.com",
          password: "p@$$w0rd",
          agree_to_eula: true,
        },
      })
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.eql({
          transaction: {
            id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
            session: {
              email: "jdoe87@example.com",
              password: "p@$$w0rd",
              agree_to_eula: true,
            },
          },
        });
      });
  });

  it("sets the PUT '/connect' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/connect")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        connectionFormData: {
          email: "jdoe87@example.com",
          password: "p@$$w0rd",
          agree_to_eula: false,
        },
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_APP_ERROR");
      });
  });

  it("does not set the PUT '/connect' endpoint when connect is not defined", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app-without-methods";

    const app = (await loadApp(
      pathToApp,
    )) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/connect")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });

  it("sets the PUT '/create-shipment' endpoint", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/create-shipment")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        shipment: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("sets the PUT '/create-shipment' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/create-shipment")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        shipment: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("does not set the PUT '/create-shipment' endpoint when connect is not defined", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app-without-methods";
    const app = (await loadApp(
      pathToApp,
    )) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/create-shipment")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });

  it("sets the PUT '/cancel-shipments' endpoint", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/cancel-shipments")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        outcomes: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("sets the PUT '/cancel-shipments' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/cancel-shipments")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        outcomes: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("does not set the PUT '/cancel-shipments' endpoint when connect is not defined", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app-without-methods";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/cancel-shipments")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });

  it("sets the PUT '/rate-shipment' endpoint", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/rate-shipment")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        rates: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("sets the PUT '/rate-shipment' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/rate-shipment")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        rates: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("does not set the PUT '/rate-shipment' endpoint when connect is not defined", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app-without-methods";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/rate-shipment")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });

  it("sets the PUT '/track-shipment' endpoint", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/track-shipment")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        trackingInfo: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("sets the PUT '/track-shipment' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/track-shipment")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        trackingInfo: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("does not set the PUT '/track-shipment' endpoint when connect is not defined", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app-without-methods";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/track-shipment")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });

  it("sets the PUT '/create-manifest' endpoint", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/create-manifest")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        manifest: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("sets the PUT '/create-manifest' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/create-manifest")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        manifest: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("does not set the PUT '/create-manifest' endpoint when connect is not defined", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app-without-methods";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/create-manifest")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });

  it("sets the PUT '/schedule-pickup' endpoint", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/schedule-pickup")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        pickup: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("sets the PUT '/schedule-pickup' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/schedule-pickup")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        pickup: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("does not set the PUT '/schedule-pickup' endpoint when connect is not defined", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app-without-methods";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/schedule-pickup")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });

  it("sets the PUT '/cancel-pickups' endpoint", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/cancel-pickups")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        pickups: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("sets the PUT '/cancel-pickups' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/cancel-pickups")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        pickups: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("does not set the PUT '/cancel-pickups' endpoint when connect is not defined", async () => {
    const server = express();
    const pathToApp = "test/fixtures/carrier-app-without-methods";
    const app = (await loadApp(pathToApp)) as unknown as SdkApp;

    buildAPI(pathToApp, app, server, 3000);

    chai
      .request(server)
      .put("/cancel-pickups")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });

  // it("sets the PUT '/shipment-created' endpoint", async () => {
  //   const server = express();
  //   const app = (await loadApp("test/fixtures/order-app")) as unknown as SdkApp;

  //   buildAPI(app, server, 3000);

  //   chai
  //     .request(server)
  //     .put("/shipment-created")
  //     .send({
  //       transaction: {
  //         id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
  //         session: {},
  //       },
  //       shipment: {},
  //     })
  //     .end((_err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
  //     });
  // });

  // it("sets the PUT '/shipment-created' endpoint and returns 400 when given an invalid input", async () => {
  //   const server = express();
  //   const app = (await loadApp("test/fixtures/order-app")) as unknown as SdkApp;

  //   buildAPI(app, server, 3000);

  //   chai
  //     .request(server)
  //     .put("/shipment-created")
  //     .send({
  //       transaction: {
  //         id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
  //         session: {},
  //       },
  //       shipment: {},
  //     })
  //     .end((_err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
  //     });
  // });

  // it("sets the PUT '/get-sales-orders-by-date' endpoint", async () => {
  //   const server = express();
  //   const app = (await loadApp("test/fixtures/order-app")) as unknown as SdkApp;

  //   buildAPI(app, server, 3000);

  //   chai
  //     .request(server)
  //     .put("/get-sales-orders-by-date")
  //     .send({
  //       transaction: {
  //         id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
  //         session: {},
  //       },
  //       range: {},
  //     })
  //     .end((_err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
  //     });
  // });

  // it("sets the PUT '/get-sales-orders-by-date' endpoint and returns 400 when given an invalid input", async () => {
  //   const server = express();
  //   const app = (await loadApp("test/fixtures/order-app")) as unknown as SdkApp;

  //   buildAPI(app, server, 3000);

  //   chai
  //     .request(server)
  //     .put("/get-sales-orders-by-date")
  //     .send({
  //       transaction: {
  //         id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
  //         session: {},
  //       },
  //       range: {},
  //     })
  //     .end((_err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
  //     });
  // });
});
