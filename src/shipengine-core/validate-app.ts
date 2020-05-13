import { loadApp, App } from "@shipengine/integration-platform-loader";
import Mocha from "mocha";
import * as fs from "fs";
import * as path from "path";
import * as fsExtra from "fs-extra";
import readdir from "recursive-readdir";
export class InvalidAppError extends Error {
  errors: string[];

  constructor(message: string, errors: string[]) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = InvalidAppError.name; // stack traces display correctly now
    this.errors = errors;
  }
}

function isError(error: string): boolean {
  const nonErrorChecks = [
    /Error loading the ShipEngine Integration Platform app:/,
    /Invalid ShipEngine Integration Platform/,
  ];

  return !nonErrorChecks.some((regex) => {
    return error.match(regex);
  });
}

// TODO - handle following
// Make sure the cwd has a package.json file
//  ›   Error: Error: Cannot find module '/Users/pierce/package.json'
//  ›   Require stack: ...

// Make sure there is a local installation of the SDK
//  ›   Error: Looks like you're missing a local installation of
//  ›   @shipengine/integration-platform-sdk. Run `npm install` to resolve
export async function validateApp(pathToApp: string): Promise<App> {
  try {
    const app = await loadApp(pathToApp);
    return app;
  } catch (error) {
    const errors: string[] = error.message
      .split(/\r?\n/)
      .filter((errorLine: string) => {
        return isError(errorLine);
      })
      .map((errorLine: string) => {
        return errorLine.trim();
      });

    return Promise.reject(new InvalidAppError(error.message, errors));
  }
}

export async function validateTestSuite(app: App): Promise<void> {

  // Find all methods that aren't undefined.

  // Parse through the metadata to find what mocha test files will be needed.

  // The app will be loaded into the mocha suite via a `before()` hook, the cwd can be used
  // or an environment variable with the relative path can be set

  const mocha = new Mocha();

  const testDir = path.join(__dirname, "test-harness");

  // Add each .js file to the mocha instance
  const files = await fs.promises.readdir(testDir);
  // const files = await readdir(testDir);
  
  files
    .filter((file) => {
    // Only keep the .js files
    return file.substr(-3) === '.js';

    })
    .forEach(function (file) {
      mocha.addFile(
        path.join(testDir, file)
      );
    });

  mocha.run((failures) => {
    process.exitCode = failures ? 1 : 0;
  });


}
