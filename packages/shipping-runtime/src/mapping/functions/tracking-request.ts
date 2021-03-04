import { TrackingRequest } from "@shipengine/connect-carrier-api/lib/requests";
import {
  IdentifiersPOJO,
  TrackingCriteriaPOJO,
} from "@shipengine/connect-sdk/lib/internal";

export const mapTrackingRequest = (
  request: TrackingRequest
): TrackingCriteriaPOJO => {
  const identifiers: IdentifiersPOJO = {};

  if (request.identifiers) {
    request.identifiers.forEach((identifier) => {
      if (identifier?.type && identifier?.value) {
        identifiers[identifier.type] = identifier.value;
      }
    });
  }

  let trackingNumber = request.tracking_number;
  if (!trackingNumber) {
    trackingNumber = identifiers["tracking_number"];
  }

  return {
    identifiers,
    metadata: request.metadata ?? undefined,
    returns: { isReturn: request.is_return ?? false },
    trackingNumber: trackingNumber ?? "",
  };
};
