import { PickupShipment } from "@shipengine/connect-carrier-api/lib/models";
import { PickupShipmentPOJO } from "@shipengine/connect-sdk/lib/internal";
import { mapPickupPackage } from ".";

export const mapPickupShipment = (
  shipment: PickupShipment
): PickupShipmentPOJO => {
  const mappedShipment: PickupShipmentPOJO = {
    trackingNumber: shipment.tracking_number || undefined,
    deliveryService: shipment.service_code || "",
    packages: shipment.packages?.map(mapPickupPackage) || [],
  };
  return mappedShipment;
};

export const mapPickupShipments = (
  shipments: PickupShipment[] | null | undefined
): PickupShipmentPOJO[] => {
  if (!shipments) {
    return [];
  }
  return shipments.map(mapPickupShipment);
};
