import { OrderApp } from '@shipengine/connect-sdk/lib/internal';
import logger from '../util/logger';
import * as fs from 'fs';
import { loadApp } from '@shipengine/connect-loader';

const dxAppPath = process.env.DX_APP_PATH;

if (!dxAppPath) {
  logger.error('DX_APP_PATH was not set- no DX app to load!');
  process.exit(1);
}

if (!fs.existsSync(dxAppPath)) {
  logger.error(`${dxAppPath} does not exist`);
  process.exit(1);
}

export default async (): Promise<OrderApp> => {
  logger.info(`loading app from ${dxAppPath}`);

  try {
    const app = await loadApp(dxAppPath);
    logger.info(`Successfully loaded ${app.manifest.name} v${app.manifest.version}`);
    logger.info(`This is a ${app.type} app that uses v${app.sdkVersion} of the SDK`);
    // TODO: TS doesn't think that app could be an OrderApp?
    return app as any;
  } catch (err) {
    logger.error(err.message, err);
    process.exit(1);
  }
};
