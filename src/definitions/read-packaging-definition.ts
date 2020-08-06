import { InlineOrReference, InlineOrReferenceArray, PackagingDefinition } from "@shipengine/integration-platform-sdk";
import { PackagingPOJO } from "@shipengine/integration-platform-sdk/lib/internal";
import { readDefinitions, readDefinitionValue } from "../read-definition";

/**
 * Reads a packaging definition
 */
export async function readPackagingDefinition(
  definition: InlineOrReference<PackagingDefinition>, cwd: string, fieldName: string): Promise<PackagingPOJO> {
  definition = await readDefinitionValue(definition, cwd, fieldName);

  return definition;
}

/**
 * Reads an array of packaging definitions
 */
export async function readPackingArrayDefinition(
  definitions: InlineOrReferenceArray<PackagingDefinition>, cwd: string, fieldName: string): Promise<PackagingPOJO[]> {

  let array: PackagingDefinition[] | undefined;
  [array, cwd] = await readDefinitions(definitions, cwd, fieldName);

  if (Array.isArray(array)) {
    definitions = await Promise.all(
      array.map((packaging, index) => readPackagingDefinition(packaging, cwd, `${fieldName}[${index}]`))
    );
  }

  return definitions as PackagingPOJO[];
}
