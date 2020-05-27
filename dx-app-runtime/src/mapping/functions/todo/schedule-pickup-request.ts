import { SchedulePickupRequest } from "../capi/schedule-pickup-request";
import { PickupRequestConfig } from "@shipengine/ipaas";
import {mapAddressToDx} from './address';
import mapSemiImplementedShipment from './shipped-shipment';
import mapContact from './pickup-contact';

export default (request: SchedulePickupRequest): PickupRequestConfig => {
  const mappedRequest: PickupRequestConfig = {
    pickupServiceID: request.pickup_details?.pickup_service_code || '',
    timeWindow: {
      startDateTime: request.requested_pickup_window?.start_time || '',
      endDateTime: request.requested_pickup_window?.end_time || '',
      timeZone: request.requested_pickup_window?.time_zone_iana || ''
    },
    address: mapAddressToDx(request.location?.pickup_address),
    notes: request.location?.location_notes || '',
    contact: mapContact(request.contact),
    shipments: request.pickup_details?.shipments?.map(mapSemiImplementedShipment) || []
  }

  return mappedRequest;
}
