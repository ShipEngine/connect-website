import {
  ShipmentIdentifier as ShipmentIdentifierPOJO,
  PickupConfirmation,
  TimeRange
} from '@shipengine/connect-sdk/lib/internal';
import {
  Transaction
} from '@shipengine/connect-sdk'

import { SchedulePickupResponse } from '@ipaas/capi/responses';
import {
  ShipmentIdentifier,
  Identifier as capiIdentifier,
  PickupWindow,
} from '@ipaas/capi/models';

const mapIdentifier = (
  key: string,
  value: string | undefined
): capiIdentifier => {
  return {
    type: key,
    value: value,
  };
};

const mapShipmentIdentifiers = (
  shipmentIdentifier: ShipmentIdentifierPOJO
): ShipmentIdentifier => {
  const mappedIdentifier: ShipmentIdentifier = {
    tracking_number: shipmentIdentifier.trackingNumber || '',
    alternate_identifiers: [],
  };
  if (shipmentIdentifier.identifiers) {
    const keys = Object.keys(shipmentIdentifier.identifiers);
    keys.forEach((key) => {
      const value = shipmentIdentifier.identifiers
        ? shipmentIdentifier.identifiers[key]
        : undefined;
      const identifier = mapIdentifier(key, value);
      if (mappedIdentifier.alternate_identifiers) {
        mappedIdentifier.alternate_identifiers.push(identifier);
      }
    });
  }
  return mappedIdentifier;
};
export const mapTimeWindows = (range: TimeRange): PickupWindow => {
  return {
    time_zone_iana: range.startDateTime?.timeZone || '',
    pickup_date: range.startDateTime?.toString() || '',
    start_time: range.startDateTime?.toString() || '',
    end_time: range.endDateTime?.toString() || '',
  }
};

export const mapSchedulePickupResponse = (
  response: PickupConfirmation,
  transaction: Transaction
): SchedulePickupResponse => {
  const mappedResponse: SchedulePickupResponse = {
    remarks: response.notes ? response.notes.map(note => note.text).join(', ') : undefined,
    confirmation: {
      confirmation_id: response.id,
      shipment_identifiers: response.shipments?.map(mapShipmentIdentifiers),
    },
    pickup_windows: response.timeWindows.map(mapTimeWindows),
    metadata: {
      ...transaction.session,
    },
  };
  return mappedResponse;
};
