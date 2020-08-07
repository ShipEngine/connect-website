import express from "express";
import cors from "cors";
import { loadApp } from "@shipengine/integration-platform-loader";
import { CarrierApp } from "@shipengine/integration-platform-sdk/lib/internal";

import buildAPI from "./build-api";
import log from "./utils/logger";

export default async function server(
  port: number,
  pathToApp: string,
): Promise<void> {
  const server = express();

  server.use(cors());

  const appStatus = {
    status: "up",
    error: null,
  };

  try {
    const sdkApp = (await loadApp(pathToApp)) as CarrierApp;
    buildAPI(sdkApp, server);
  } catch (error) {
    appStatus.status = "down";
    appStatus.error = error;
    // TODO - consider how this should work
    // We want an app to have the ability to boot up even if it is not valid
    // But I think we only want to boot up if we are in a valid app directory
    log("Error building API from SDK");
    log(error.stack);
  }

  server.get("/app-status", (_req, res) => {
    res.status(200).send(appStatus);
  });

  // TODO - change log message to something meaningful
  server.listen(port, () => log(`server running at http://localhost:${port}`));
}
