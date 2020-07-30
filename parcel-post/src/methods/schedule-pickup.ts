import { ChargeType, Currency, PickupConfirmationPOJO, PickupRequest, Transaction } from "@shipengine/integration-platform-sdk";
import { nextDayPickup } from "../definitions/pickup-services";
import { apiClient } from "../mock-api/client";
import { ONE_DAY, ONE_HOUR, PickUpRequest, PickUpResponse } from "../mock-api/pick-up";
import { Session } from "./session";

/**
 * Schedules a pick-up at a specific time and location
 */
export default async function schedulePickup(
  transaction: Transaction<Session>, pickup: PickupRequest): Promise<PickupConfirmationPOJO> {

  // STEP 1: Validation
  if (pickup.pickupService.id === nextDayPickup.id
  && pickup.timeWindow.startDateTime.getTime() < (Date.now() + ONE_DAY)) {
    throw new Error(`${nextDayPickup.name} must be scheduled 24 hours in advance`);
  }

  // STEP 2: Create the data that the carrier's API expects
  let data: PickUpRequest = {
    operation: "pick_up",
    session_id: transaction.session.id,
    service_code: pickup.pickupService.identifiers.apiCode,
    date_time: pickup.timeWindow.startDateTime.toISOString(),
    contact_phone: pickup.contact.phoneNumber,
    total_weight: pickup.shipments.reduce((w, ship) => w + ship.package.weight.ounces, 0),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<PickUpResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatConfirmation(response.data);
}

/**
 * Formats a pickup confirmation in the way ShipEngine expects
 */
function formatConfirmation(response: PickUpResponse): PickupConfirmationPOJO {
  let pickupDateTime = new Date(response.date_time);

  return {
    id: response.id,
    timeWindows: [
      {
        startDateTime: pickupDateTime,
        endDateTime: new Date(pickupDateTime.getTime() + (ONE_HOUR * 4)),
      }
    ],
    charges: [
      {
        name: "Pickup Fee",
        type: ChargeType.Pickup,
        amount: {
          value: response.pickup_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
      {
        name: "Transport Tax",
        type: ChargeType.Tax,
        amount: {
          value: response.tax_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
      {
        name: "Location Fee",
        type: ChargeType.LocationFee,
        amount: {
          value: response.location_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
    ]
  };
}
