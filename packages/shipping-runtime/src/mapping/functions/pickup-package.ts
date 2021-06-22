import { ShippedPackage } from '@shipengine/connect-carrier-api/lib/models';

import {
  ShippedPackagePOJO,
  PickupPackagePOJO,
} from '@shipengine/connect-sdk/lib/internal';
import { mapWeightGrams, mapDimensionsCM } from '.';

export const mapShippedPackage = (
  shippedPackage: ShippedPackage,
): ShippedPackagePOJO => {
  const pojo: ShippedPackagePOJO = {
    trackingNumber: shippedPackage.tracking_number || undefined,
    packaging: shippedPackage.package_code || '',
    weight: mapWeightGrams(shippedPackage.weight_details?.weight_in_grams),
    dimensions: mapDimensionsCM(
      shippedPackage.dimension_details?.dimensions_in_centimeters,
    ),
    identifiers: undefined,
  };

  return pojo;
};

export const mapPickupPackage = (
  shippedPackage: ShippedPackage,
): PickupPackagePOJO => {
  const pojo: PickupPackagePOJO = {
    trackingNumber: shippedPackage.tracking_number || undefined,
    packaging: shippedPackage.package_code || '',
    weight: mapWeightGrams(shippedPackage.weight),
    dimensions: mapDimensionsCM(shippedPackage.dimensions),
    identifiers: undefined,
  };

  return pojo;
};
