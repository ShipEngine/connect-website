import { PickupShipment } from '@ipaas/capi/models';
import { mapPickupPackage } from './pickup-package';
import { PickupShipmentPOJO } from '@shipengine/connect-sdk/lib/internal';

export const mapPickupShipment = (shipment: PickupShipment): PickupShipmentPOJO => {
  const mappedShipment: PickupShipmentPOJO = {
    trackingNumber: shipment.tracking_number || '',
    deliveryService: shipment.service_code || '',
    packages: shipment.packages?.map(mapPickupPackage) || [],
  };
  return mappedShipment;
};
