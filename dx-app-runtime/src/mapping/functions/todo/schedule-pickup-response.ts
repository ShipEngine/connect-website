import { PickupConfirmationConfig, Identifier, ShipmentIdentifierConfig } from "@shipengine/ipaas";
import { SchedulePickupResponse } from "../capi/schedule-pickup-response";
import { Identifier as capiIdentifier } from '../capi/models/identifier';
import { ShipmentIdentifier } from "../capi/models/shipment-identifier";

const mapIdentifier = (identifier: Identifier): capiIdentifier => {
  return {
    type: identifier.description,
    value: identifier.id
  }
}

const mapShipmentIdentifiers = (shipmentIdentifier: ShipmentIdentifierConfig): ShipmentIdentifier => {
  return {
    tracking_number: shipmentIdentifier.trackingNumber,
    alternate_identifiers: shipmentIdentifier.identifiers?.map(mapIdentifier)
  }
}
export default (response: PickupConfirmationConfig): SchedulePickupResponse => {
  const mappedResponse: SchedulePickupResponse = {
    remarks: response.notes,
    confirmation: {
      confirmation_id: response.confirmationID,
      alternate_identifiers: response.identifiers?.map(mapIdentifier),
      shipment_identifiers: response.shipments?.map(mapShipmentIdentifiers),
    },
    pickup_windows: response.timeWindows.map(timeWindow => {
      return {
        time_zone_iana: timeWindow.timeZone,
        pickup_date: new Date(timeWindow.startDateTime).toISOString(),
        start_time: new Date(timeWindow.startDateTime).toISOString(),
        end_time: new Date(timeWindow.endDateTime).toISOString()
      }
    }),
    custom_properties: response.customData
  };
  return mappedResponse;
}
