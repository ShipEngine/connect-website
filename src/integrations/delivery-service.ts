import validate from "@code-engine/validate";
import * as types from "@shipengine/ipaas-types";
import { Country } from "../enums/countries";
import { resolveAndPopulateArray, resolveAndPopulateObject } from "../utils/resolve-and-populate";
import { Carrier } from "./carrier";
import { DeliveryConfirmation } from "./delivery-confirmation";
import { Packaging } from "./packaging";
import { isFilePath } from "../utils/files";

/**
 * An IPaaS delivery service.
 */
export class DeliveryService {

  public id!: string;

  public name!: string;
  public description!: string;

  public class!: types.DeliveryServiceClass;
  public grade!: types.DeliveryServiceGrade;

  public originCountries: types.Country[] = [];
  public destinationCountries: types.Country[] = [];

  public carrier!: Carrier;

  public packaging: Packaging[] = [];
  public deliveryConfirmations?: DeliveryConfirmation[];

  public labelFormats?: types.LabelFormat[];
  public labelSizes?: types.LabelSize[];

  public isReturnService?: boolean;
  public allowsMultiplePackages?: boolean;

  public hasTracking?: boolean;

  public requiresManifest?: false | types.ManifestType;

  /**
   * Import and dereference a delivery service object.
   */
  public static async import(deliveryService: types.InlineOrReference<types.DeliveryService> | string, appDir: string)
    : Promise<DeliveryService> {

    const importedDS = await resolveAndPopulateObject<types.DeliveryService>(deliveryService, appDir);
    DeliveryService.validate(importedDS);

    const ds = new DeliveryService();
    ds.id = importedDS.id;
    ds.name = importedDS.name;
    ds.description = importedDS.description || "";
    ds.class = importedDS.class;
    ds.grade = importedDS.grade;

    ds.originCountries = await resolveAndPopulateArray<types.Country>(importedDS.originCountries, appDir);
    validateCountries(ds.originCountries, "Origin");

    ds.destinationCountries = await resolveAndPopulateArray<types.Country>(importedDS.destinationCountries, appDir);
    validateCountries(ds.originCountries, "Destination");

    ds.carrier = await Carrier.import(importedDS.carrier, appDir);

    // ds.packaging = await resolveAndPopulateArray<types.Packaging>(importedDS.packaging);

    return ds;
  }

  /**
   * Check that delivery service is formatted correctly;
   */
  public static validate(ds: types.DeliveryService) {

    validate.string(ds.id);
    validate.string(ds.name);
    validate.type.oneOf(ds.description, [String, undefined]);
    validate.string(ds.class);
    validate.string(ds.grade);

    validate.type.oneOf(ds.originCountries, [Array, String]);
    validate.type.oneOf(ds.destinationCountries, [Array, String]);
    validate.type.oneOf(ds.packaging, [Array, String]);
    validate.type.oneOf(ds.deliveryConfirmations, [Array, String, undefined]);
    validate.type.oneOf(ds.labelFormats, [String, undefined]);
    validate.type.oneOf(ds.labelSizes, [String, undefined]);
    validate.type.oneOf(ds.isReturnService, [Boolean, undefined]);
    validate.type.oneOf(ds.allowsMultiplePackages, [Boolean, undefined]);
    validate.type.oneOf(ds.hasTracking, [Boolean, undefined]);
    validate.type.oneOf(ds.requiresManifest, [Boolean, String, undefined])
  }
}

function validateCountries(countries: types.Country[], type: "Destination" | "Origin"): void {

  for (let country of countries) {
    if (!isValidCountry(country)) {
      throw new Error(`Invalid ${type} Country: ${country}`);
    }
  }
}

/**
 * Ensure that the country codes are ISO 3166 compliant
 */
function isValidCountry(countryCode: string): countryCode is types.Country {

  const countries = Object.values(Country);

  return countries.includes(countryCode as Country);
}
