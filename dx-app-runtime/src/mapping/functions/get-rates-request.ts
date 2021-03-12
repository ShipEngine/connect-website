import { GetRatesRequest } from '@ipaas/capi/requests';
import {
  RateCriteriaPOJO,
  PackageRateCriteriaPOJO,
  LengthUnit,
  WeightUnit,
} from '@shipengine/integration-platform-sdk';
import { mapAddressToAddressWithContactInfoPOJO } from './address';
import { Package } from '@ipaas/capi/models';

const mapPackage = (
  pckg: Package,
  request: GetRatesRequest
): PackageRateCriteriaPOJO => {
  return {
    packaging: [
      {
        id: pckg.package_code || '',
      },
    ],
    deliveryConfirmations: [], // TODO: We don't have a way of passing in the id associated with a delivery confirmation
    dimensions: {
      length: pckg.dimension_details?.dimensions_in_inches?.length || 0,
      height: pckg.dimension_details?.dimensions_in_inches?.height || 0,
      width: pckg.dimension_details?.dimensions_in_inches?.width || 0,
      unit: LengthUnit.Inches,
    },
    weight: {
      value: pckg.weight_details?.weight_in_ounces || 0,
      unit: WeightUnit.Ounces,
    },
    insuredValue: {
      value: request.insured_value?.amount || '0.00',
      currency: request.insured_value?.currency || 'USD',
    },
    containsAlcohol: request.advanced_options?.contains_alcohol || false,
    isNonMachinable: request.advanced_options?.nonmachineable || false,
  };
};

export const mapGetRatesRequestToRateCriteriaPOJO = (
  request: GetRatesRequest
): RateCriteriaPOJO => {
  const rateCriteria: RateCriteriaPOJO = {
    deliveryService: {
      id: '', // TODO: This needs to get fixed, we shouldn't expect to send that id
    },
    deliveryDateTime: undefined,
    shipDateTime: request.ship_datetime,
    shipFrom: mapAddressToAddressWithContactInfoPOJO(request.ship_from),
    shipTo: mapAddressToAddressWithContactInfoPOJO(request.ship_to),
    packages: request.packages.map((pckg) => mapPackage(pckg, request)),
    returns: {
      isReturn: request.is_return_label || false,
    },
  };
  return rateCriteria;
};
