import { Options, Settings } from "./settings";

import { Config } from "@shipengine/ipaas-types";

import { createTemplate } from "@shipengine/ipaas";

/**
 * CLI for using public ShipEngine services
 *
 * @returns - Options
 */
export async function shipengine(options?: Options): Promise<void> {
  let settings = new Settings(options);

  if (settings.ipaas) {
    if (settings.ipaas.new) {
      await createTemplate();
    }
  }
}
