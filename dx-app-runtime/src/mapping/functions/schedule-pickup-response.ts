import {
  PickupConfirmationPOJO,
  ShipmentIdentifierPOJO,
  NotePOJO,
  TransactionPOJO,
} from "@shipengine/integration-platform-sdk";
import { SchedulePickupResponse } from "@ipaas/capi/responses";
import {
  ShipmentIdentifier,
  Identifier as capiIdentifier,
  PickupWindow,
} from "@ipaas/capi/models";

const mapIdentifier = (
  key: string,
  value: string | undefined
): capiIdentifier => {
  return {
    type: key,
    value: value,
  };
};

const mapNotesToString = (
  notes: string | readonly (string | NotePOJO)[]
): string => {
  let combinedNotes = "";
  if (Array.isArray(notes)) {
    if (!notes.length) {
      if (typeof notes[0] === "string") {
        const strings = notes as string[];
        combinedNotes = strings.join(" ");
      } else {
        const notePojo = notes as NotePOJO[];
        notePojo.forEach((note) => {
          combinedNotes += `${note.type}: ${note.text} `;
        });
      }
    }
  } else {
    return notes as string;
  }
  return combinedNotes;
};

const mapShipmentIdentifiers = (
  shipmentIdentifier: ShipmentIdentifierPOJO
): ShipmentIdentifier => {
  const mappedIdentifier: ShipmentIdentifier = {
    tracking_number: shipmentIdentifier.trackingNumber,
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
export const mapPickupConfirmationPOJOToSchedulePickupResponse = (
  response: PickupConfirmationPOJO,
  transaction: TransactionPOJO
): SchedulePickupResponse => {
  const mappedResponse: SchedulePickupResponse = {
    remarks: response.notes ? mapNotesToString(response.notes) : undefined,
    confirmation: {
      confirmation_id: response.id,
      shipment_identifiers: response.shipments?.map(mapShipmentIdentifiers),
    },
    pickup_windows: response.timeWindows.map((timeWindow) => {
      const window: PickupWindow = {
        time_zone_iana: "",
        pickup_date: timeWindow.startDateTime.toString(),
        start_time: timeWindow.startDateTime.toString(),
        end_time: timeWindow.endDateTime.toString(),
      };
      return window;
    }),
    metadata: {
      ...transaction.session,
    },
  };
  return mappedResponse;
};
