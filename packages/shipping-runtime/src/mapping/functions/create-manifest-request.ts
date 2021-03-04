import { CreateManifestRequest } from "@shipengine/connect-carrier-api/lib/requests";
import { ShipmentIdentifierPOJO } from "@shipengine/connect-sdk";
import { NewManifestPOJO } from "@shipengine/connect-sdk/lib/internal";
import { Label } from "@shipengine/connect-carrier-api/lib/models";
import { mapAddress } from "./address";

export const mapManifestShipments = (label: Label): ShipmentIdentifierPOJO => {
  return {
    trackingNumber: label.tracking_number,
    identifiers: {
      carrierTransactionId: label.carrier_transaction_id,
    },
  };
};

export const mapCreateManifestRequest = (
  request: CreateManifestRequest
): NewManifestPOJO => {
  return {
    openDateTime: request.open_datetime || "2000-01-01T01:00:00Z",
    closeDateTime: request.close_datetime,
    shipments: request.included_labels?.map(mapManifestShipments) || [],
    shipFrom: mapAddress(request.ship_from),
  };
};
