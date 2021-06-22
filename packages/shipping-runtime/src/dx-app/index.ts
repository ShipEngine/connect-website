import { CarrierApp } from '@shipengine/connect-sdk/lib/internal';
import logger from '../util/logger';
import * as fs from 'fs';
import { loadApp } from '@shipengine/connect-loader';

const dxAppPath = process.env.DX_APP_PATH;
const checkAppPathExists = () => {
  if (!dxAppPath) {
    logger.error('DX_APP_PATH was not set- no DX app to load!');
    process.exit(1);
  }
  if (!fs.existsSync(dxAppPath)) {
    logger.error(`${dxAppPath} does not exist`);
    process.exit(1);
  }
};

checkAppPathExists();

export default async (): Promise<CarrierApp> => {
  logger.info(`loading app from ${dxAppPath}`);
  try {
    const app = await loadApp(dxAppPath);
    logger.info(
      `Successfully loaded ${app.manifest.name} v${app.manifest.version}`,
    );
    logger.info(
      `This is a ${app.type} app that uses v${app.sdkVersion} of the SDK`,
    );
    return (app as unknown) as CarrierApp;
  } catch (error) {
    logger.error(error.message, error);
    process.exit(1);
  }
};
