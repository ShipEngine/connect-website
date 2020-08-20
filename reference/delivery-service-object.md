---
hidden: true
title: Delivery Service Objects
name: Delivery Service Objects


description:
  This page describes the delivery service object that is passed to a ShipEngine Connect 
  Carrier app. For example, the [createShipment method](./methods/create-shipment.md) accepts a `shipment` parameter with
  a `deliveryService` property that corresponds to this object. The property details include whether or not they are `required`
  or `nullable`. These details may differ depending on whether the delivery service is part of a parameter passed to a method
  or part of an argument returned from a method.

documentation: |
  A Delivery Service is a type of delivery that is offered by a carrier, such as `international` or `standard overnight`.
  You defined the delivery service options available through your app in [Delivery Service Definition](./delivery-service.md)
  files.
  
fields:
  - name: id
    type: UUID
    nullable: false
    required: true
    description: UUID that uniquely identifies the delivery service. This is the UUID you used in the
      [Delivery Service Definition](./delivery-service.md) file for this delivery service.

  - name: identifiers
    type: object
    nullable: false
    description: Your own identifiers for this delivery service.

  - name: code
    type: string
    nullable: false
    description: Optional code used to map to what the carrier uses to identify the delivery service.

  - name: name
    type: string
    nullable: false
    required: true
    description: The user-friendly service name (e.g. "Priority Overnight", "2-Day Air").

  - name: description
    type: string
    nullable: false
    description: A short, user-friendly description of the service.

  - name: class
    type: string
    nullable: false
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
    nullable: false
    description: |
      The grade of service used by this delivery service. Valid values include the following:
      * `economy`
      * `expedited`
      * `overnight`
      * `standard`

  - name: fulfillmentService
    type: string
    nullable: true
    description: A well-known [fulfillment service](./fulfillment-service.md) that's used to fulfill this delivery service, such as "fedex_ground".

  - name: serviceArea
    type: string
    nullable: true
    description: |
      The service area this delivery service covers. Valid values include the following:
      * `regional` - Delivery based on the shipment's distance to its destination. Rates typically vary by zone.
      * `domestic` - Delivery with an origin address and a destination address within the same country.
      * `international` - Delivery to a from address in at least one other country.
      * `global` - Delivery to a from address anywhere in the world.
      
  - name: isConsolidatedService
    type: boolean
    nullable: false
    description: Indicates whether this delivery service is a consolidation of multiple carrier services.

  - name: allowsMultiplePackages
    type: boolean
    nullable: false
    description: Indicates whether the delivery service allows multiple packages in a single shipment.

  - name: isInsurable
    type: boolean
    nullable: false
    description: Indicates whether shippers can purchase insurance from the carrier for this delivery service.

  - name: isTrackable
    type: boolean
    nullable: false
    description: Indicates whether tracking numbers are provided by this delivery service.

  - name: hasSandbox
    type: boolean
    nullable: false
    description: Indicates whether the carrier provides a [sandbox](./../sandbox.md) API for this delivery service. A sandbox should mimic real functionality as much as possible but MUST NOT incur any actual costs or affect production data.

  - name: supportsReturns
    type: boolean
    nullable: false
    description: Indicates whether the carrier supports return shipments. Defaults to `false` if not specified.

  - name: labelFormats
    type: string[]
    nullable: false
    description: |
      The list of label formats that are offered for this delivery service. Valid values include the following:
      * `pdf` - Potable Document Format (PDF)
      * `zpl` - Zebra Printer Label (ZPL)
      * `png` - Portable Graphics Format (PNG)

  - name: labelSizes
    type: string[]
    nullable: false
    description: |
      The list of label sizes that are offered for this delivery service. Valid values include the following:
      * `A4` - A4 sized paper. 8.27 inches x 11.69 inches.
      * `letter` - Letter sized paper. 8.5 inches by 11 inches.
      * `4x6` - Paper sized 4 inches by 6 inches.
      * `4x8` - Paper sized 4 inches by 8 inches.

  - name: originCountries
    type: |
      [CountryCode](./country-codes.md)[]
    nullable: false
    description: |
      The list of [ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) for the
      [countries](./country-codes.md) that can be shipped _from_ using this delivery service.

  - name: destinationCountries
    type: |
      [CountryCode](./country-codes.md)[]
    nullable: false
    description: |
       The list of [ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) for the
               [countries](./country-codes.md) that can be shipped _to_ using this delivery service.

  - name: countries
    type: |
      [CountryCode](./country-codes.md)[]
    nullable: false
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
    nullable: false
    description: The types of packaging that are provided or allowed for this delivery service.
      This array will contain at least one value.

  - name: packaging[].id
    type: "[UUID](https://www.npmjs.com/package/uuid)"
    nullable: false
    description: A UUID that uniquely identifies the packaging. This is the UUID you used in the [Packaging Definition](./packaging.md)
      file for this packaging.

  - name: packaging[].identifiers
    type: string[]
    nullable: false
    description: Your own identifiers for this packaging.

  - name: packaging[].name
    type: string
    nullable: false
    description: The user-friendly name for this packaging (e.g. "Flat-Rate Box", "Large Padded Envelope").
      This string must be between `1` and `100` characters and must not contain newline characters.

  - name: packaging[].description
    type: string
    nullable: false
    description: A short, user-friendly description of the packaging.
      This string must be between `0` and `1000` characters and must not contain newline characters.

  - name: packaging[].requiresWeight
    type: boolean
    nullable: false
    description: Indicates whether the weight must be specified when using this packaging.

  - name: packaging[].requiresDimensions
    type: boolean
    nullable: false
    description: Indicates whether the dimensions must be specified when using this packaging.

  - name: deliveryConfirmations
    type: object[]
    nullable: false
    description: The types of package [delivery confirmations](./delivery-confirmation.md) offered for this service.

  - name: deliveryConfirmations[].id
    type: "[UUID](https://www.npmjs.com/package/uuid)"
    nullable: false
    description: A UUID that uniquely identifies this delivery confirmation. This is the UUID you used in the
      [Delivery Confirmation Definition](./delivery-confirmation.md) file for this delivery confirmation.

  - name: deliveryConfirmations[].identifiers
    type: object
    nullable: false
    description: Your own identifiers for this delivery confirmation.

  - name: deliveryConfirmations[].name
    type: string
    nullable: false
    description: The user-friendly name for this delivery confirmation (e.g. "Adult Signature", "Authority to Leave").
      This string must be between `1` and `100` characters and must not contain newline characters.

  - name: deliveryConfirmations[].description
    type: string
    nullable: false
    description: A short, user-friendly description of the delivery confirmation type.
      This string must be between `0` and `1000` characters and must not contain newline characters.

  - name: deliveryConfirmations[].type
    type: string
    nullable: false
    required: true
    description: |
      The type of confirmation for this delivery confirmation. Valid values include the following:
      * `delivery` - Package is dropped off at the destination address.
      * `signature` - A person at the destination address signs for the package.
      * `adult_signer` - A person over 18 at the destination address signs for the package.
      * `direct_signature` - The person named as the recipient signs for the package.

      This array will contain at least one value.

  - name: manifestType
    type: string
    nullable: true
    description: |
      Indicates whether the service supports digital or physical manifests. Valid values include the following:
      *  `Physical` - This service will require physical documents even if the carrier default is digital transmission.
      *  `Digital` - This service will *not* require physical documents even if the carrier default is for physical documents.

returnFields:
  - name: id
    type: UUID
    required: true
    description: UUID that uniquely identifies the delivery service. This ID should never change.

  - name: identifiers
    type: object
    nullable: false
    description: Your own identifiers for this delivery service.

  - name: code
    type: string
    nullable: false
    description: Optional code used to map to what the carrier uses to identify the delivery service. 
---

{{ title }}
====================

{{ documentation }}

## Delivery Service Argument

This table specifies the properties that may be `null` when a `Delivery Service` object is passed as an argument
to a ShipEngine Connect Carrier App. 

For example, the `shipment` argument passed to the [createShipment method](./methods/create-shipment.md) 
includes a `deliveryService` property that corresponds to this object. 
  

{% from "nunjucks/imports/reference.njk" import parametersTable %}

{{parametersTable(fields)}}

## Delivery Service Return Value

This table specifies the properties that are required when a delivery service object is returned from a method.

In the case of a return value, only the minimum properties needed for ShipEngine Connect to look up the delivery confirmation 
are required. You may provide an object matching the specification below. You may also simply provide the `code` as a string
rather than providing this option.

{% from "nunjucks/imports/reference.njk" import referenceTable %}

{{referenceTable(returnFields)}}
 

