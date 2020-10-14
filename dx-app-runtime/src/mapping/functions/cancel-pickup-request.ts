import { CancelPickupRequest } from '@ipaas/capi/requests';
import {
  PickupCancellationReason,
  NoteType,
} from '@shipengine/connect-sdk';
import {
  PickupCancellationPOJO
} from '@shipengine/connect-sdk/lib/internal';
import {
  CancellationReason,
  Identifier as capiIdentifier,
} from '@ipaas/capi/models';
import { mapAddress, mapPickupContact, mapPickupShipment, mapTimeWindow } from '.';

export const identifierReducer = (result: any, identifier: capiIdentifier): any => {
  if (identifier.value && identifier.type) {
    result[identifier.type] = identifier.value;
  }
  return result;
};

export const mapCancellationReason = (
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

export const mapCancelPickupRequest = (
  request: CancelPickupRequest
): PickupCancellationPOJO => {
  return {
    cancellationID: request.transaction_id,
    id: request.confirmation?.confirmation_id || '',
    pickupService: request.pickup_details?.pickup_service_code || '',
    identifiers:
      request.confirmation?.alternate_identifiers?.reduce(identifierReducer, {}) ||
      undefined,
    reason: mapCancellationReason(request.cancellation_details?.reason),
    notes: [{
      type: NoteType.Internal,
      text: request.cancellation_details?.remarks || '',
    }],
    address: mapAddress(request.location?.pickup_address),
    contact: mapPickupContact(request.contact),
    timeWindows: request.pickup_windows?.map(mapTimeWindow) || [],
    shipments: request.pickup_details?.shipments?.map(mapPickupShipment) || [],
    metadata: request.custom_properties || {},
  };
};
