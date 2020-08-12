---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: createShipment Method
name: createShipment

description:
  This method creates a new shipment.

documentation: |
  This method creates a new shipment.

param:
  name: shipment
  type: NewShipment
  signature: createShipment
  description: |
    An object containing information about the new shipment to create.

  fields:
    - name: deliveryService
      type: |

        [DeliveryService](./../delivery-service-object.md)
      description: An object that identifies a [delivery service](./../delivery-service.md) that is offered by a carrier.

    - name: deliveryConfirmation
      type: |
       [DeliveryConfirmation](./../delivery-confirmation.md)
      description: The requested [delivery confirmation](./../delivery-confirmation.md) for this shipment.

    - name: shipFrom
      type: "[AddressWithContactInfo](./../address.md)"
      description: The address _from_ which the shipment is being shipped.

    - name: shipTo
      type: "[AddressWithContactInfo](./../address.md)"
      description: The address _to_ which the shipment is being shipped.

    - name: returnTo
      type: "[AddressWithContactInfo](./../address.md)"
      description: The address to which to send the shipment in the case of a return. This may be different from the `shipFrom` address if the customer uses a centralized returns processing facility.

    - name: shipDateTime
      type: |
        [DateTime](./../date-time.md)
      description: The date/time that the package is expected to ship. This is not guaranteed to be in the future.

    - name: totalInsuredValue
      type: object
      description: The total insured value of all packages in the shipment.

    - name: totalInsuredValue.value
      type: number
      description: The value of the insured amount.

    - name: totalInsuredValue.currency
      type: string
      description: |
        The currency that the value represents.

    - name: isNonMachineable
      type: boolean
      description: Indicates whether the shipment cannot be processed automatically due to size, shape, weight, etc.
            and requires manual handling. This property is `true` if any package in the shipment is non-machinable.

    - name: returns
      type: object
      description: An object that indicates whether or not this shipment is a return shipment.

    - name: returns.isReturn
      type: boolean
      description: Indicates whether or not this shipment is a return shipment.

    - name: returns.rmaNumber
      type: string
      description: A [return merchandise authorization (RMA)](https://en.wikipedia.org/wiki/Return_merchandise_authorization) is an associated number assigned to process the return. This number is often printed on the label and used when the original shipper processes the inbound return.
        This string will be between `0` and `100` characters and will not contain newline characters.

    - name: packages
      type: |
        [NewPackage](./../new-package-object.md)[]
      description: The list of packages in this shipment.

    - name: package
      type: |
        [NewPackage](./../new-package-object.md)
      description: Returns the first package in the `packages` array. Useful for carriers that only support single-piece shipments.


return:
  name: shipmentConfirmation
  type: ShipmentConfirmationPOJO
  signature: ShipmentConfirmationPOJO
  description: |
    An object that contains confirmation that a shipment has been created.
  fields:

    - name: trackingNumber
      type: string
      required: false
      description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
        This string must be between `0` and `100` characters and must not contain newline characters.

    - name: identifiers
      type: object
      required: false
      description: Your own identifiers for this shipment.

    - name: label
      type: object
      required: true
      description: An object representing the shipping label details.

    - name: label.name
      type: string
      required: false
      description: The user-friendly name of the label. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: label.type
      type: string
      required: true
      description: |
        The type of document. This value should always be `label` for label objects. This object type is also used for
        customs forms and scan forms.

    - name: label.size
      type: string
      required: true
      description: |
        The size of the label. Valid values include the following:
        * `A4`- A4 sized paper ( 8.27 inches x 11.69 inches)
        * `letter` - Letter sized paper (8.5 inches by 11 inches)
        * `4x6` - Paper sized 4 inches by 6 inches
        * `4x8` - Paper sized 4 inches by 8 inches

    - name: label.format
      type: string
      required: true
      description: |
        The file format of the label. Valid values include the following:
        * `pdf` - Portable Document Format (PDF)
        * `zpl` - Zebra Printer Label (ZPL)
        * `png` - Portable Graphics Format (PNG)

    - name: label.data
      type: |
        [Buffer](https://nodejs.org/api/buffer.html)
      required: true
      description: The label data, in the specified file format.

    - name: label.referenceFields
      type: string[]
      required: true
      description: The **actual** reference fields on the label, which may not match the originally-specified reference fields due to the carrier's restrictions on the number of fields or the length of each field.
        Each string in this array must be between `0` and `100` characters and must not contain newline characters.

    - name: form
      type: object
      required: false
      description: An object representing a form, such as a customs form or scan form.

    - name: form.name
      type: string
      required: false
      description: The user-friendly name of the form (e.g. "Customs Form", "Scan Form").
        This string must be between `0` and `100` characters and must not contain newline characters.

    - name: form.type
      type: string
      required: true
      description: |
        The type of form. This value should be `customs_form` or `scan_form`.

    - name: form.size
      type: string
      required: true
      description: |
        The size of the form. Valid values include the following:
        * `A4`- A4 sized paper ( 8.27 inches x 11.69 inches)
        * `letter` - Letter sized paper (8.5 inches by 11 inches)
        * `4x6` - Paper sized 4 inches by 6 inches
        * `4x8` - Paper sized 4 inches by 8 inches

    - name: form.format
      type: string
      required: true
      description: |
        The file format of the form. Valid values include the following:
        * `pdf` - Portable Document Format (PDF)
        * `zpl` - Zebra Printer Label (ZPL)
        * `png` - Portable Graphics Format (PNG)

    - name: form.data
      type: |
        [Buffer](https://nodejs.org/api/buffer.html)
      required: true
      description: The form data, in the specified file format.

    - name: deliveryDateTime
      type: |
        [DateTime](./../date-time.md), </br>
        [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), </br>
        or a string representing the date and time in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
      required: false
      description: The estimated date and time the shipment will be delivered.

    - name: charges
      type: |
        [Charge](./../charge.md)[]
      required: true
      description: The breakdown of charges for this shipment.  If the carrier does not provide a detailed breakdown, then just use a single charge of type "shipping".

    - name: packages
      type: object[]
      required: true
      description: An array of objects containing confirmation details about each package in the shipment. This array
       will contain at least one item.

    - name: packages[].trackingNumber
      type: string
      description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
        This string must be between `0` and `100` characters and must not contain newline characters.

    - name: packages[].identifiers
      type: object
      required: false
      description: Your own identifiers for this package.

    - name: packages[].metadata
      type: object
      required: false
      description: Custom data about this package that will be persisted by ShipEngine Connect. Must be JSON serializable.


---

Examples
---------------
```javascript
module.exports = async function createShipment(transaction, shipment) {
  // STEP 1: Validation
  for (let parcel of shipment.packages) {
    if (parcel.packaging.id === OWN_PACKAGING && parcel.weight.grams > 100000) {
      throw new Error(`${parcel.packaging.name} cannot weigh more than 100 kilograms`);
    }
  }

  // STEP 2: Create the data that the carrier's API expects
  let data = {
    operation: "generate_label",
    session_id: transaction.session.id,
    service_code: shipment.deliveryService.code,
    confirmation_code: shipment.deliveryConfirmation.code,
    ship_date: shipment.shipDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.package.weight.ounces,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return await formatShipment(response.data);
}
```

```typescript
import {
  ChargeType,
  DocumentFormat,
  DocumentSize,
  DocumentType,
  NewShipment,
  ShipmentConfirmation,
  Transaction
} from "@shipengine/integration-platform-sdk";

export default async function createShipment(
  transaction: Transaction<Session>, shipment: NewShipment): Promise<ShipmentConfirmation> {

  // STEP 1: Validation
  for (let parcel of shipment.packages) {
    if (parcel.packaging.id === box.id && parcel.weight.ounces > (150 * 16)) {
      throw new Error(`${parcel.packaging.name} cannot weigh more than 150 pounds`);
    }
    else if (parcel.packaging.id === bag.id && parcel.weight.ounces > (45 * 16)) {
      throw new Error(`${parcel.packaging.name} cannot weigh more than 45 pounds`);
    }
  }

  // STEP 2: Create the data that the carrier's API expects
  let data: GenerateLabelRequest = {
    operation: "generate_label",
    session_id: transaction.session.id,
    service_code: shipment.deliveryService.code,
    confirmation_code: shipment.deliveryConfirmation.code,
    ship_date: shipment.shipDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.package.weight.ounces,
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<GenerateLabelResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatShipment(response.data);
}
```


