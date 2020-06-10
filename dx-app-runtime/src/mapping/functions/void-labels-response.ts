import { ShipmentCancellationOutcomePOJO, TransactionPOJO } from "@shipengine/integration-platform-sdk"
import { VoidLabelsResponse, VoidResponse } from "@ipaas/capi/responses"

export const mapShipmentCancellationOutcomeToVoidLabelsResponse = (response: ShipmentCancellationOutcomePOJO[], transaction: TransactionPOJO) : VoidLabelsResponse => {
  const voidResponses : VoidResponse[] = [];
  response.forEach(response => {
    voidResponses.push({
      void_request_id: response.cancellationID,
      message: response.notes ? response.notes.toString() : '',
      // code: response.code TODO: Add code?
      // confirmation_number: response.confirmationNumber TODO: Add Confirmation Number?
      // description: response.description, TODO: Add Description?
      // metadata: response.metadata, TODO: Add metadata?
      // status: response.status, TODO: Add Status?
    });
  })
  return {
    void_responses: voidResponses,
    metadata: {
      ...transaction.session
    }
  }
}
