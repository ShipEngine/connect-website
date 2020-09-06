import { loadApp } from "@shipengine/connect-loader";
import { ValidationErrorItem } from "joi";
import { SdkApp } from "./types";

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
): Promise<SdkApp> {
  try {
    const app = (await loadApp(pathToApp)) as SdkApp;
    return app;
  } catch (error) {
    const err = error as Error & { details?: ValidationErrorItem[] };
    let errors = [];

    if (err.details) {
      const errorItems = err.details;
      errors = errorItems.map((item) => {
        return item.message;
      });
    } else {
      errors.push(err.message);
    }

    return Promise.reject(new InvalidAppError(err.message, errors));
  }
}

export function isInvalidAppError(obj: unknown): obj is InvalidAppError {

  if(typeof obj === "object" && obj !== null) {
    const code = Reflect.get(obj, "code") as string | undefined;
    if(code === "INVALID_APP") {
      return true;
    }
  }
  return false

}
