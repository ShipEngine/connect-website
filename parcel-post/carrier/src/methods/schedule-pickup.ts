import { Currency, PickupConfirmationPOJO, PickupRequest, ShippingChargeType, Transaction } from "@shipengine/integration-platform-sdk";
import { nextDayPickup } from "../definitions/pickup-services";
import { idToCode } from "../id-code-map";
import { apiClient } from "../mock-api/client";
import { ONE_DAY, ONE_HOUR, PickUpRequest, PickUpResponse } from "../mock-api/pick-up";

/**
 * Schedules a pick-up at a specific time and location
 */
export default async function schedulePickup(
  transaction: Transaction, pickup: PickupRequest): Promise<PickupConfirmationPOJO> {

  // STEP 1: Validation
  if (pickup.pickupService.id === nextDayPickup.id
  && pickup.timeWindow.startDateTime.getTime() < (Date.now() + ONE_DAY)) {
    throw new Error(`${nextDayPickup.name} must be scheduled 24 hours in advance`);
  }

  // STEP 2: Create the data that the carrier's API expects
  let data: PickUpRequest = {
    operation: "pick_up",
    session_id: transaction.session.id,
    service_code: idToCode(pickup.pickupService.id),
    date_time: pickup.timeWindow.startDateTime.toISOString(),
    zone: Number.parseInt(pickup.address.postalCode),
    contact_phone: pickup.contact.phoneNumber,
    total_weight: pickup.shipments.reduce(
      (w, ship) => w + ship.packages.reduce((w, pkg) => w + pkg.weight.ounces, 0), 0),
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
    confirmationID: response.id,
    timeWindows: [
      {
        startDateTime: pickupDateTime,
        endDateTime: new Date(pickupDateTime.getTime() + (ONE_HOUR * 4)),
      }
    ],
    charges: [
      {
        name: "Pickup Fee",
        code: "PU2",
        type: ShippingChargeType.Pickup,
        amount: {
          value: response.pickup_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
      {
        name: "Transport Tax",
        code: "TX7",
        type: ShippingChargeType.Tax,
        amount: {
          value: response.tax_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
      {
        name: "Location Fee",
        code: "L4",
        type: ShippingChargeType.LocationFee,
        amount: {
          value: response.location_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
    ]
  };
}
