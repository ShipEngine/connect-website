import { GetRatesRequest } from '@ipaas/capi/requests';
import {
  LengthUnit,
  WeightUnit,
} from '@shipengine/connect-sdk';
import {
  RateCriteriaPOJO,
  PackageRateCriteriaPOJO
} from '@shipengine/connect-sdk/lib/internal';
import { mapAddressToAddressWithContactInfoPOJO } from './address';
import { Package } from '@ipaas/capi/models';
import { mapDeliveryConfirmationToDx } from './delivery-confirmation';

const mapPackage = (
  pckg: Package,
  request: GetRatesRequest
): PackageRateCriteriaPOJO => {
  return {
    packaging: pckg.package_code || '',
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
      value: !Number.isNaN(request.insured_value?.amount) ? Number(request.insured_value?.amount) : 0,
      currency: request.insured_value?.currency || 'USD',
    },
    containsAlcohol: request.advanced_options?.contains_alcohol || false,
    isNonMachinable: request.advanced_options?.nonmachineable || false,
  };
};

export const mapGetRatesRequest = (
  request: GetRatesRequest
): RateCriteriaPOJO => {
  const rateCriteria: RateCriteriaPOJO = {
    deliveryService: request.service_code || '',
    deliveryConfirmation: mapDeliveryConfirmationToDx(request.confirmation),
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
