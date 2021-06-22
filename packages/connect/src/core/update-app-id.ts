import { AppManifestPOJO } from '@shipengine/connect-sdk/lib/internal';
import { readFileSync, writeFileSync } from 'fs';

export const updateAppId = (packagePath = '.', id: string) => {
  const pjson = JSON.parse(
    readFileSync(packagePath, 'utf-8'),
  ) as AppManifestPOJO;
  pjson.appId = id;
  writeFileSync(packagePath, JSON.stringify(pjson, null, 2));
};
