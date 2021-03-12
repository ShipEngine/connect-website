import {
  ShippedPackage
} from '@ipaas/capi/models';

import {
  PickupPackagePOJO,
} from '@shipengine/connect-sdk/lib/internal';
import { mapWeightGrams, mapDimensionsCM } from '.';


export const mapPickupPackage = (
  shippedPackage: ShippedPackage
): PickupPackagePOJO => {
  const pickupPackage: PickupPackagePOJO = {
    trackingNumber: shippedPackage.tracking_number || undefined,
    packaging: shippedPackage.package_code || '',
    weight: mapWeightGrams(shippedPackage.weight),
    dimensions: mapDimensionsCM(shippedPackage.dimensions),
    identifiers: undefined,
  };

  return pickupPackage;
};
