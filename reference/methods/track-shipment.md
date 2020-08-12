---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: trackShipment Method
name: trackShipment

description:
  This method returns tracking information for a shipment.

documentation: |
  This method returns tracking information for a shipment, including each of the tracking events that have occurred for the shipment.

  Most carrier applications should implement this method, unless you don't support tracking shipments.

param:
  name: shipment
  type: TrackingCriteria
  signature: trackShipment
  description: |
    An object containing information about which shipment to track.

  fields:
    - name: trackingNumber
      type: string
      description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
        This string will be between `0` and `100` characters and will not contain newline characters.

    - name: identifiers
      type: object
      description: Your own identifiers for this shipment.

    - name: returns
      type: object
      description: An object that indicates whether or not this shipment is a return shipment.

    - name: returns.isReturn
      type: boolean
      description: Indicates whether or not this shipment is a return shipment.

    - name: metadata
      type: object
      description: Custom data about this shipment that was persisted by ShipEngine Connect. Must be JSON serializable.


return:
  name: trackingInfo
  type: TrackingInfo
  signature: TrackingCriteria
  description: |
    An object with tracking information for the specified shipment.
  fields:
    - name: trackingNumber
      type: string
      required: false
      description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
        This string must be between `0` and `100` characters and contain no newline characters.

    - name: identifiers
      type: object
      required: false
      description: Your own identifiers for this shipment.

    - name: deliveryDateTime
      type: |
        [DateTime](./../date-time.md), </br>
        [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), </br>
        or a string representing the date and time in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
      required: false
      description: The date and time that the shipment is now expected to be delivered. Once the shipment has been delivered, this is the actual delivery date/time.

    - name: packages
      type: array
      required: true
      description: The list of packages in the shipment.

    - name: packages[].packaging
      type: object | string
      required: true
      description: The actual packaging that was used, as determined by the carrier. This property accepts an object or a
         string representing the `code`. If an object is provided, it will have the following properties.

    - name: packages[].packaging.id
      type: "[UUID](https://www.npmjs.com/package/uuid)"
      required: false
      description: UUID that uniquely identifies the object. This is the UUID you used in the [Packaging Definition](./../packaging.md) file for this packaging.

    - name: packages[].packaging.identifiers
      type: object
      required: false
      description: Your own identifiers for this packaging.

    - name: packages[].packging.code
      type: string
      required: false
      description: Optional code used to map to what the carrier uses to identify the packaging.

    - name: packages[].packaging.name
      type: string
      description: The user-friendly name for this packaging (e.g. "Flat-Rate Box", "Large Padded Envelope").
        This string will be between `1` and `100` characters and will not contain newline characters.

    - name: packages[].packaging.description
      type: string
      description: A short, user-friendly description of the packaging.
        This string will be between `0` and `1000` characters and will not contain newline characters.

    - name: packages[].packaging.requiresWeight
      type: boolean
      description: Indicates whether the weight must be specified when using this packaging.

    - name: packages[].packaging.requiresDimensions
      type: boolean
      description: Indicates whether the dimensions must be specified when using this packaging.

    - name: packages[].dimensions
      type: object
      required: false
      description: The dimensions for the package.

    - name: packages[].dimensions.length
      type: number
      required: true
      description: The length of the package. This value may contain decimals.

    - name: packages[].dimensions.width
      type: number
      required: true
      description: The width of the package. This value may contain decimals.

    - name: packages[].dimensions.height
      type: number
      required: true
      description: The height of the package. This value may contain decimals.

    - name: packages[].dimensions.unit
      type: string
      required: true
      description: |
        The unit of measurement for the dimensions. Valid values include the following:
        * `in` - inches
        * `cm` - centimeters

    - name: packages[].weight
      type: object
      description: The weight of the package.

    - name: packages[].weight.value
      type: number
      description: The weight value for this package. This value may not contain decimals.

    - name: packages[].weight.unit
      type: string
      description: |
        The unit of measure for this weight. Valid values include the following:
        * `g` - grams
        * `oz` - ounces
        * `kg` - kilograms
        * `lb` - pounds

    - name: events
      type: object[]
      required: true
      description: The events and status changes that have occurred for this shipment.

    - name: events[].name
      type: string
      required: false
      description: The user-friendly name of the event (e.g. "Arrived at Warehouse", "Delivered"). This string must be between `0` and `100` characters and must not contain newline characters.

    - name:  events[].dateTime
      type:  |
        [DateTime](./../date-time.md), </br>
        [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), </br>
        or a string representing the date and time in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
      required: true
      description: The date/time that this event occurred.

    - name: events[].status
      type: string
      required: true
      description: |
        The status of the shipment. Value values include the following:
        * `accepted` - The shipment has been accepted by a drop-off facility or picked up by the carrier.
        * `in_transit` - The shipment is in transit.
        * `delivery_attempted` - The delivery was attempted but was unsuccessful. This could happen if a signature is required for delivery confirmation
           and no one is home when the delivery is attempted, for example.
        * `delivered` - The shipment has been delivered.
        * `exception` - There was an error is tracking the shipment.

    - name: events[].isError
      type: boolean
      required: false
      description: Indicates whether this event represents an error state, such as a lost package or failed delivery.

    - name: events[].code
      type: string
      required: false
      description: The carrier's event or status code. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: events[].description
      type: string
      required: false
      description: The carrier's description of the event or status code. This description should not be specific to this particular shipment.
        This string must be between `0` and `1000` characters and must not contain newline characters.

    - name: events[].address
      type: |
        Partial<[Address](./../address.md)>
      required: false
      description: The address (or as much of it as is known) where the event occurred.

    - name: events[].signer
      type: string or object
      required: false
      description: The name of the person who signed or approved this event. This is usually only relevant for the "Delivered" event.
        This propery can take a string or object. If passing an object, use the properties described below.

    - name: events[].signer.title
      type: string
      required: false
      description: The title of the contact (eg "Mr", "Mrs", "Dr"). This string must be between `0` and `100` characters and must not contain newline characters.

    - name: events[].signer.given
      type: string
      required: true
      description: The first name of the signer. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: events[].signer.middle
      type: string
      required: false
      description: The middle name of the signer. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: events[].signer.family
      type: string
      required: false
      description: The last name or family name of the signer. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: events[].signer.suffix
      type: string
      required: false
      description: The suffix of the signer (eg "Sr", "Jr", "IV"). This string must be between `0` and `100` characters and must not contain newline characters.

    - name: notes
      type: object[]
      required: false
      description: An array of objects containing additional information about this shipment.

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

---

Examples
--------------

```javascript
module.exports = async function trackShipment(transaction, trackingCriteria) {
  // STEP 1: Validation


  // STEP 2: Create the data that the carrier"s API expects

  const { trackingNumber, returns } = trackingCriteria;

  const data = {
    operation: "location_history",
    trackingNumber,
    isReturn: returns.isReturn
  };

  // STEP 3: Call the carrier"s API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return await formatTrackingResponse(response.data);

}
```

```typescript
import {
  Transaction,
  TrackingCriteria,
  TrackingInfo
} from "@shipengine/integration-platform-sdk";

export default async function trackShipment(
  transaction: Transaction, trackingCriteria: TrackingCriteria): Promise<TrackingInfo> {
  // STEP 1: Validation


  // STEP 2: Create the data that the carrier"s API expects

  const { trackingNumber, returns } = trackingCriteria;

  const data = {
    operation: "location_history",
    trackingNumber,
    isReturn: returns.isReturn
  };

  // STEP 3: Call the carrier"s API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return await formatTrackingResponse(response.data);
}
```


