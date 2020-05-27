import { CancelPickupRequest } from "../capi/cancel-pickup-request";
import { PickupCancellationConfig, Identifier, PickupCancellationReason, TimeRangeConfig } from "@shipengine/ipaas";
import { Identifier as capiIdentifier } from "../capi/models/identifier";
import { CancellationReason } from "../capi/models/cancellation-details";
import {mapAddressToDx} from './address';
import mapContact from './pickup-contact';
import { PickupWindow } from "../capi/models/pickup-window";
import mapSemiImplementedShipment from './shipped-shipment';

const mapIdentifier = (identifier: capiIdentifier): Identifier => {
  return {
    id: identifier.value || '',
    description: identifier.type || ''
  }
}

const mapCancellationReason = (reason: CancellationReason | null | undefined): PickupCancellationReason => {
  switch(reason){
    case CancellationReason.CarrierFailedPickup:
      return PickupCancellationReason.CarrierFailedPickup;
    case CancellationReason.CostTooHigh:
      return PickupCancellationReason.Price;
    case CancellationReason.NotReady:
      return PickupCancellationReason.NotReady;
    case CancellationReason.ServiceTooSlow:
      return PickupCancellationReason.Schedule;
    default:
      return PickupCancellationReason.Other;
  }
}

const mapPickupWindow = (pickupWindow: PickupWindow | null | undefined): TimeRangeConfig => {
  const startTime = pickupWindow?.start_time || '';
  const endTime = pickupWindow?.end_time || '';
  return {
    timeZone: pickupWindow?.time_zone_iana || '',
    startDateTime: new Date(startTime),
    endDateTime: new Date(endTime)
  }
}

export default (request: CancelPickupRequest): PickupCancellationConfig => {
  return {
    confirmationID: request.confirmation?.confirmation_id || '',
    pickupServiceID: request.pickup_details?.pickup_service_code || '',
    identifiers: request.confirmation?.alternate_identifiers?.map(mapIdentifier),
    reason: mapCancellationReason(request.cancellation_details?.reason),
    notes: request.cancellation_details?.remarks || undefined,
    address: mapAddressToDx(request.location?.pickup_address),
    contact: mapContact(request.contact),
    timeWindows: request.pickup_windows?.map(mapPickupWindow) || [],
    shipments: request.pickup_details?.shipments?.map(mapSemiImplementedShipment) || [],
    customData: request.custom_properties || undefined
  }
}
