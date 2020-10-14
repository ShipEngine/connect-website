import { SchedulePickupRequest } from '@ipaas/capi';
import { PickupRequestPOJO } from '@shipengine/connect-sdk/lib/internal';
import { mapAddress, mapPickupContact, mapTimeWindow, mapLocationNotes, mapPickupShipments } from './';

export const mapSchedulePickupRequest = (
  request: SchedulePickupRequest
): PickupRequestPOJO => {
  const mappedRequest: PickupRequestPOJO = {
    pickupService: request.pickup_details?.pickup_service_code || '',
    timeWindow: mapTimeWindow(request.requested_pickup_window),
    address: mapAddress(request.location?.pickup_address),
    notes: mapLocationNotes(request.location?.location_notes),
    contact: mapPickupContact(request.contact),
    shipments: mapPickupShipments(request.pickup_details?.shipments)
  };
  return mappedRequest;
};
