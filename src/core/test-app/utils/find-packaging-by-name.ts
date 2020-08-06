import {
  CarrierApp
} from "@shipengine/integration-platform-sdk/lib/internal";

import { Packaging } from "@shipengine/integration-platform-sdk";

/**
 * Finds a Packaging type by its name or raises if one is not found.
 * @param {string} name - The name of the Packaging type.
 * @param {CarrierApp} app - The app that containing the Packaging type.
 */
export default function findPackagingByName(
  name: string,
  app: CarrierApp,
): Packaging {
  const packaging = app.packaging.find(
    (packaging) => packaging.name === name,
  );
  if (!packaging)
    throw new Error(
      `shipengine.config.js packagingName: '${name}' does not exist`,
    );

  return packaging;
}
