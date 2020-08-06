import { FormDefinition, InlineOrReference } from "@shipengine/integration-platform-sdk";
import { FormPOJO } from "@shipengine/integration-platform-sdk/lib/internal";
import { readDefinition, readDefinitionValue } from "../read-definition";

export async function readFormDefinition(definition: InlineOrReference<FormDefinition>, cwd: string, fieldName: string): Promise<FormPOJO>;
export async function readFormDefinition(definition: InlineOrReference<FormDefinition> | undefined, cwd: string, fieldName: string): Promise<FormPOJO | undefined>;

/**
 * Reads a form definition
 */
export async function readFormDefinition(
  definition: InlineOrReference<FormDefinition> | undefined, cwd: string, fieldName: string): Promise<FormPOJO | undefined> {

  [definition, cwd] = await readDefinition(definition, cwd, fieldName);

  if (definition) {
    return {
      ...definition,
      dataSchema: await readDefinitionValue(definition.dataSchema, cwd, `${fieldName}.dataSchema`),
      uiSchema: await readDefinitionValue(definition.uiSchema, cwd, `${fieldName}.uiSchema`)
    };
  }
}
