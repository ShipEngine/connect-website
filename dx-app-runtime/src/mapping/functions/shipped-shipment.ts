import { PickupShipment } from '@ipaas/capi/models';
import { capiToPickupPackagePOJO } from './package';
import { PickupShipmentPOJO } from '@shipengine/integration-platform-sdk/lib/internal';

export const mapPickupShipment = (shipment: PickupShipment): PickupShipmentPOJO => {
  const mappedShipment: PickupShipmentPOJO = {
    trackingNumber: shipment.tracking_number || '',
    deliveryService: shipment.service_code || '',
    packages: shipment.packages?.map(capiToPickupPackagePOJO) || [],
  };
  return mappedShipment;
};
