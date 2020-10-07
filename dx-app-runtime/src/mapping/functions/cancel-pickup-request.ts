import { CancelPickupRequest } from '@ipaas/capi/requests';
import {
  PickupCancellationReason,
  TimeRangePOJO,
  NoteType,
} from '@shipengine/connect-sdk';
import {
  PickupCancellationPOJO
} from '@shipengine/connect-sdk/lib/internal';
import {
  CancellationReason,
  PickupWindow,
  Identifier as capiIdentifier,
} from '@ipaas/capi/models';
import { mapAddress } from './address';
import mapContact from './pickup-contact';
import { mapPickupShipment } from './shipped-shipment';

const mapIdentifier = (result: any, identifier: capiIdentifier): any => {
  if (identifier.value && identifier.type) {
    result[identifier.value] = identifier.type;
  }
  return result;
};

const mapCancellationReason = (
  reason: CancellationReason | null | undefined
): PickupCancellationReason => {
  switch (reason) {
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
};

const mapPickupWindow = (
  pickupWindow: PickupWindow | null | undefined
): TimeRangePOJO => {
  const startTime = pickupWindow?.start_time || '';
  const endTime = pickupWindow?.end_time || '';
  return {
    startDateTime: {
      value: startTime || '',
      timeZone: pickupWindow?.time_zone_iana || '',
    },
    endDateTime: {
      value: endTime,
      timeZone: pickupWindow?.time_zone_iana || '',
    },
  };
};

export const mapCancelPickupRequest = (
  request: CancelPickupRequest
): PickupCancellationPOJO => {
  return {
    cancellationID: request.transaction_id || '',
    id: request.confirmation?.confirmation_id || '',
    pickupService: {
      id: request.pickup_details?.pickup_service_code || '',
    },
    identifiers:
      request.confirmation?.alternate_identifiers?.reduce(mapIdentifier, {}) ||
      undefined,
    reason: mapCancellationReason(request.cancellation_details?.reason || CancellationReason.Other),
    notes: [{
      type: NoteType.Internal,
      text: request.cancellation_details?.remarks || '',
    }],
    address: mapAddress(
      request.location?.pickup_address
    ),
    contact: mapContact(request.contact),
    timeWindows: request.pickup_windows?.map(mapPickupWindow) || [],
    shipments:
      request.pickup_details?.shipments?.map(mapPickupShipment) || [],
    metadata: request.custom_properties || {},
  };
};
