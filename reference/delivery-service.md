---
hidden: true
title: Delivery Service Definition
name: Delivery Service Definition
identifier: Delivery Service Properties

description:
  The page describes how to define a delivery service.

documentation: |
  A Delivery Service is a type of delivery that is offered by a carrier, such as "international" or "standard overnight". Each delivery service that is offered must be defined
  in its own delivery service definition file. This file can reside anywhere within your application as long as its location is specified in the [Carrier Application Definition](./carrier.md) file.
   The definition may be specified in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [TypeScript](https://www.typescriptlang.org/), [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), or
    [YAML](https://en.wikipedia.org/wiki/YAML).

  These delivery service definitions will be used by the [ShipEngine Integration Platform](./../index.md) to display delivery service options within our suite of e-commerce applications when your carrier is used.

param:
  fields:
     - name: id
       type: UUID
       required: true
       description: UUID that uniquely identifies the delivery service. This ID should never change.

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
       required: false
       description: A well-known [fulfillment service](./fulfillment-service.md) that's used to fulfill this delivery service, such as "fedex_ground".

     - name: serviceArea
       type: string
       required: false
       description: |
         The service area this delivery service covers. Valid values include the following:
         * `regional` - Delivery based on the shipment's distance to its destination. Rates typically vary by zone.
         * `domestic` - Delivery with an origin address and a destination address within the same country.
         * `international` - Delivery with an origin address and a destination address in different countries.
         * `global`

     - name: isConsolidationService
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
       description: Indicates whether the carrier provides a sandbox/development API for this delivery service. A sandbox should mimic real functionality as much as possible but MUST NOT incur any actual costs or affect production data.

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
       type: string[]
       required: true
       description: |
         The list of [ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) for the
         [countries](./country-codes.md) that can be shipped _from_ using this delivery service.

     - name: destinationCountries
       type: string[]
       required: true
       description: |
          The list of [ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) for the
                  [countries](./country-codes.md)  that can be shipped _to_ using this deliveyr service. Valid values include the following:

     - name: packaging
       type: string[]
       required: true
       description: The types of packaging that are offered for this delivery service. This property should contain the
         paths to the packaging definition files for the packaging types that are valid for this delivery confirmation type.

     - name: deliveryConfirmation
       type: |
         [Delivery Confirmation](./delivery-confirmation.md)[] or string[]
       required: true
       description: The types of [delivery confirmations](./delivery-confirmation.md) offered for this delivery service. This property may define
         the delivery confirmations directly inline, following the [delivery confirmation](./delivery-confirmation.md) format.
         It may also contain a list of paths to files that define the delivery confirmations available. Defining your delivery
         confirmations inside definition files allows you to reference those delivery confirmation definitions in multiple delivery service
         definition files.
---


  {% from "nunjucks/imports/reference.njk" import referenceTable %}

  {{name}}
  ===============================================
  {{documentation}}


  ###   {{ identifier }}
  {{referenceTable(param.fields)}}


  Examples
  -----------------------------------------------

```yaml
id: 43fc9d24-6a89-428a-ad34-c614c14170b6
identifiers:
  apiCode: ECO
name: International Economy
description: Worldwide delivery at an affordable price
class: ground
grade: economy
serviceArea: global
isConsolidationService: true
isTrackable: false
isInsurable: true

labelFormats:
  - pdf

labelSizes:
  - A4
  - letter

originCountries: worldwide.yaml
destinationCountries: worldwide.yaml

packaging:
  - ../packaging/package.yaml
  - ../packaging/pallet.yaml

deliveryConfirmations:
  - ../delivery-confirmations/signature-required.yaml
  - ../delivery-confirmations/adult-signature.yaml
  - ../delivery-confirmations/recipient-signature.yaml
```

```javascript
{
    id: "43fc9d24-6a89-428a-ad34-c614c14170b6",
    identifiers: {
        apiCode: "ECO"
    },
    name: "International Economy",
    description: "Worldwide delivery at an affordable price",
    class: "ground",
    grade: "economy",
    serviceArea: "global",
    isConsolidationService: true,
    isTrackable: false,
    isInsurable: true,
    labelFormats:[
        "pdf"
    ],
    labelSizes: [
        "A4",
        "letter"
    ],
    originCountries: "worldwide.yaml",
    destinationCountries: "worldwide.yaml",
    packaging: [
        "../packaging/package.yaml",
        "../packaging/pallet.yaml"
    ],
    deliveryConfirmations: [
         "../delivery-confirmations/signature-required.yaml",
         "../delivery-confirmations/adult-signature.yaml",
         "../delivery-confirmations/recipient-signature.yaml"
    ]
}
```

```typescript
import {
  Country,
  DeliveryServiceClass,
  DeliveryServiceDefinition,
  DeliveryServiceGrade,
  DocumentFormat,
  DocumentSize,
  ServiceArea,
} from "@shipengine/integration-platform-sdk";

const internationalEconomyDeliveryService: DeliveryServiceDefinition = {
  id: "43fc9d24-6a89-428a-ad34-c614c14170b6",
  name: "International Economy",
  description:
    "Worldwide delivery at an affordable price",
  class: DeliveryServiceClass.OneDay,
  deliveryConfirmations: [import("./signature-delivery-confirmation")],
  destinationCountries: [Country.UnitedStates],
  grade: DeliveryServiceGrade.Expedited,
  isInsurable: true,
  isTrackable: false,
  labelFormats: [DocumentFormat.PDF, DocumentFormat.PNG],
  labelSizes: [DocumentSize.Letter, DocumentSize.Inches4x6],
  originCountries: [Country.UnitedStates],
  packaging: [import("./package-packaging")],
  serviceArea: ServiceArea.Domestic,
};

export default internationalEconomyDeliveryService;

```

```json
{
  "id": "43fc9d24-6a89-428a-ad34-c614c14170b6",
  "name": "International Economy",
  "description": "Worldwide delivery at an affordable price",
  "class": "ground",
  "deliveryConfirmations": ["./signature-delivery-confirmation.json"],
  "grade": "standard",
  "isInsurable": true,
  "isTrackable": false,
  "labelFormats": ["pdf"],
  "labelSizes": ["4x8"],
  "originCountries": ["US", "CA", "MX"],
  "destinationCountries": ["US", "CA", "MX"],
  "packaging": ["./package-packaging.json"],
  "serviceArea": "international"
}

```



