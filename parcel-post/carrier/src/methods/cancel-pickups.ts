import { CancellationStatus, NoteType, PickupCancellation, PickupCancellationOutcomePOJO, Transaction } from "@shipengine/integration-platform-sdk";
import { sameDayPickup } from "../definitions/pickup-services";
import { apiClient } from "../mock-api/client";
import { PickUpCancellationRequest, PickUpCancellationResponse } from "../mock-api/pick-up-cancellation";
import { Session } from "./session";

/**
 * Cancels one or more previously-scheduled pickups
 */
export default async function cancelPickups(
  transaction: Transaction<Session>, pickups: PickupCancellation[]): Promise<PickupCancellationOutcomePOJO[]> {

  let data : PickUpCancellationRequest = {
    operation: "pick_up_cancellation",
    scheduld_pick_ups: pickups.map((pickup) => {
      // STEP 1: Validation
      if (pickup.pickupService.id === sameDayPickup.id) {
        throw new Error(`Same-day pickups cannot be canceled`);
      }

      // STEP 2: Create the data that the carrier's API expects
      return {
        session_id: transaction.session.id,
        pick_up_id: pickup.id,
        service_code: pickup.pickupService.identifiers.apiCode,
        zone: Number.parseInt(pickup.address.postalCode),
        reference: pickup.reason,
      };
    })
  };

  // STEP 3: Call the carrier's API
  let response = await apiClient.request<PickUpCancellationResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return response.data.canceled_pick_ups.map((cancellation, index) => {
    if (cancellation.error) {
      return {
        cancellationID: pickups[index].cancellationID,
        confirmationNumber: cancellation.id,
        status: CancellationStatus.Error,
        notes: [
          {
            type: NoteType.Error,
            text: cancellation.reason,
          }
        ],
      };
    }
    else {
      return {
        cancellationID: pickups[index].cancellationID,
        confirmationNumber: cancellation.id,
        status: CancellationStatus.Success,
        notes: `Pickup ${pickups[index].id} was canceled successfully`,
      };
    }
  });
}
