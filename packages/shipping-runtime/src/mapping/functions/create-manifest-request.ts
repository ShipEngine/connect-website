import { CreateManifestRequest } from "@shipengine/connect-carrier-api/lib/requests";
import { NewManifestPOJO } from "@shipengine/connect-sdk/lib/internal";
import { mapAddress } from "./address";
import { mapShippedShipments } from ".";

export const mapCreateManifestRequest = (
  request: CreateManifestRequest
): NewManifestPOJO => {
  return {
    openDateTime: request.open_datetime || "2000-01-01T01:00:00Z",
    closeDateTime: request.close_datetime,
    shipments: mapShippedShipments(request.included_labels),
    shipFrom: mapAddress(request.ship_from),
  };
};
