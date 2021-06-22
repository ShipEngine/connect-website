import { join } from 'path';
import { readFileSync } from 'fs';

const readPackage = (path: string): object => {
  const packagePath = join(path, 'package.json');
  const packageData = readFileSync(packagePath);
  if (!packageData || packageData.length === 0) {
    throw new Error(`failed to read ${packagePath}`);
  }
  return JSON.parse(packageData.toString());
};

export { readPackage };
