import validate from "@code-engine/validate";
import * as types from "@shipengine/ipaas-types";
import { readLogo } from "../utils/files";
import { resolveAndPopulateObject } from "../utils/resolve-and-populate";

export class Carrier {
  public id!: string;
  public name!: string;
  public description!: string;
  public websiteURL!: string;

  public logo!: {
    colorSVG: Buffer;
    blackAndWhiteSVG: Buffer;
  };

  public static async import(carrier: types.Carrier | string, appDir: string): Promise<Carrier> {

    const importedCarrier = await resolveAndPopulateObject<types.Carrier>(carrier, appDir);

    const deliveryCarrier = new Carrier();
    deliveryCarrier.id = importedCarrier.id;
    deliveryCarrier.name = deliveryCarrier.name;
    deliveryCarrier.description = importedCarrier.description || "";
    deliveryCarrier.websiteURL = importedCarrier.websiteURL;

    deliveryCarrier.logo = {
      colorSVG: await readLogo(importedCarrier.logo.colorSVG, appDir),
      blackAndWhiteSVG: await readLogo(importedCarrier.logo.blackAndWhiteSVG, appDir),
    };

    return deliveryCarrier;

  }

  public static validate(carrier: types.Carrier) {
    validate.string(carrier.id);
    validate.string(carrier.name);
    validate.type.oneOf(carrier.description, [String, undefined]);
    validate.string(carrier.websiteURL);
  }
}