import { GetRatesRequest } from '@shipengine/connect-carrier-api/lib/requests';
import {
  RateCriteriaPOJO,
  PackageRateCriteriaPOJO,
} from '@shipengine/connect-sdk/lib/internal';
import { Currency, Package } from '@shipengine/connect-carrier-api/lib/models';
import {
  mapCurrency,
  mapWeightGrams,
  mapDimensionsCM,
  mapConfirmation,
  mapAddressWithContact,
  mapAddressWithContactAndPickup,
} from './';
import { mapShippingOptions } from './shipping-options';

export const mapRatePackage = (
  pckg: Package,
  request: GetRatesRequest,
): PackageRateCriteriaPOJO => {
  const insuredValue: Currency = request.packages
    .map((p) => p.insured_value)
    .reduce(
      (prev: Currency, curr: Currency) => {
        return {
          currency: curr.currency,
          amount: String(Number(prev.amount || '') + Number(curr.amount || '')),
        };
      },
      { amount: '', currency: '' },
    );
  return {
    packaging: pckg.package_code || '',
    dimensions: mapDimensionsCM(
      pckg.dimension_details?.dimensions_in_centimeters,
    ),
    weight: mapWeightGrams(pckg.weight_details?.weight_in_grams),
    insuredValue: mapCurrency(insuredValue),
    containsAlcohol: request.advanced_options?.contains_alcohol || false,
    isNonMachinable: request.advanced_options?.nonmachineable || false,
  };
};

export const mapGetRatesRequest = (
  request: GetRatesRequest,
): RateCriteriaPOJO => {
  const rateCriteria: RateCriteriaPOJO = {
    deliveryService: request.service_code || undefined,
    deliveryConfirmation: mapConfirmation(request.confirmation),
    deliveryDateTime: undefined,
    shipDateTime: request.ship_datetime,
    shipFrom: mapAddressWithContact(request.ship_from),
    shipTo: mapAddressWithContact(request.ship_to),
    pickupLocation: mapAddressWithContactAndPickup(request.pickup_location),
    packages: request.packages.map((pckg) => mapRatePackage(pckg, request)),
    returns: {
      isReturn: request.is_return_label || false,
    },
    shippingOptions: mapShippingOptions(request.advanced_options),
  };
  return rateCriteria;
};
