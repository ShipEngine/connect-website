---
layout: nunjucks/layouts/object-page.njk
title: Delivery Service Object
name: Delivery Service
identifier: Delivery Service Properties

description:
  The page describes the delivery service object.

documentation: |
  A Delivery Service is a type of delivery that is offered by a carrier, such as "international" or "standard overnight".
  You defined the delivery service options available through your company in [Delivery Service Definition](./delivery-service.md)
  files.
  Arguments passed to your methods and values returned from your methods will often contain a nested delivery service object that
  mimics the format of the definition file.
  The page defines the properties required on a delivery service object.

fields:
  - name: id
    type: UUID
    required: true
    description: UUID that uniquely identifies the delivery service. This is the UUID you used in the
      [Delivery Service Definition](./delivery-service.md) file for this delivery service.

  - name: identifiers
    type: object
    required: false
    description: Your own identifiers for this delivery service.

  - name: code
    type: string
    required: false
    description: Optional code used to map to what the carrier uses to identify the delivery service.

  - name: name
    type: string
    required: true
    description: The user-friendly service name (e.g. "Priority Overnight", "2-Day Air").

  - name: description
    type: string
    required: false
    description: A short, user-friendly description of the service.

  - name: class
    type: string
    required: true
    description: |
      The class of service used by this delivery service. Valid values include the following:
      * `ground` - Delivery within a range of days, usually one to five days.
      * `one_day` - Delivery within one day.
      * `one_day_early` - Delivery within one day with an early delivery time.
      * `one_day_early_am` - Delivery within one day with a delivery time before noon.
      * `two_day` - Delivery within two days.
      * `two_day_early` - Delivery within two days with an early delivery time.
      * `three_day` - Delivery within three days.

  - name: grade
    type: string
    required: true
    description: |
      The grade of service used by this delivery service. Valid values include the following:
      * `economy`
      * `expedited`
      * `overnight`
      * `standard`

  - name: fulfillmentService
    type: string
    required: true
    description: A well-known [fulfillment service](./fulfillment-service.md) that's used to fulfill this delivery service, such as "fedex_ground".

  - name: serviceArea
    type: string
    required: true
    description: |
      The service area this delivery service covers. Valid values include the following:
      * `regional` - Delivery based on the shipment's distance to its destination. Rates typically vary by zone.
      * `domestic` - Delivery with an origin address and a destination address within the same country.
      * `international` - Delivery with an origin address and a destination address in different countries.
      * `global`

  - name: isConsolidatedService
    type: boolean
    required: true
    description: Indicates whether this delivery service is a consolidation of multiple carrier services.

  - name: allowsMultiplePackages
    type: boolean
    required: true
    description: Indicates whether the delivery service allows multiple packages in a single shipment.

  - name: isInsurable
    type: boolean
    required: true
    description: Indicates whether shippers can purchase insurance from the carrier for this delivery service.

  - name: isTrackable
    type: boolean
    required: true
    description: Indicates whether tracking numbers are provided by this delivery service.

  - name: hasSandbox
    type: boolean
    required: true
    description: Indicates whether the carrier provides a [sandbox](./../sandbox.md) API for this delivery service. A sandbox should mimic real functionality as much as possible but MUST NOT incur any actual costs or affect production data.

  - name: labelFormats
    type: string[]
    required: true
    description: |
      The list of label formats that are offered for this delivery service. Valid values include the following:
      * `pdf` - Potable Document Format (PDF)
      * `zpl` - Zebra Printer Label (ZPL)
      * `png` - Portable Graphics Format (PNG)

  - name: labelSizes
    type: string[]
    required: true
    description: |
      The list of label sizes that are offered for this delivery service. Valid values include the following:
      * `A4` - A4 sized paper. 8.27 inches x 11.69 inches.
      * `letter` - Letter sized paper. 8.5 inches by 11 inches.
      * `4x6` - Paper sized 4 inches by 6 inches.
      * `4x8` - Paper sized 4 inches by 8 inches.

  - name: originCountries
    type: |
      [CountryCode](./country-codes.md)[]
    required: true
    description: |
      The list of [ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) for the
      [countries](./country-codes.md) that can be shipped _from_ using this delivery service.

  - name: destinationCountries
    type: |
      [CountryCode](./country-codes.md)[]
    required: true
    description: |
       The list of [ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) for the
               [countries](./country-codes.md) that can be shipped _to_ using this delivery service.

  - name: countries
    type: |
      [CountryCode](./country-codes.md)[]
    required: true
    description: |
       All countries that this service ships to or from. This list includes all unique origin and destination countries.
       This list must contain [ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

  - name: requiresWeight
    type: boolean
    required: true
    description: Indicates whether the weight may be required when using this service. This property is `true` if any of the service's packaging requires weight.

  - name: requiresDimensions
    type: boolean
    required: true
    description: Indicates whether the dimensions may be required when using this service. This property is `true` if any of the service's packaging requires dimensions.

  - name: packaging
    type: object[]
    required: true
    description: The types of packaging that are provided or allowed for this delivery service.
      This array will contain at least one value.

  - name: packaging.id
    type: "[UUID](https://www.npmjs.com/package/uuid)"
    required: true
    description: A UUID that uniquely identifies the packaging. This is the UUID you used in the [Packaging Definition](./packaging.md)
      file for this packaging.

  - name: packaging.identifiers
    type: string[]
    required: false
    description: Your own identifiers for this packaging.

  - name: packaging.name
    type: string
    required: true
    description: The user-friendly name for this packaging (e.g. "Flat-Rate Box", "Large Padded Envelope").
      This string must be between `1` and `100` characters and must not contain newline characters.

  - name: packaging.description
    type: string
    required: false
    description: A short, user-friendly description of the packaging.
      This string must be between `0` and `1000` characters and must not contain newline characters.

  - name: packaging.requiresWeight
    type: boolean
    required: false
    description: Indicates whether the weight must be specified when using this packaging.

  - name: packaging.requiresDimensions
    type: boolean
    required: false
    description: Indicates whether the dimensions must be specified when using this packaging.

  - name: deliveryConfirmations
    type: object[]
    required: true
    description: The types of package [delivery confirmations](./delivery-confirmation.md) offered for this service.

  - name: deliveryConfirmations[].id
    type: "[UUID](https://www.npmjs.com/package/uuid)"
    required: true
    description: A UUID that uniquely identifies this delivery confirmation. This is the UUID you used in the
      [Delivery Confirmation Definition](./delivery-confirmation.md) file for this delivery confirmation.

  - name: deliveryConfirmations[].identifiers
    type: object
    description: Your own identifiers for this delivery confirmation.

  - name: deliveryConfirmations[].name
    type: string
    required: true
    description: The user-friendly name for this delivery confirmation (e.g. "Adult Signature", "Authority to Leave").
      This string must be between `1` and `100` characters and must not contain newline characters.

  - name: deliveryConfirmations[].description
    type: string
    description: A short, user-friendly description of the delivery confirmation type.
      This string must be between `0` and `1000` characters and must not contain newline characters.

  - name: deliveryConfirmations[].type
    type: string
    required: true
    description: |
      The type of confirmation for this delivery confirmation. Valid values include the following:
      * `delivery` - Package is dropped off at the destination address.
      * `signature` - A person at the destination address signs for the package.
      * `adult_signer` - A person over 18 at the destination address signs for the package.
      * `direct_signature` - The person named as the recipient signs for the package.

      This array will contain at least one value.

---

Examples
-----------------------------------
```javascript
{
  "id": "43fc9d24-6a89-428a-ad34-c614c14170b6",
  "identifiers": {
    "apiCode": "intlEcon"
  },
  "code": "IEC",
  "name": "International Economy",
  "description": "Worldwide delivery at an affordable price",
  "class": "ground",
  "grade": "standard",
  "fulfillmentService": "ups_worldwide_express",
  "serviceArea": "international",
  "isConsolidatedService": false,
  "allowsMultiplePackages": false,
  "isInsurable": true,
  "isTrackable": false,
  "hasSandbox": false,
  "labelFormats": ["pdf", "png"],
  "labelSizes": ["4x6", "4x8"],
  "originCountries": ["US", "CA", "MX"],
  "destinationCountries": ["US", "CA", "MX"],
  "packaging": [
  {
    "id": "03318192-3e6c-475f-a496-a4f17c1dbcae",
    "identifers": {
      "apiCode": "pkg",
    },
    "code": "PKG",
    "name": "Package",
    "description": "Your own packaging, up to 100 kilograms",
    "requiresWeight": true,
    "requiresDimensions": true,
  }],
  "deliveryConfirmations": [
  {
    "id": "cc10a05a-78eb-11ea-bc55-0242ac130003",
    "identifiers": {
      "apiCode": "A-SIG",
    },
    "code": "ASIG",
    "name": "Adult Signature",
    "description": "Requires a signature from a resident of at least 18 years of age.",
    "type": "adult_signature",
  }]
}
```
