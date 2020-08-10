---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: cancelPickups Method
name: cancelPickups

description:
  This method cancels a one or more previously scheduled pickups.

documentation: |
  This method cancels one or more previously scheduled pickups. If your carrier allows previously scheduled pickups to be cancelled,
  you will need to implement this method.

param:
  name: pickups
  type: PickupCancellationOutcome[]
  signature: PickupCancellationOutcome[]
  description: |
    An _array_ of objects representing a request for a carrier to cancel one or more previously scheduled pickups.

  fields:
  - name: cancellationID
    type: "[UUID](https://www.npmjs.com/package/uuid)"
    description: The unique ID of this cancellation. This ID is used to correlate cancellations with outcomes.

  - name: id
    type: string
    description: |
      The unique ID of the pickup to be cancelled. This string will be between `1` and `100` characters and will not contain newline characters.

  - name: identifiers
    type: object
    description: Your own identifiers for this pickup service.

  - name: pickupService
    type: object
    description: The [pickup service](./../pickup-service.md) to use for this pickup request.

  - name: pickupService.id
    type: "[UUID](https://www.npmjs.com/package/uuid)"
    description: A UUID that uniquely identifies the pickup service. This ID should never change.
      This is the UUID you used in the [Pickup Service Definition](./../pickup-service.md) file for this pickup service.

  - name: pickupService.identifiers
    type: object
    description: Your own identifiers for this pickup service.

  - name: pickupService.code
    type: string
    required: false
    description: Optional code used to map to what the carrier uses to identify the pickup service.

  - name: pickupService.name
    type: string
    description: The user-friendly service name (e.g. "One-Time Pickup", "Recurring Pickup", "Drop-Off").
       This string will be between `1` and `100` characters and will not contain newline characters.

  - name: pickupService.description
    type: string
    description: A short, user-friendly description of the service. This string will be between `0` and `1000` characters and will not contain newline characters.

  - name: pickupService.hasSandbox
    type: boolean
    description: Indicates whether the carrier provides a [sandbox](./../../sandbox.md) API for this pickup service. A sandbox should mimic real functionality as much as possible but MUST NOT incur any actual costs or affect production data.

  - name: reason
    type: string
    description: |
      The reason for the cancellation. Valid values include the following:
      * `not_ready` - The package was not ready for pickup.
      * `price` - The customer cancelled the pickup because of the price.
      * `schedule` - The pickup was cancelled because it could not be picked up within the needed time sframe.
      * `carrier_failed_pickup` - The carrier failed to pick up the package.
      * `other` - The cancellation is for a reason not covered by any of the other categories.

  - name: notes
    type: object[]
    description: An array of objects containing additional information about this cancellation.

  - name: notes[].type
    type: |
      [NotesType](./../common-types.md#notes-types)
    description: |
      The type for this note.

  - name: notes[].text
    type: string
    description: The note text itself. This string must be between `0` and `5000` characters.

  - name: address
    type: "[Address](./../address.md)"
    description: The address where the package(s) should be picked up.

  - name: contact
    type: |
      [ContactInfo](./../contact-info.md)
    description: An object representing contact information about the person there to meet the driver.

  - name: timeWindows
    type: object[]
    description: A list of dates and times when the carrier intended to pickup. This array will contain at least one value.

  - name: timeWindows[].startDateTime
    type: "[DateTime](./../date-time.md)"
    description: The start date/time of the request window.

  - name: timeWindows[].endDateTime
    type: "[DateTime](./../date-time.md)"
    description: The end date/time of the request window.

  - name: timeWindows[].toString()
    type: method
    description: A method that returns the time range as a string.

  - name: shipments
    type: object[]
    description: A list of shipments that were scheduled to be picked up. This array will contain at least one shipment.

  - name: shipments.trackingNumber
    type: string
    required: false
    description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
                         This string must be between `0` and `100` characters and must not contain newline characters.

  - name: shipments.identifiers
    type: object
    required: false
    description: Your own identifiers for this shipment.

  - name: shipments[].deliveryService
    type: |
      [DeliveryService](./../delivery-service.md)
    description: The delivery service assigned to the original pickup request. This array will contain at least one
      value.

  - name: shipments[].metadata
    type: object
    description: The carrier's custom data about this shipment that was previously persisted by the ShipEngine Platform.

  - name: shipments[].packages
    type: object[]
    description: The list of packages in this shipment. This array will contain at least one value.

  - name: shipments.packages[].trackingNumber
    type: string
    description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
      This string must be between `0` and `100` characters and must not contain newline characters.

  - name: shipments[].packages[].identifiers
    type: object
    description: Your own identifiers for this package.

  - name: shipments[].packages[].packaging
    type: object
    description: The packaging used for this package.

  - name: shipments[].packages[].packaging.id
    type: "[UUID](https://www.npmjs.com/package/uuid)"
    description: A UUID that uniquely identifies this packaging. This is the UUID you used int he [Packaging Definition](./../packaging.md)
      file for this packaging.

  - name: shipments[].packages[].packaging.identifiers
    type: object
    description: Your own identifiers for this packaging.

  - name: shipments[].packages[].packaging[].code
    type: string
    required: false
    description: Optional code used to map to what the carrier uses to identify the packaging.

  - name: shipments[].packages[].dimensions
    type: object
    description: The dimensions for the package.

  - name: shipments[].packages[].dimensions.length
    type: number
    description: The length of the package. This value may contain decimals.

  - name: shipments[].packages[].dimensions.width
    type: number
    description: The width of the package. This value may contain decimals.

  - name: shipments[].packages[].dimensions.height
    type: number
    description: The height of this package. This value may contain decimals.

  - name: shipments[].packages[].dimensions.unit
    type: string
    description: |
      The unit of measurement for the dimensions. Valid values include the following:
      * `in` for inches
      * `cm` for centimeters

  - name: shipments[].packages[].weight
    type: object
    description: The weight of the package. This value must not contain decimals.

  - name: shipments[].packages[].weight.value
    type: number
    description: The weight value for this package. This value must not contain decimals.

  - name: shipments[].packages[].weight.unit
    type: string
    description: |
      The unit of measure for this weight. Valid values include the following:
      * `g` for grams
      * `oz` for ounces
      * `kg` for kilograms
      * `lb` for pounds

  - name: shipments[].packages[].metadata
    type: object
    description: The carrier's custom data about this package that was previously persisted by the ShipEngine Integration Platform. Must be JSON serializable.

  - name: shipments[].package
    type: object
    description: The first package in the `packages` array. This is useful for carriers that only support single-piece shipments.
      This object has all the same properties as the objects in the `packages` array described above.

return:
  name: pickupCancellation
  type: pickupCancellationOutcome
  signature: pickupCancellation[]
  description: |
    An object that contains information about a pickup cancellation request.
  fields:
    - name: cancellationId
      type: "[UUID](https://www.npmjs.com/package/uuid)"
      required: true
      description: An identifier that indicates which pickup cancellation this outcome is for.

    - name: status
      type: string
      required: true
      description: |
        The status of the cancellation request. Valid values include the following:
        * `success` - Cancellation was successful.
        * `error` - Cancellation encountered an error.
        * `timeout` - Cancellation call timed out, probably related to a network error.
        * `skipped` - Cancellation was skipped.
        * `throttled` - Cancellation could not be made because requests are being throttled.

    - name: confirmationNumber
      type: string
      required: false
      description: The confirmation number for this cancellation request.
        This string must be between `0` and `100` characters and must not contain newline characters.

    - name: code
      type: string
      required: false
      description: The carrier's code for this cancellation outcome. This string must be between `0` and `100` charactersand must not contain newline characters.

    - name: description
      type: string
      required: false
      description: The carrier's description of the cancellation outcome. This description should not be specific to this particular pickup.
        This string must be between `0` and `5000` characters and must not contain newline characters.

    - name: notes
      type: object[]
      description: An array of objects containing additional information about this cancellation.

    - name: notes[].type
      type: |
        [NotesType](./../common-types.md#notes-types)
      description: |
         The type for this note.

    - name: notes[].text
      type: string
      description: The note text itself. This string must be between `0` and `5000` characters.

    - name: metadata
      type: object
      required: false
      description: Custom data about this pickup that will be persisted by the ShipEngine Integration Platform. Must be JSON serializable.
---
Examples
----------------

```javascript
module.exports = async function cancelPickups(transaction, pickups) {

  let data = {
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
        service_code: pickup.pickupService.code,
        zone: Number.parseInt(pickup.address.postalCode),
        reference: pickup.reason,
      };
    })
  };

  // STEP 3: Call the carrier's API
  let response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return response.data.canceled_pick_ups.map((cancellation, index) => {
    if (cancellation.error) {
      return {
        cancellationID: pickups[index].cancellationID,
        confirmationNumber: cancellation.id,
        status: 'Error',
        notes: [
          {
            type: 'Internal',
            text: cancellation.reason,
          }
        ],
      };
    }
    else {
      return {
        cancellationID: pickups[index].cancellationID,
        confirmationNumber: cancellation.id,
        status: 'Success',
        notes: [
          {
            type: 'MessageToBuyer',
            text: `Pickup ${pickups[index].id} was canceled successfully`,
          }
        ],
      };
    }
  });
}
```

```typescript
import {
  CancellationStatus,
  NoteType,
  PickupCancellation,
  PickupCancellationOutcome,
  Transaction
} from "@shipengine/integration-platform-sdk";

export default async function cancelPickups(
  transaction: Transaction<Session>, pickups: PickupCancellation[]): Promise<PickupCancellationOutcome[]> {

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
        service_code: pickup.pickupService.code,
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
            type: NoteType.Internal,
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
        notes: [
          {
            type: NoteType.MessageToBuyer,
            text: `Pickup ${pickups[index].id} was canceled successfully`
          }
        ],
      };
    }
  });
}
```


