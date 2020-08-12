import { SchedulePickupRequest } from '@ipaas/capi/requests';
import { PickupRequestPOJO } from '@shipengine/integration-platform-sdk/lib/internal';
import { mapAddressToAddressWithContactInfoPOJO } from './address';
import { mapPickupShipment } from './shipped-shipment';
import mapContact from './pickup-contact';
import { NoteType } from '@shipengine/integration-platform-sdk';

export const mapSchedulePickupRequest = (
  request: SchedulePickupRequest
): PickupRequestPOJO => {
  const mappedRequest: PickupRequestPOJO = {
    pickupService: {
      id: request.pickup_details?.pickup_service_code || '',
    },
    timeWindow: {
      startDateTime: request.requested_pickup_window?.start_time || '',
      endDateTime: request.requested_pickup_window?.end_time || '',
    },
    address: mapAddressToAddressWithContactInfoPOJO(
      request.location?.pickup_address
    ),
    notes: [{
      text: request.location?.location_notes || '',
      type: NoteType.Internal
    }],
    contact: mapContact(request.contact),
    shipments:
      request.pickup_details?.shipments?.map(mapPickupShipment) || [],
  };
  return mappedRequest;
};
