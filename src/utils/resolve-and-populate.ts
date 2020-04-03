import * as types from "@shipengine/ipaas-types";
import * as path from "path";
import { isFilePath, loadJsonOrYaml } from "./files";

export async function resolveAndPopulateArray<T>(property: types.InlineOrReferenceArray<T>, appDir: string): Promise<T[]> {

  if (typeof property === "string" && isFilePath(property)) {

    let array = await loadJsonOrYaml<T>(property, appDir);

    // TODO: Error handling
    // array = await import(path.join(appDir, property));

    if (Array.isArray(array)) {
      return array;
    }
    else {
      throw new Error(`Did not resolve to expected array: ${property}`);
    }
  }
  else {
    return property as T[];
  }

}

export async function resolveAndPopulateObject<T>(property: types.InlineOrReference<T>, appDir: string): Promise<T> {

  if (typeof property === "string") {
    let object = await import(path.join(appDir, property));

    if (typeof object === "object") {
      return object as T;
    }
  }

  return property as T;
}