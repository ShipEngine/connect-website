import { loadApp } from "@shipengine/integration-platform-loader";

export class ValidationError extends Error {
  errors: string[];

  constructor(message: string, errors: string[]) {
    super(message);
    this.name = "ValidationError";
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

export async function validateAppWillLoad(pathToApp: string) {
  try {
    const app = await loadApp(pathToApp);
    return app;
  } catch (error) {
    const errors: string[] = error.message
      .split(/\r?\n/)
      .filter((errorLine: string) => {
        return isError(errorLine);
      });

    return Promise.reject(new ValidationError(error.message, errors));
  }
}
