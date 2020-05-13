import { loadApp, App } from "@shipengine/integration-platform-loader";

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

export async function validateTestSuite(app: App) {
  
}
