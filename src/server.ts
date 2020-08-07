import express from "express";
import cors from "cors";
import { loadApp } from "@shipengine/integration-platform-loader";
import { CarrierApp } from "@shipengine/integration-platform-sdk/lib/internal";

import buildAPI from "./build-api";
import log from "./utils/logger";

export async function server(port: number, pathToApp: string): Promise<void> {
  const app = express();

  app.use(cors());

  try {
    const sdkApp = (await loadApp(pathToApp)) as CarrierApp;
    buildAPI(sdkApp, app);
  } catch (error) {
    // TODO - consider how this should work
    // We want an app to have the ability to boot up even if it is not valid
    // But I think we only want to boot up if we are in a valid app directory
    console.log("Error building API from SDK");
    console.log(error.stack);
  }

  app.listen(port, () => log(`server running at http://localhost:${port}`));
}
