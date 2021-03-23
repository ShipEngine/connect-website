import {
  ShippedShipment,
  PickupShipment,
} from "@shipengine/connect-carrier-api/lib/models";
import {
  ShippedShipmentPOJO,
  PickupShipmentPOJO,
} from "@shipengine/connect-sdk/lib/internal";
import {
  mapShippedPackage,
  mapPickupPackage,
  mapAddressWithContactAndPickup,
} from ".";

export const mapShippedShipment = (
  shipment: ShippedShipment
): ShippedShipmentPOJO => {
  const mappedShipment: ShippedShipmentPOJO = {
    trackingNumber: shipment.tracking_number || undefined,
    identifiers: {
      carrierTransactionId: shipment.carrier_transaction_id,
    },
    deliveryService: shipment.service_code || "",
    packages: shipment.packages?.map(mapShippedPackage) || [],
    shipTo: mapAddressWithContactAndPickup(shipment.ship_to),
  };
  return mappedShipment;
};

export const mapShippedShipments = (
  shipments: ShippedShipment[] | null | undefined
): ShippedShipmentPOJO[] => {
  if (!shipments) {
    return [];
  }
  return shipments.map(mapShippedShipment);
};

export const mapPickupShipment = (
  shipment: PickupShipment
): PickupShipmentPOJO => {
  const mappedShipment: PickupShipmentPOJO = {
    trackingNumber: shipment.tracking_number || undefined,
    identifiers: {
      carrierTransactionId: shipment.carrier_transaction_id,
    },
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
