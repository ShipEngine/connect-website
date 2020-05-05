import { FormDefinition, FormPOJO, InlineOrReference } from "@shipengine/integration-platform-sdk";
import { readDefinition, readDefinitionValue } from "../read-definition";
import { readLocalizationDefinition } from "./read-localization-definition";

/**
 * Reads a form definition
 */
export async function readFormDefinition(definition: InlineOrReference<FormDefinition>, cwd: string, fieldName: string): Promise<FormPOJO>;
export async function readFormDefinition(definition: InlineOrReference<FormDefinition> | undefined, cwd: string, fieldName: string): Promise<FormPOJO | undefined>;
export async function readFormDefinition(
definition: InlineOrReference<FormDefinition> | undefined, cwd: string, fieldName: string)
: Promise<FormPOJO | undefined> {

  [definition, cwd] = await readDefinition(definition, cwd, fieldName);

  if (definition) {
    return {
      ...definition,
      dataSchema: await readDefinitionValue(definition.dataSchema, cwd, `${fieldName}.dataSchema`),
      uiSchema: await readDefinitionValue(definition.uiSchema, cwd, `${fieldName}.uiSchema`),
      localization: await readLocalizationDefinition(definition.localization, cwd, `${fieldName}.localization`),
    };
  }
}
