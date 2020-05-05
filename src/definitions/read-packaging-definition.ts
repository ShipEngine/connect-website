import { InlineOrReference, InlineOrReferenceArray, PackagingDefinition, PackagingPOJO } from "@shipengine/integration-platform-sdk";
import { readDefinition, readDefinitionValue } from "../read-definition";
import { readLocalizationDefinition } from "./read-localization-definition";

/**
 * Reads a packaging definition
 */
export async function readPackagingDefinition(
definition: InlineOrReference<PackagingDefinition>, cwd: string, fieldName: string): Promise<PackagingPOJO> {
  definition = await readDefinitionValue(definition, cwd, fieldName);

  return {
    ...definition,
    localization: await readLocalizationDefinition(definition.localization, cwd, `${fieldName}.localization`),
  };
}

/**
 * Reads an array of packaging definitions
 */
export async function readPackingArrayDefinition(
definitions: InlineOrReferenceArray<PackagingDefinition>, cwd: string, fieldName: string): Promise<PackagingPOJO[]> {
  [definitions, cwd] = await readDefinition(definitions, cwd, fieldName);

  if (Array.isArray(definitions)) {
    definitions = await Promise.all(
      definitions.map((packaging, index) => readPackagingDefinition(packaging, cwd, `${fieldName}[${index}]`))
    );
  }

  return definitions as PackagingPOJO[];
}
