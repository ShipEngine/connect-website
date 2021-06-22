import {
  DynamicImport,
  ErrorCode,
  InlineOrReference,
  InlineOrReferenceArray,
} from '@shipengine/connect-sdk';
import { error } from '@shipengine/connect-sdk/lib/internal';
import * as path from 'path';
import * as resolveFrom from 'resolve-from';
import { fileCache } from './file-cache';
import { readFile } from './read-file';

/**
 * Reads an ShipEngine Connect definition that is expected to be a single value.
 * The definition can be any of:
 *
 * - an inline value
 * - a YAML file path
 * - a JSON file path
 * - a JavaScript file path
 * - a dynamic import via `require()` or `import()`
 */
export async function readDefinitionValue<T>(
  definition: InlineOrReference<T>,
  cwd: string,
  fieldName: string,
): Promise<T> {
  const [value] = await readDefinition(definition, cwd, fieldName);
  return value;
}

export async function readDefinitions<T>(
  definition: InlineOrReferenceArray<T>,
  cwd: string,
  fieldName: string,
): Promise<[T[], string]>;
export async function readDefinitions<T>(
  definition: InlineOrReferenceArray<T> | undefined,
  cwd: string,
  fieldName: string,
): Promise<[T[] | undefined, string]>;

/**
 * Reads a ShipEngine Connect definition that is expected to be an array of values.
 * The definition can be any of:
 *
 * - an inline value
 * - a YAML file path
 * - a JSON file path
 * - a JavaScript file path
 * - a dynamic import via `require()` or `import()`
 *
 * @returns A tuple containing the definition value and the directory path of the definition file
 */
export function readDefinitions<T>(
  definition: InlineOrReferenceArray<T>,
  cwd: string,
  fieldName: string,
): Promise<[T[], string]> {
  return readDefinition(definition, cwd, fieldName) as Promise<[T[], string]>;
}

export async function readDefinition<T>(
  definition: InlineOrReference<T>,
  cwd: string,
  fieldName: string,
): Promise<[T, string]>;
export async function readDefinition<T>(
  definition: InlineOrReference<T> | undefined,
  cwd: string,
  fieldName: string,
): Promise<[T | undefined, string]>;

/**
 * Reads a ShipEngine Connect definition that is expected to be a single value.
 * The definition can be any of:
 *
 * - an inline value
 * - a YAML file path
 * - a JSON file path
 * - a JavaScript file path
 * - a dynamic import via `require()` or `import()`
 *
 * @returns A tuple containing the definition value and the directory path of the definition file
 */
export async function readDefinition<T>(
  definition: InlineOrReference<T>,
  cwd: string,
  fieldName: string,
): Promise<[T, string]> {
  try {
    if (typeof definition === 'string') {
      // The definition value is a file path, so return the file's contents
      const filePath = resolve(definition, cwd);
      const dir = path.dirname(filePath);
      let contents: T;

      // Get the file from the cache, if possible
      const cached = fileCache.get<T>(filePath);
      if (cached) {
        contents = await cached;
      } else {
        // The file isn't cached, so read it and cache it
        contents = await fileCache.add(filePath, readFile<T>(filePath));
      }

      return [contents, dir];
    } else if (isDynamicImport(definition)) {
      // The definition value is a dynamic import, so return the default export
      const exports = await definition;
      return [exports.default, cwd];
    } else {
      // The definition value was defined inline, so just return it as-is
      return [definition, cwd];
    }
  } catch (originalError: unknown) {
    throw error(
      ErrorCode.Invalid,
      `Invalid ${fieldName}: ${definition as string}.`,
      { originalError },
    );
  }
}

/**
 * Resolves a Node.js Module ID or file path
 */
function resolve(moduleId: string, cwd: string): string {
  if (!moduleId.startsWith('.') && !path.isAbsolute(moduleId)) {
    // Relative paths must start with a "./"
    moduleId = './' + moduleId;
  }

  return resolveFrom(cwd, moduleId);
}

/**
 * Determines whether the given value is a dynamically imported JavaScript module
 */
function isDynamicImport<T>(value: unknown): value is DynamicImport<T> {
  const dynamicImport = value as DynamicImport<T>;
  return !!(value && typeof dynamicImport.then === 'function');
}
