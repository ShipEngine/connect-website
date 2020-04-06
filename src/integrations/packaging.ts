import validate from "@code-engine/validate";
import * as types from "@shipengine/ipaas-types";
import { ServiceArea } from "../enums/enums";
import { resolveAndPopulateObject } from "../utils/resolve-and-populate";
/**
 * Helper class for the IPaaS Packaging service.
 */
export class Packaging {
  public id!: string;
  public name!: string;
  public description!: string;
  public area?: string;
  public isConsolidator?: boolean;
  public requiresWeight?: boolean;

  public requiresDimensions?: boolean;


  /**
   * Import, dereference, validate, and add helper methods for the Packaging resource.
   */
  public static async import(packagingReference: types.Packaging | string, appDir: string): Promise<Packaging> {

    const importedPackaging = await resolveAndPopulateObject<types.Packaging>(packagingReference, appDir);

    const packaging = new Packaging();

    packaging.id = importedPackaging.id;
    packaging.name = importedPackaging.name;
    packaging.description = importedPackaging.description || "";

    packaging.area = importedPackaging.area;
    validateServiceArea(packaging.area);

    packaging.isConsolidator = importedPackaging.isConsolidator;
    packaging.requiresWeight = importedPackaging.requiresWeight;
    packaging.requiresDimensions = importedPackaging.requiresDimensions;

    return packaging;
  }

  /**
   * Ensure that the Packaging configuration is valid and well formed.
   */
  public static validate(packaging: types.Packaging) {
    validate.string(packaging.id);
    validate.string(packaging.name);
    validate.type.oneOf(packaging.description, [String, undefined]);
    validate.type.oneOf(packaging.area, [String, undefined]);
    validate.type.oneOf(packaging.isConsolidator, [Boolean, undefined]);
    validate.type.oneOf(packaging.requiresWeight, [Boolean, undefined]);
    validate.type.oneOf(packaging.requiresDimensions, [Boolean, undefined]);
  }

}

function validateServiceArea(serviceArea: string | undefined): void {
  const serviceAreas = Object.values(ServiceArea);
  if (serviceArea && !serviceAreas.includes(serviceArea as ServiceArea)) {
    throw new Error(`Service Area ${serviceArea} is invalid`);
  }
}
