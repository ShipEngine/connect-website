import { PickupCancellation, PickupCancellationConfirmationPOJO, Transaction } from "@shipengine/integration-platform-sdk";
import { sameDayPickup } from "../definitions/pickup-services";
import { idToCode } from "../id-code-map";
import { apiClient } from "../mock-api/client";
import { PickUpCancellationRequest, PickUpCancellationResponse } from "../mock-api/pick-up-cancellation";

/**
 * Cancels a previously-scheduled pickup
 */
export default async function cancelPickup(
  transaction: Transaction, cancellation: PickupCancellation): Promise<PickupCancellationConfirmationPOJO> {

  // STEP 1: Validation
  if (cancellation.pickupService.id === sameDayPickup.id) {
    throw new Error(`Same-day pickups cannot be canceled`);
  }

  // STEP 2: Create the data that the carrier's API expects
  let data: PickUpCancellationRequest = {
    operation: "pick_up_cancellation",
    session_id: transaction.session.id,
    pick_up_id: cancellation.confirmationID,
    service_code: idToCode(cancellation.pickupService.id),
    zone: Number.parseInt(cancellation.address.postalCode),
    reference: cancellation.reason,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<PickUpCancellationResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return {
    successful: response.data.canceled,
    cancellationID: response.data.id,
    notes: response.data.reason,
  };
}
