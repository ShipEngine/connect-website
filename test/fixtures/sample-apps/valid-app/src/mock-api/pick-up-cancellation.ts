import { HttpRequest } from "./client";

export const ONE_HOUR = 1000 * 60 * 60;
export const ONE_DAY = ONE_HOUR * 24;

export interface PickUpCancellationRequest {
  operation: "pick_up_cancellation";
  session_id: string;
  pick_up_id: string;
  service_code: string;
  zone: number;
  reference: string;
}

export interface PickUpCancellationResponse {
  id: string;
  canceled: boolean;
  reason?: string;
}

/**
 * This is a mock implementation of a carrier's API that cancels a previously-scheduled pickup
 */
export function pickUpCancellation(request: HttpRequest & PickUpCancellationRequest): PickUpCancellationResponse {
  let pickupID = request.pick_up_id;
  let serviceCode = request.service_code;

  // Randomly decide whether the cancellation is successful or not
  if (Date.now() % 2 === 0) {
    // Successful cancellation
    return {
      id: pickupID,
      canceled: true,
    };
  }
  else {
    // Failed cancellation
    return {
      id: pickupID,
      canceled: false,
      reason: `${serviceCode} must be cancelled by phone. Please call 1-800-555-5555`,
    };
  }

}
