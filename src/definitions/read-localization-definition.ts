import { InlineOrReference, LocalizationDefinition, LocalizationPOJO } from "@shipengine/integration-platform-sdk";
import { readDefinition } from "../read-definition";

type LocaleCallback<T, U> = (localizedValues: T, cwd: string, fieldName: string) => Promise<U>;

/**
 * Reads a localization definition
 */
export async function readLocalizationDefinition<T extends object, U extends T = T>(
definition: InlineOrReference<LocalizationDefinition<T>> | undefined, cwd: string, fieldName: string,
localeCallback?: LocaleCallback<T, U>): Promise<LocalizationPOJO<U> | undefined> {

  [definition, cwd] = await readDefinition(definition, cwd, fieldName);

  if (definition) {
    // Loop through each of the localization locales
    for (let locale of Object.keys(definition)) {
      // Read the definition for this locale
      let [localizedValues, localeCWD] = await readDefinition(definition[locale], cwd, `${fieldName}.${locale}`);

      if (localeCallback) {
        // The definition requries further processing to read sub-definitions
        definition[locale] = await localeCallback(localizedValues, localeCWD, `${fieldName}.${locale}`);
      }
      else {
        // The definition is only 1 level deep
        definition[locale] = localizedValues;
      }
    }

    return definition as LocalizationPOJO<U>;
  }
}
