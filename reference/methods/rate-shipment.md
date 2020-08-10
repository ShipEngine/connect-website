---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: rateShipment Method
name: rateShipment

description:
  This method calculates the shipping costs for a shipment, or multiple permutations of a shipment, to allow your customers to select the best rate.

documentation: |
  This method calculates the shipping costs for a shipment, or multiple permutations of a shipment, to allow your customers to select the best rate.

  Most carrier apps should implement this method, unless you don't support rating shipments.

param:
  name: shipment
  type: RateCriteria[]
  signature: rateShipment
  description: |
    An _array_ of objects containing information used to calculate shipping charges.

  fields:
    - name: deliveryService
      type: |
        [DeliveryService](./../delivery-service-object.md)
      description: An object that indicates the [delivery service](../delivery-service.md) to get rates for. If neither `deliveryService` nor `fulfillmentService` are specified, then rate quotes should be returned for all applicable services.

    - name: fulfillmentService
      type: |
        [FulfillmentService](./../fulfillment-service.md)
      description: |

        The [fulfillment service](./../fulfillment-service.md), that may be used to fulfill the shipment. If neither `deliveryService` nor `fulfillmentService` are specified, then rate quotes should be returned for all applicable services.

    - name: deliveryConfirmation
      type: |
        [DeliveryConfirmation](./../delivery-confirmation.md)
      description: The type of package [delivery confirmation](./../delivery-confirmation.md) to use for this rate request.

    - name: shipDateTime
      type: "[DateTime](./../date-time.md)"
      description: The date/time that the shipment is expected to ship. This is not guaranteed to be in the future.

    - name: deliveryDateTime
      type: "[DateTime](./../date-time.md)"
      description: The latest date and time that the shipment can be delivered.

    - name: shipFrom
      type: "[AddressWithContactInfo](./../address.md)"
      description: The sender's contact info and address.

    - name: shipTo
      type: "[AddressWithContactInfo](./../address.md)"
      description: The recipient's contact info and address.

    - name: returns
      type: object
      description: An object that indicates whether or not this shipment is a return shipment.

    - name: returns.isReturn
      type: boolean
      description: Indicates whether or not this shipment is a return shipment.

    - name: package
      type: object
      required: true
      description: The package in the shipment.

    - name: package.packaging
      type: object[]
      required: true
      description: The packaging that may be used. If not specified, then rate quotes should be returned for all applicable packaging.

    - name: package.packaging[].id
      type: "[UUID](https://www.npmjs.com/package/uuid)"
      required: false
      description: A UUID that uniquely identifies the packaging. This is the UUID you used in the [Packaging Definition](./../packaging.md) file for this packaging.

    - name: package.packaging[].identifiers
      type: object
      required: false
      description: Your own identifiers for this packaging.

    - name: package.packaging[].code
      type: string
      required: false
      description: Optional code used to map to what the carrier uses to identify the packaging.

    - name: package.packaging[].name
      type: string
      description: The user-friendly name for this packaging (e.g. "Flat-Rate Box", "Large Padded Envelope").
        This string will be between `1` and `100` characters and will not contain newline characters.

    - name: package.packaging[].description
      type: string
      description: A short, user-friendly description of the packaging.
        This string will be between `0` and `1000` characters and will not contain newline characters.

    - name: package.packaging[].requiresWeight
      type: boolean
      description: Indicates whether the weight must be specified when using this packaging.

    - name: package.packaging[].requiresDimensions
      type: boolean
      description: Indicates whether the dimensions must be specified when using this packaging.

    - name: package.dimensions
      type: object
      description: The dimensions for the package.

    - name: package.dimensions.length
      type: number
      description: The length of the package. This value may contain decimals.

    - name: package.dimensions.width
      type: number
      description: The width of the package. This value may contain decimals.

    - name: package.dimensions.height
      type: number
      description: The height of the package. This value may contain decimals.

    - name: package.dimensions.unit
      type: string
      description: |
        The unit of measurement for the dimensions. Valid values include the following:
        * `in` - inches
        * `cm` - centimeters

    - name: package.weight
      type: object
      description: The weight of the package.

    - name: package.weight.value
      type: number
      description: The weight value for this package. This value may contain decimals.

    - name: package.weight.unit
      type: string
      description: |
        The unit of measure for this weight. Valid values include the following:
        * `g` - grams
        * `oz` - ounces
        * `kg` - kilograms
        * `lb` - pounds

    - name: package.insuredValue
      type: object
      description: The insured value of this shipment.

    - name: package.insuredValue.value
      type: number
      description: The value of the insured amount.

    - name: package.insuredValue.currency
      type: string
      description: |
        The currency that the value represents.

    - name: package.containsAlcohol
      type: boolean
      description: Indicates whether the package contains alcohol.

    - name: package.isNonMachineable
      type: boolean
      description: Indicates whether the package cannot be processed automatically due to size, shape, weight, etc. and requires manual handling.

return:
  name: rate
  type: RatePOJO
  signature: RatePOJO[]
  description: |
    An _array_ of objects representing the quoted shipping rates based on the specified rate criteria.
  fields:
    - name: deliveryService
      type: object | string
      description: |
        The [delivery service](./../delivery-service.md) this rate is for.
        This property accepts an object or a string representing the `code`. If an object is provided, it will have the following properties.

    - name: deliveryService.id
      type: "[UUID](https://www.npmjs.com/package/uuid)"
      required: true
      description: A UUID that uniquely identifies the object. This is the UUID you used in the [Delivery Service Definition](./../delivery-service.md) file for this delivery service.

    - name: deliveryService.identifiers
      type: object
      required: false
      description: Your own identifiers for this delivery service.

    - name: deliveryService.code
      type: string
      required: false
      description: Optional code used to map to what the carrier or marketplace uses to identify the delivery service.

    - name: deliveryConfirmation
      type: object | string
      required: true
      description: The [delivery confirmation](./../delivery-confirmation.md) included in this rate. This property accepts an object or a
         string representing the `id`, `code`, or `type`. If an object is provided, it will have the following properties.

    - name: deliveryConfirmation.id
      type: UUID
      required: true
      description: UUID that uniquely identifies the delivery confirmation. This ID should never change.

    - name: deliveryConfirmation.identifiers
      type: object
      required: false
      description: Your own identifiers for this delivery confirmation.

    - name: deliveryConfirmation.code
      type: string
      required: false
      description: Optional code used to map to what the carrier or marketplace uses to identify the packaging.

    - name: shipDateTime
      type: |
        [DateTime](./../date-time.md), </br>
        [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), </br>
        or a string representing the date and time in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
      required: false
      description: The date/time that the shipment is expected to ship.  This is not guaranteed to be in the future.

    - name: deliveryDateTime
      type: |
        [DateTime](./../date-time.md), </br>
        [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), </br>
        or a string representing the date and time in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
      required: false
      description: The estimated date and time the shipment will be delivered.

    - name: isNegotiatedRate
      type: boolean
      required: false
      description: Indicates whether this shipment used a pre-negotiated terms.

    - name: isTrackable
      type: boolean
      required: false
      description: Indicates whether tracking numbers are provided.

    - name: charges
      type: |
        [Charge](./../charge.md)[]
      required: true
      description: The breakdown of charges for this shipment.  If the carrier does not provide a detailed breakdown, then just use a single charge of type "shipping".

    - name: notes
      type: object[]
      required: false
      description: An array of objects containing additional information about this rate.

    - name: notes[].type
      type: |
              [NotesType](./../common-types.md#notes-types)
      required: false
      description: |
        The type for this note.

    - name: notes[].text
      type: string
      required: false
      description: The note text itself. This string must be between `0` and `5000` characters.

    - name: packages
      type: object[]
      required: true
      description: An array of objects describing the list of packages in the shipment.

    - name: packages[].packaging
      type: object | string
      required: true
      description: The packaging this rate is for. This property accepts an object or a
        string representing the `code`. If an object is provided, it will have the following properties.

    - name: packages[].packaging.id
      type: "[UUID](https://www.npmjs.com/package/uuid)"
      required: true
      description: A UUID that uniquely identifies the object. This is the UUID you used in the [Packaging Definition](./../packaging.md) file for this packaging type.

    - name: packages[].packaging.identifiers
      type: object
      required: false
      description: Your own identifiers for this packaging.

    - name: packages[].packaging.code
      type: string
      required: false
      description: Optional code used to map to what the carrier or marketplace uses to identify the packaging.




---
Examples
--------------

```javascript
module.exports = async function rateShipment(transaction, shipment) {

  // STEP 1: Validation
  // TODO: add any validation logic here

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    operation: "quote_rates",
    session_id: transaction.session.id,
    service_codes: shipment.deliveryService.map((svc) => svc.code),
    confirmation_codes: shipment.deliveryConfirmations.map((conf) => conf.code),
    parcel_codes: shipment.packages[0].packaging.map((pkg) => pkg.code),
    ship_date: shipment.shipDateTime.toISOString(),
    delivery_date: shipment.deliveryDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.packages[0].weight.ounces,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return response.data.map(formatRate);
}
```

```typescript
import {
  ChargeType,
  RateCriteria,
  RatePOJO,
  Transaction
} from "@shipengine/integration-platform-sdk";

export default async function rateShipment(
  transaction: Transaction<Session>, shipment: RateCriteria): Promise<RatePOJO[]> {

  // STEP 1: Validation
  // TODO: add any validation logic here

  // STEP 2: Create the data that the carrier's API expects
  let data: QuoteRatesRequest = {
    operation: "quote_rates",
    session_id: transaction.session.id,
    service_codes: shipment.deliveryService.map((svc) => svc.code),
    confirmation_codes: shipment.deliveryConfirmations.map((conf) => conf.code),
    parcel_codes: shipment.packages[0].packaging.map((pkg) => pkg.code),
    ship_date: shipment.shipDateTime.toISOString(),
    delivery_date: shipment.deliveryDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.packages[0].weight.ounces,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<QuoteRatesResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return response.data.map(formatRate);
}
```


