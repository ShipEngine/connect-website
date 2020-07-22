import { SchedulePickupRequest } from '@ipaas/capi/requests';
import { PickupRequestPOJO } from '@shipengine/integration-platform-sdk';
import { mapAddressToAddressWithContactInfoPOJO } from './address';
import mapSemiImplementedShipment from './shipped-shipment';
import mapContact from './pickup-contact';

export const mapSchedulePickupRequestToPickupRequestPOJO = (
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
    notes: request.location?.location_notes || '',
    contact: mapContact(request.contact),
    shipments:
      request.pickup_details?.shipments?.map(mapSemiImplementedShipment) || [],
  };
  return mappedRequest;
};
