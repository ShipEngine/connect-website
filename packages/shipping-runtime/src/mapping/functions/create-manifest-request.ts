import { CreateManifestRequest } from "@shipengine/connect-carrier-api/lib/requests";
import { NewManifestPOJO } from "@shipengine/connect-sdk/lib/internal";
import { mapAddress } from "./address";
import { mapShippedShipments } from ".";

export const mapCreateManifestRequest = (
  request: CreateManifestRequest
): NewManifestPOJO => {
  const openDateTime = request.open_datetime
    ? new Date(request.open_datetime)
    : new Date("2000-01-01T00:00:00Z");
  return {
    openDateTime,
    closeDateTime: request.close_datetime,
    shipments: mapShippedShipments(request.included_labels),
    shipFrom: mapAddress(request.ship_from),
  };
};
