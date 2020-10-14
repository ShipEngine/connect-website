import { GetRatesRequest } from '@ipaas/capi/requests';
import {
  RateCriteriaPOJO,
  PackageRateCriteriaPOJO
} from '@shipengine/connect-sdk/lib/internal';
import { Package } from '@ipaas/capi/models';
import {
  mapCurrency,
  mapWeightGrams,
  mapDimensionsCM,
  mapConfirmation,
  mapAddress
} from './'

export const mapRatePackage = (
  pckg: Package,
  request: GetRatesRequest
): PackageRateCriteriaPOJO => {
  return {
    packaging: pckg.package_code || '',
    dimensions: mapDimensionsCM(pckg.dimension_details?.dimensions_in_centimeters),
    weight: mapWeightGrams(pckg.weight_details?.weight_in_grams),
    insuredValue: mapCurrency(request.insured_value),
    containsAlcohol: request.advanced_options?.contains_alcohol || false,
    isNonMachinable: request.advanced_options?.nonmachineable || false,
  };
};

export const mapGetRatesRequest = (
  request: GetRatesRequest
): RateCriteriaPOJO => {
  const rateCriteria: RateCriteriaPOJO = {
    deliveryService: request.service_code || undefined,
    deliveryConfirmation: mapConfirmation(request.confirmation),
    deliveryDateTime: undefined,
    shipDateTime: request.ship_datetime,
    shipFrom: mapAddress(request.ship_from),
    shipTo: mapAddress(request.ship_to),
    packages: request.packages.map((pckg) => mapRatePackage(pckg, request)),
    returns: {
      isReturn: request.is_return_label || false,
    },
  };
  return rateCriteria;
};
