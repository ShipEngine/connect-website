import { InlineOrReference, LocalizationDefinition, LocalizationPOJO } from "@shipengine/integration-platform-sdk";
import { readDefinition, readDefinitionValue } from "../read-definition";

/**
 * Reads a localization definition
 */
export async function readLocalizationDefinition<T extends object>(
definition: InlineOrReference<LocalizationDefinition<T>> | undefined, cwd: string, fieldName: string)
: Promise<LocalizationPOJO<T> | undefined> {

  [definition, cwd] = await readDefinition(definition, cwd, fieldName);

  if (definition) {
    for (let [locale, localizedValues] of Object.entries(definition)) {
      definition[locale] = await readDefinitionValue(localizedValues, cwd, `${fieldName}.${locale}`);
    }

    return definition as LocalizationPOJO<T>;
  }
}
