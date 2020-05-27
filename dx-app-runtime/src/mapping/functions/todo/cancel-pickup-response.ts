import { PickupCancellationConfirmationConfig } from "@shipengine/ipaas";
import { CancelPickupResponse } from "../capi/cancel-pickup-response";

export default (response: PickupCancellationConfirmationConfig): CancelPickupResponse => {
  return {
    confirmation_id: response.cancellationID,
    successful: response.successful,
    status: response.notes,
    custom_properties: response.customData
  }
}
