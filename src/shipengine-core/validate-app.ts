import { loadApp } from "@shipengine/integration-platform-loader";
import Mocha from "mocha";
import * as path from "path";
import readdir from "recursive-readdir";
import { isCarrierApp } from './utils/is-functions';
import { App } from './utils/types';

export const testSuites = ["create-shipment", "rate-shipment", "schedule-pickup"];

function addMochaFile(mocha: Mocha, file: string) {
  if (!mocha.files.includes(file)) {
    mocha.addFile(file);
  }
}

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
    const app = await loadApp(pathToApp) as App;
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

export async function validateTestSuite(app: App, argv: string[]): Promise<void> {

  if (argv[0]) {
    process.env["TEST-SUITE"] = argv[0];
  }

  if (argv[1]) {
    process.env["TEST-NUMBER"] = argv[1];
  }

  // Find all defined methods.
  const carrierAppMethods = ["createShipment", "cancelShipments", "rateShipment", "track", "createManifest", "schedulePickup", "cancelPickup"];
  const appMethods: string[] = [];

  if (isCarrierApp(app)) {
    for (let carrierMethod of carrierAppMethods) {
      if (Reflect.get(app, carrierMethod)) {
        appMethods.push(carrierMethod);
      }
    }
  }

  // Map method names to the corresponding test suites
  const testSuiteMap: Record<string, string> = {
    "createShipment": "create-shipment",
    "cancelShipments": "cancel-shipments",
    "rateShipment": "rate-shipment",
    "track": "track",
    "createManifest": "create-manifest",
    "schedulePickup": "schedule-pickup",
    "cancelPickup": "cancel-pickup",
    "connect": "connect"
  }

  const mocha = new Mocha({
    delay: true,
    timeout: 20000
  });
  const testDir = path.join(__dirname, "test-harness");

  // Add each .js file to the mocha instance
  const files = await readdir(testDir);

  // Files to always include in the test-harness suites
  const ignoreFiles = ["mocha-hooks"];

  files
    .filter((file) => {
      // Only keep the .js files
      return file.substr(-3) === '.js';
    })
    .forEach((file) => {

      if (argv[0]) {
        if (file.includes(argv[0]) || ignoreFiles.some(ignoreFile => file.includes(ignoreFile))) {
          addMochaFile(mocha, file);
        }
      }
      else {
        // Only add method test suites that are defined in the Integration App that is being tested.
        for (let appMethod of appMethods) {
          if (file.includes(testSuiteMap[appMethod]) || ignoreFiles.some(ignoreFile => file.includes(ignoreFile))) {
            // Checke to make sure 
            addMochaFile(mocha, file);
          }
        }
      }
    });

  mocha.run((failures) => {
    process.exitCode = failures ? 1 : 0;
  });
}

