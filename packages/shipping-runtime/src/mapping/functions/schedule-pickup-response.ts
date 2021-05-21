import {
  ShipmentIdentifier as ShipmentIdentifierPOJO,
  PickupConfirmation,
  TimeRange,
} from "@shipengine/connect-sdk/lib/internal";
import { MonetaryValue, Note, Transaction } from "@shipengine/connect-sdk";

import { SchedulePickupResponse } from "@shipengine/connect-carrier-api/lib/responses";
import {
  ShipmentIdentifier,
  Identifier as capiIdentifier,
  PickupWindow,
  Currency,
} from "@shipengine/connect-carrier-api/lib/models";

export const mapIdentifier = (
  key: string,
  value: string | undefined
): capiIdentifier => {
  return {
    type: key,
    value: value || "",
  };
};

export const mapShipmentIdentifiers = (
  shipmentIdentifier: ShipmentIdentifierPOJO
): ShipmentIdentifier => {
  const ret: any = {
    tracking_number: shipmentIdentifier.trackingNumber || "",
    alternate_identifiers: [],
  };
  const keys = Object.keys(shipmentIdentifier.identifiers);
  keys.forEach((key) => {
    const value = shipmentIdentifier.identifiers[key];
    const identifier = mapIdentifier(key, value);
    ret.alternate_identifiers.push(identifier);
  });
  return ret;
};

export const mapPickupWindow = (range: TimeRange): PickupWindow | undefined => {
  if (!range.startDateTime && !range.endDateTime) {
    return undefined;
  }
  return {
    time_zone_iana: range.startDateTime?.timeZone || "",
    pickup_date: range.startDateTime?.toISOString() || "",
    start_time: range.startDateTime?.toISOString(),
    end_time: range.endDateTime?.toISOString(),
  };
};

export const mapNotes = (note?: readonly Note[]): string | undefined => {
  if (!note || note.length === 0) {
    return undefined;
  }
  return note.map((note) => note.text).join(", ");
};

export const mapMonetaryValue = (
  monetaryValue?: MonetaryValue
): Currency | undefined => {
  if (!monetaryValue) {
    return undefined;
  }
  return {
    amount: `${monetaryValue.value || 0}`,
    currency: monetaryValue.currency,
  };
};

export const mapSchedulePickupResponse = (
  response: PickupConfirmation,
  transaction: Transaction
): SchedulePickupResponse => {
  const mappedResponse: SchedulePickupResponse = {
    remarks: mapNotes(response.notes) || "",
    charges_total: mapMonetaryValue(response.totalAmount),
    confirmation: {
      confirmation_id: response.id,
      shipment_identifiers: response.shipments?.map(mapShipmentIdentifiers),
    },
    pickup_windows: response.timeWindows
      .map(mapPickupWindow)
      .filter((p) => p) as PickupWindow[],
    metadata: {
      ...transaction.session,
    },
  };
  return mappedResponse;
};
