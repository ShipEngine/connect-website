import {CarrierApp} from "@shipengine/integration-platform-sdk";

const dxAppPath = process.env.DX_APP_PATH;
import logger from "../logger";
import * as fs from "fs";

import * as loader from "@shipengine/integration-platform-loader";

if (!dxAppPath) {
  logger.error("DX_APP_PATH was not set- no DX app to load!");
  process.exit(1);
}

if (!fs.existsSync(dxAppPath)) {
  logger.error(`${dxAppPath} does not exist`);
  process.exit(1);
}

export default async (): Promise<CarrierApp> => {
  logger.info(`loading app from ${dxAppPath}`);
  return loader.loadApp(dxAppPath).then((app) => {
      logger.info(`Successfully loaded ${app.manifest.name} v${app.manifest.version}`);
      logger.info(`This is a ${app.type} app that uses v${app.sdkVersion} of the SDK`);
    return <CarrierApp>app;
  }).catch(err => {
    logger.error(err.message, err);
    process.exit(1);
  })
}
