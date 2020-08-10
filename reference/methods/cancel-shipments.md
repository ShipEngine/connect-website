---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: cancelShipments Method
name: cancelShipments

description:
  This method cancels shipments, which may include voiding labels, refunding charges, invalidating tracking numbers, updating manifests, or anything else that needs to happen when a shipment is canceled.

documentation: |
  This method cancels shipments, which may include voiding labels, refunding charges, invalidating tracking numbers, updating manifests, or anything else that needs to happen when a shipment is canceled.

  Most carrier applications should implement this method, unless you don't allow shipments to be canceled or voided after creation.

param:
  name: shipments
  type: ShipmentCancellation
  signature: ShipmentCancellation[]
  description: |
    An array of objects that indicate which shipments to cancel. This array will always contain at least one object.

    Each object has the `trackingNumber` and `identifiers` of the shipment being canceled. It also has a `cancellationID` property, which is the ID of the cancellation request. You'll use this `cancellationID` to return the outcome of each cancellation, such as whether it was successful, failed, or could not be completed.

  fields:
    - name: cancellationID
      type: "[UUID](https://www.npmjs.com/package/uuid)"
      description: The unique ID of this cancellation. This ID is used to correlate cancellations with outcomes.

    - name: trackingNumber
      type: string
      description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
        This string will be between `0` and `100` characters and wo;; not contain newline characters.

    - name: identifiers
      type: object
      description: Your own identifiers for this shipment cancellation.

    - name: metadata
      type: object
      description: Custom data about this shipment that was persisted by the ShipEngine Integration Platform when this shipment was created. Must be JSON serializable.



return:
  name: shipmentCancellationOutcomes
  type: ShipmentCancellationOutcomePOJO
  signature: void | ShipmentCancellationOutcomePOJO[]
  description:
    An array of objects that indicate the outcome of cancelling the shipments. This array will always contain at least one object. You may also choose not to return a value from this method.
  fields:
    - name: cancellationID
      type: "[UUID](https://www.npmjs.com/package/uuid)"
      required: true
      description: The unique ID of this cancellation. This ID is used to correlate the outcome to the cancellation request.

    - name: status
      type: string
      required: true
      description: |

        The status of the cancellation. Valid values include the following:
        * `success` - Cancellation was successful.
        * `error` - Cancellation encountered an error.
        * `timeout` - Cancellation call timed out, probably related to a network error.
        * `skipped` - Cancellation was skipped.
        * `throttled` - Cancellation could not be made because requests are being throttled.

    - name: confirmationNumber
      type: string
      required: false
      description: The confirmation number of the cancellation. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: code
      type: string
      required: false
      description: The carrier's code for this cancellation outcome. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: description
      type: string
      required: false
      description: The carrier's description of the cancellation outcome. This description should not be specific to this particular shipment.
        This string must be between `0` and `1000` characters and must not contain newline characters.

    - name: notes
      type: object[]
      required: false
      description: An array of objects containing additional information about this shipment.

    - name: notes[].type
      type: |
        [NotesType](./../common-types.md#notes-types)
      description: |
        The type for this note.

    - name: notes[].text
      type: string
      description: |
        The note text itself. This string must be between `0` and `5000` characters.

    - name: metadata
      type: object
      required: false
      description: Custom data about this shipment that was persisted by the ShipEngine Integration Platform. Must be JSON serializable.
---


Examples
-------------------------------------------------
The following example shows a sample implementation of the `cancelShipments` method.  It makes API calls to void the labels for each canceled shipment and returns success or failure information for each one.

```javascript
module.exports = async function cancelShipments(transaction, shipmentCancellations) {
  // STEP 1: Validation

  // STEP 2: Create the data that the carrier's API expects

  let data = {
    operation: "void_labels",
    session_id: transaction.session.id,
    cancellations: shipmentCancellations.map((cancellation) => {
      const { cancellationID, trackingNumber } = cancellation;
      return {
        cancellationID: cancellationID,
        internalReferenceID: cancellation.identifiers.internalReferenceID,
        trackingNumber: trackingNumber,
      };
    }),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return await formatCancellationResponse(response.data);
}
```

```typescript
import {
  Transaction,
  ShipmentCancellation,
  ShipmentCancellationOutcomePOJO
} from "@shipengine/integration-platform-sdk";

export default async function cancelShipments(
  transaction: Transaction, shipmentCancellations: ShipmentCancellation[]): Promise<void | ShipmentCancellationOutcomePOJO> {
  // STEP 1: Validation

  // STEP 2: Create the data that the carrier's API expects

  let data = {
    operation: "void_labels",
    session_id: transaction.session.id,
    cancellations: shipmentCancellations.map((cancellation) => {
      const { cancellationID, trackingNumber } = cancellation;
      return {
        cancellationID: cancellationID,
        internalReferenceID: cancellation.identifiers.internalReferenceID,
        trackingNumber: trackingNumber,
      };
    }),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return await formatCancellationResponse(response.data);
}
```
