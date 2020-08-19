---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: schedulePickup Method
name: schedulePickup

description:
  This method schedules a package pickup for a particular time and place.

documentation: |
  This method schedules a package pickup for a particular time and place. It should be implemented by most carrier apps, unless the carrier does not
  support scheduled package pickups.

param:
  name: pickup
  type: PickupRequest
  signature: pickupRequest
  description: |
    An object representing a request for a carrier to pickup one or more packages at a particular time and place.

  fields:
    - name: pickupService
      type: object
      nullable: false
      description: The [pickup service](./../pickup-service.md) to use for this pickup request.

    - name: pickupService.id
      type: "[UUID](https://www.npmjs.com/package/uuid)"
      nullable: false
      description: A UUID that uniquely identifies the pickup service. This is the UUID you used in the
        [Pickup Service Definition](./../pickup-service.md) file for this pickup service.

    - name: pickupService.identifiers
      type: object
      nullable: false
      description: Your own identifiers for this pickup service.

    - name: pickuService.code
      type: string
      required: false
      nullable: false
      description: Optional code used to map to what the carrier uses to identify the pickup service.

    - name: pickupService.name
      type: string
      nullable: false
      description: The user-friendly service name (e.g. "One-Time Pickup", "Recurring Pickup", "Drop-Off").
         This string will be between `1` and `100` characters and will not contain newline characters.

    - name: pickupService.description
      type: string
      nullable: false
      description: A short, user-friendly description of the service. This string will be between `0` and `1000` characters
        and will not contain newline characters.

    - name: pickupService.hasSandbox
      type: boolean
      nullable: false
      description: Indicates whether the carrier provides a [sandbox](./../../sandbox.md) development API for this pickup service. A sandbox should mimic real functionality as much as possible but MUST NOT incur any actual costs or affect production data.

    - name: timeWindow
      type: object
      nullable: false
      description: The requested window of time for the carrier to arrive.

    - name: timeWindow.startDateTime
      type: "[DateTime](./../date-time.md)"
      nullable: true
      description: The start date/time of the request window.

    - name: timeWindow.endDateTime
      type: "[DateTime](./../date-time.md)"
      nullable: true
      description: The end date/time of the request window.

    - name: timeWindow.toString()
      type: method
      nullable: false
      description: Returns the time range as a string.

    - name: address
      type: "[Address](./../address.md#address-argument)"
      nullable: false
      description: The address where the package(s) should be picked up.

    - name: contact
      type: "[Contact](./../contact-info.md)"
      nullable: false
      description: An object representing contact information about the person there to meet the driver.

    - name: notes
      type: object[]
      nullable: false
      description: An array of objects containing additional information about this pickup request.

    - name: notes[].type
      type: |
        [NotesType](./../common-types.md#notes-types)
      nullable: false
      description: |
        The type for this note.

    - name: notes[].text
      type: string
      nullable: false
      description: The note text itself. This string must be between `0` and `5000` characters.

    - name: shipments
      type: object[]
      nullable: false
      description: A list of shipments that should be scheduled for pickup. This array will contain at least one shipment.

    - name: shipments[].trackingNumber
      type: string
      nullable: false
      description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number.  For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
        This string will be between `0` and `100` characters and will not contain newline characters.

    - name: shipments[].identifiers
      type: object
      nullable: false
      description: Your own identifiers for this shipment.

    - name: shipments[].deliveryService
      type: |
        [DeliveryService](./../delivery-service-object.md#delivery-service-argument)
      nullable: false
      description: The [delivery service](./../delivery-service.md) assigned to this shipment. This array will contain at least one
        value.

    - name: shipments[].metadata
      type: object
      nullable: false
      description: Custom data about this shipment that was previously persisted by the ShipEngine Platform.

    - name: shipments[].packages
      type: object[]
      nullable: false
      description: The list of packages in this shipment. This array will contain at least one value.

    - name: shipments.packages[].trackingNumber
      type: string
      nullable: false
      description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number.  For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
        This string will be between `0` and `100` characters and will not contain newline characers.

    - name: shipments[].packages[].identifiers
      type: object
      nullable: false
      description: Your own identifiers for this package.

    - name: shipments[].packages[].packaging
      type: object
      nullable: false
      description: The packaging used for this package.

    - name: shipments[].packages[].packaging.id
      type: "[UUID](https://www.npmjs.com/package/uuid)"
      nullable: false
      description: A UUID that uniquely identifies this packaging. This is the UUID you used in the [Packaging Definition](./../packaging.md) file for this packaging type.

    - name: shipments[].packages[].packaging.identifiers
      type: object
      nullable: false
      description: Your own identifiers for this packaging.

    - name: shipments[].packages[].packaging[].code
      type: string
      nullable: false
      description: Optional code used to map to what the carrier uses to identify the packaging.

    - name: shipments[].packages[].dimensions
      type: object
      nullable: true
      description: The dimensions for the package.

    - name: shipments[].packages[].dimensions.length
      type: number
      nullable: false
      description: The length of the package. This value may contain decimals.

    - name: shipments[].packages[].dimensions.width
      type: number
      nullable: false
      description: The width of the package. This value may contain decimals.

    - name: shipments[].packages[].dimensions.height
      type: number
      nullable: false
      description: The height of this package. This value may contain decimals.

    - name: shipments[].packages[].dimensions.unit
      type: string
      nullable: false
      description: |
        The unit of measurement for the dimensions. Valid values include the following:
        * `in` for inches
        * `cm` for centimeters

    - name: shipments[].packages[].weight
      type: object
      nullable: false
      description: The weight of the package.

    - name: shipments[].packages[].weight.value
      type: number
      nullable: false
      description: The weight value for this package. This value will not contain decimals.

    - name: shipments[].packages[].weight.unit
      type: string
      nullable: false
      description: |
        The unit of measure for this weight. Valid values include the following:
        * `g` for grams
        * `oz` for ounces
        * `kg` for kilograms
            * `lb` for pounds

    - name: shipments[].packages[].metadata
      type: object
      nullable: false
      description: Custom data about this package that was persisted by ShipEngine Connect. Must be JSON serializable.

    - name: shipments[].package
      type: object
      nullable: false
      description: The first package in the `packages` array. This is useful for carriers that only support single-piece shipments.
        This object has all the same properties as the objects in the `packages` array described above.


return:
  name: pickup
  type: PickupConfirmationPOJO
  signature: PickupConfirmationPOJO
  description: |
    An object that contains confirmation that a package has been scheduled for pickup.
  fields:
    - name: id
      type: string
      required: true
      description: The unique ID for this pickup. This string will be between `1` and `100` characters and will not contain newline characters.

    - name: identifiers
      type: object
      required: false
      description: Your own identifiers for this pickup.

    - name: timeWindows
      type: object[]
      required: true
      description: A list of dates and times when the carrier intends to be available to pickup.

    - name: timeWindows[].startDateTime
      type: |
        [DateTime](./../date-time.md), </br>
        [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), </br>
        or a string representing the date and time in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
      required: false
      description: The start date/time of the request window.

    - name: timeWindows[].endDateTime
      type: |
        [DateTime](./../date-time.md), </br>
        [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), </br>
        or a string representing the date and time in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
      required: false
      description: The end date/time of the request window.

    - name: charges
      type: |
        [Charge](./../charge.md)[]
      required: true
      description: The breakdown of charges for this shipment. If the carrier does not provide a detailed breakdown, then just use a single charge of type "shipping".

    - name: shipments
      type: object[]
      required: false
      description: The list of shipments to be picked-up. If not specified, the assumption is that all of the shipments will be picked up.

    - name: shipments[].trackingNumber
      type: string
      required: false
      description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same
        tracking number as one of the packages.  This string must be between `0` and `100` characters and must not contain newline characters.

    - name: shipments[].identifiers
      type: object
      required: false
      description: Your own identifiers for this shipment.

    - name: notes
      type: object[]
      required: false
      description: An array of objects containing additional information about this pickup request.

    - name: notes[].type
      type: |
        [NotesType](./../common-types.md#notes-types)
      required: true
      description: |
        The type for this note.

    - name: notes[].text
      type: string
      required: true
      description: The note text itself. This string must be between `0` and `5000` characters.

    - name: metadata
      type: object
      required: false
      description: The carrier's custom data about this pickup that will be persisted by ShipEngine Connect. Must be JSON serializable.
---
Examples
-----------------

```javascript
module.exports = async function schedulePickup(transaction, pickup) {

  // STEP 1: Validation

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    operation: "pick_up",
    session_id: transaction.session.id,
    service_code: pickup.pickupService.code,
    date_time: pickup.timeWindow.startDateTime.toISOString(),
    zone: Number.parseInt(pickup.address.postalCode),
    contact_phone: pickup.contact.phoneNumber,
    total_weight: pickup.shipments.reduce((w, ship) => w + ship.package.weight.ounces, 0),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatConfirmation(response.data);
}
```

```typescript
import {
  ChargeType,
  PickupConfirmation,
  PickupRequest,
  Transaction
} from "@shipengine/connect-sdk";

export default async function schedulePickup(
  transaction: Transaction<Session>, pickup: PickupRequest): Promise<PickupConfirmation> {

  // STEP 1: Validation

  // STEP 2: Create the data that the carrier's API expects
  let data: PickUpRequest = {
    operation: "pick_up",
    session_id: transaction.session.id,
    service_code: pickup.pickupService.code,
    date_time: pickup.timeWindow.startDateTime.toISOString(),
    zone: Number.parseInt(pickup.address.postalCode),
    contact_phone: pickup.contact.phoneNumber,
    total_weight: pickup.shipments.reduce((w, ship) => w + ship.package.weight.ounces, 0),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<PickUpResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatConfirmation(response.data);
}
```


