import { loadApp } from "@shipengine/integration-platform-loader";
import { ValidationErrorItem } from "joi";
import { App } from "./utils/types";

class InvalidAppError extends Error {
  errors: string[];
  code: string;

  constructor(message: string, errors: string[]) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = InvalidAppError.name; // stack traces display correctly now
    this.errors = errors;
    this.code = "INVALID_APP";
  }
}

export default async function loadAndValidateApp(
  pathToApp: string,
): Promise<App> {
  try {
    const app = (await loadApp(pathToApp)) as App;
    return app;
  } catch (error) {
    let errors = [];

    if (error.details) {
      const errorItems = error.details as ValidationErrorItem[];
      errors = errorItems.map((item) => {
        return item.message;
      });
    } else {
      errors.push(error.message);
    }

    return Promise.reject(new InvalidAppError(error.message, errors));
  }
}
