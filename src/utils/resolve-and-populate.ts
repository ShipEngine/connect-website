import * as types from "@shipengine/ipaas-types";
import { isFilePath, loadJsonOrYaml } from "./files";

/**
 * This function takes an unknown property, it could be an array, or a file path. It will then resolve and load
 * the array and properly crawl and dereference each item in the array for the desired type.
 */
export async function resolveAndPopulateArray<T>(property: types.InlineOrReferenceArray<T>, appDir: string): Promise<T[]> {

  if (typeof property === "string" && isFilePath(property)) {

    let array = await loadJsonOrYaml<T>(property, appDir);

    // TODO: Error handling
    if (Array.isArray(array)) {
      let resolvedArray = [];
      for (let item of array) {
        const resolvedItem = await resolveAndPopulateObject<T>(item, appDir);
        resolvedArray.push(resolvedItem);
      }

      return resolvedArray;
    }
    else {
      throw new Error(`Did not resolve to expected array: ${property}`);
    }
  }
  else {
    return property as T[];
  }

}

/**
 * This function takes an unknown property, it could be an object, or a file path. It will then resolve and load
 * the object and return it as the desired type.
 */
export async function resolveAndPopulateObject<T>(property: types.InlineOrReference<T>, appDir: string): Promise<T> {

  if (typeof property === "string" && isFilePath(property)) {
    let object = await loadJsonOrYaml<T>(property, appDir);

    if (typeof object === "object") {
      return object as T;
    }
  }

  return property as T;
}
