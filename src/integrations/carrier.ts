import validate from "@code-engine/validate";
import * as types from "@shipengine/ipaas-types";
import * as path from "path";
import { readLogo } from "../utils/files";
import { resolveAndPopulateObject } from "../utils/resolve-and-populate";

/**
 * Helper class for the IPaaS Carrier resource.
 */
export class Carrier {
  public id!: string;
  public name!: string;
  public description!: string;
  public websiteURL!: string;

  public logo!: {
    colorSVG: Buffer;
    blackAndWhiteSVG: Buffer;
  };

  /**
   * Import, dereference, validate, and add helper methods for the Carrier resource.
   */
  public static async import(carrierReference: types.InlineOrReference<types.Carrier> | string, appDir: string)
    : Promise<Carrier> {

    const importedCarrier = await resolveAndPopulateObject<types.Carrier>(carrierReference, appDir);

    try {
      Carrier.validate(importedCarrier);
    }
    catch (e) {
      let error = e as Error;
      throw new Error(`Error in Carrier validation for Delivery Service: ${error.message}`);
    }
    /**
     * If the  carrier property is a string that means that it is in a new cwd so all imports
     * within this class will need to account for it.
     */

    let cwd = appDir;
    if (typeof carrierReference === "string") {
      cwd = path.parse(path.join(appDir, carrierReference)).dir;
    }

    const carrier = new Carrier();
    carrier.id = importedCarrier.id;
    carrier.name = importedCarrier.name;
    carrier.description = importedCarrier.description || "";
    carrier.websiteURL = importedCarrier.websiteURL;

    carrier.logo = {
      colorSVG: await readLogo(importedCarrier.logo.colorSVG, cwd),
      blackAndWhiteSVG: await readLogo(importedCarrier.logo.blackAndWhiteSVG, cwd),
    };

    return carrier;
  }

  /**
   * Validate the imported Carrier to make sure it is well formed.
   */
  public static validate(carrier: types.Carrier) {
    validate.string(carrier.id);
    validate.string(carrier.name);
    validate.type.oneOf(carrier.description, [String, undefined]);
    validate.string(carrier.websiteURL);
  }
}
