import { PickupShipment } from "@ipaas/capi/models";
import { PickupShipmentPOJO } from "@shipengine/integration-platform-sdk";
import { capiToPickupPackagePOJO } from "./package";

export default (shipment: PickupShipment): PickupShipmentPOJO => {
  const mappedShipment: PickupShipmentPOJO = {
    trackingNumber: shipment.tracking_number || "",
    deliveryService: {
      id: shipment.service_code || "",
    },
    packages: shipment.packages?.map(capiToPickupPackagePOJO) || [],
  };
  return mappedShipment;
};
