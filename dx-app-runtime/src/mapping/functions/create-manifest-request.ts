import { CreateManifestRequest } from "@ipaas/capi";
import { NewManifestPOJO, ShipmentIdentifierPOJO } from "@shipengine/integration-platform-sdk";
import { Label } from "@ipaas/capi/models/label";
import { mapAddressToAddressWithContactInfoPOJO } from "./address";

const mapShipments = (label: Label) : ShipmentIdentifierPOJO => {
  return {
    trackingNumber: label.tracking_number,
    identifiers: {
      carrierTransactionId: label.carrier_transaction_id
    }
  }
}


export const mapCreateManifestRequest = (request: CreateManifestRequest) : NewManifestPOJO => {
  return {
    openDateTime: request.open_datetime || '',
    closeDateTime: request.close_datetime || '',
    shipments: request.included_labels.map(mapShipments),
    shipFrom: mapAddressToAddressWithContactInfoPOJO(request.ship_from)
  }
}
