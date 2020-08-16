---
hidden: true
title: Carrier Application Definition
name: Carrier Application Definition
identifier: Carrier Application

description:
  The page describes how to define a carrier service.

documentation: |
  The Carrier Application Definition file pulls all the other definitions and implementations together to tell the [ShipEngine Connect](./../index.md) how your
  carrier application is structured. This file can reside anywhere within your application as long as its location is specified
  in the `main` property of your `package.json` file.
  The definition may be specified in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [TypeScript](https://www.typescriptlang.org/), [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), or
  [YAML](https://en.wikipedia.org/wiki/YAML).

param:
  fields:
     - name: id
       type: UUID
       required: true
       description: A UUID that uniquely identifies the application for internal ShipEngine Connect purposes. This ID should never change.

     - name: name
       type: string
       required: true
       description: The user-friendly name for this Carrier application.

     - name: description
       type: string
       required: false
       description: A short, user-friendly description of this Carrier application.

     - name: websiteURL
       type: string
       required: true
       description: The URL of the carrier's website.

     - name: logo
       type: string
       required: true
       description: The file path to the Carrier's logo image.

     - name: icon
       type: string
       required: true
       description: The file path to the Carrier's icon image.

     - name: trackingURLTemplate
       type: string
       required: true
       description: Tracking URL format for the carrier. It must be a valid URL that contains curly braces (`{ }`) where
         the tracking number will be inserted. For example, `http://www.parcel-post.com/tracking/{}`.

     - name: connectionForm
       type: "[Form](./forms.md)"
       required: true
       description: A form that allows the user to connect to the service. This form will usually prompt for an account number and login credentials.

     - name: settingsForm
       type: "[Form](./forms.md)"
       required: true
       description: A form that allows the user update their connection settings, such as when a password is changed.

     - name: manifestLocations
       type: string
       required: false
       description: |
         Indicates which locations are included in end-of-day manifests. This field is required if the
         [`createManifest`](./methods/create-manifest.md) method is implemented.
         Valid values include the following.
         * `all_locations` - The manifest includes all warehouse locations.
         * `single_location` - The manifest includes only the specified warehouse location.

     - name: manifestShipments
       type: string
       required: false
       description: |
         Indicates which shipments are included in end-of-day manifests. This field is required if the
          [`createManifest`](./methods/create-manifest.md) method is implemented.
         Valid values include the following.
         * `all_shipments` - All shipments for the current date will be included in the manifest.
         * `explicit_shipments` - Only the explicitly selected shipments for the current date will be included in the manifest.
         * `exclude_shipments` - All shipments for the current date except for those explicitly excluded will be included in the manifest.

     - name: manifestType
       type: string
       required: false
       description: |
         Indicates the type of manifesting supported by the carrier. Valid values include the following:
         * `Physical` - Use this value if the carrier supports physical manifests, even if some of the delivery services only support digital manifests.
         * `Digital` - Use this value if the carrier supports digital manifests, even if some of the delivery services only support phyiscal manifests.

     - name: deliveryServices
       type: object[] *or*  string[]
       required: true
       description: The delivery services that are offered by the carrier. These services
         can be defined directly inline inside this file or you may specify the path to one or more [Delivery Service Definition](./delivery-service.md)
         files.

     - name: pickupServices
       type:  object[] *or* string[]
       required: true
       description: The pickup services that are offered for this carrier. These services can be
         defined directly inline insdie this file or you may specify the path to one or more [Pickup Service Definition](./pickup-service.md)
         files.

     - name: connect
       type: method *or* string
       required: false
       description: |
         A method that connects to an existing account using the data that was gathered in the
         [`connectionform`](./forms.md).
         Note that this function does not return a value but rather updates the
         [`transaction.session`](./transaction.md) property.
         You may define this method direcly inline inside of this file or you may specify the path to the file
         that exports your [`connect`](./methods/connect.md) method.

     - name: createShipment
       type: method *or* string
       required: false
       description: A method that creates a new shipment. You may define this method direcly inline inside
         of this file or you may specify the path to the file that exports your [`createShipment`](./methods/create-shipment.md)
          method.

     - name: cancelShipments
       type: method *or* string
       required: false
       description: |
         A method that cancels one or more shipments. You may define this method direcly inline inside
         of this file or you may specify the path to the file that exports your [`cancelShipments`](./methods/cancel-shipments.md)
          method. This property is required for carrier's who allow shipments to be cancelled.

     - name: rateShipment
       type: method *or* string
       required: false
       description: A method used to calculate shipping costs for a shipment, or multiple permutations
         of a shipment. You may define this method direcly inline inside
         of this file or you may specify the path to the file that exports your [`rateShipment`](./methods/rate-shipment.md)
          method.

     - name: trackShipment
       type: method *or* string
       required: false
       description: A method used to get tracking details for a shipment. You may define this method direcly inline inside
         of this file or you may specify the path to the file that exports your [`trackShipment`](./methods/track-shipment.md)
          method.

     - name: createManifest
       type: method *or* string
       required: false
       description: A method that creates an end-of-date manifest. You may define this method direcly inline inside
         of this file or you may specify the path to the file that exports your [`createManifest`](./methods/create-manifest.md)
          method.

     - name: schedulePickup
       type: method *or* string
       required: false
       description: A method used to schedule a package pickup at a particular time and place. You may define this method direcly inline inside
         of this file or you may specify the path to the file that exports your [`schedulePickup`](./methods/schedule-pickup.md)
          method.

     - name: cancelPickups
       type: method *or* string
       required: false
       description: A method used to cancel a previously scheduled package pickup. You may define this method direcly inline inside
         of this file or you may specify the path to the file that exports your [`cancelPickups`](./methods/cancel-pickups.md)
          method.
---
{% from "nunjucks/imports/reference.njk" import referenceTable %}

{{name}}
===============================================
{{documentation}}


###   {{ identifier }}
{{referenceTable(param.fields)}}

Examples
------------
```typescript
import { CarrierAppDefinition } from "@shipengine/connect-sdk";

const address:CarrierAppDefinition = {
  id: "8ea1989e-d504-433f-b031-b04d5d9ace94",
  name: "Cargo Incorporated",
  description: "Cargo Incorporated is the global leader in air cargo.",
  websiteURL: "https://cargo-inc.net",
  trackingURLTemplate: "https://cargo-inc.net/tracking/{}",
  logo: "./logo.svg",
  connectionForm: "src/connection-form.js",
  manifestType: "Digital",
  connect: "src/connect.ts",
  createShipment: "src/create-shipment.ts",
  rateShipment: "src/rate-shipment.ts",

  deliveryServices: [
    "delivery-services/economy-parcel.yaml",
    "delivery-services/ground-parcel.yaml",
    "delivery-services/overnight-parcel.yaml"
  ],
  pickupServices: [
    "pickup-services/one-time.yaml",
    "pickup-services/recurring.yaml",
    "pickup-services/drop-off.yaml"
  ]
}
```

```javascript
const address = {
  id: "8ea1989e-d504-433f-b031-b04d5d9ace94",
  name: "Cargo Incorporated",
  description: "Cargo Incorporated is the global leader in air cargo.",
  websiteURL: "https://cargo-inc.net",
  trackingURLTemplate: "https://cargo-inc.net/tracking/{}",
  logo: "./logo.svg",
  manifestType: "Digital",
  connectionForm: "src/connection-form.js",

  connect: "src/connect.js",
  createShipment: "src/create-shipment.js",
  rateShipment: "src/rate-shipment.js",

  deliveryServices: [
    "delivery-services/economy-parcel.yaml",
    "delivery-services/ground-parcel.yaml",
    "delivery-services/overnight-parcel.yaml"
  ],
  pickupServices: [
    "pickup-services/one-time.yaml",
    "pickup-services/recurring.yaml",
    "pickup-services/drop-off.yaml"
  ]
}
```

```yaml
id: 8ea1989e-d504-433f-b031-b04d5d9ace94

name: Cargo Incorporated

description:
  Cargo Incorporated is the global leader in air cargo.

websiteURL: https://cargo-inc.net

trackingURLTemplate: https://cargo-inc.net/tracking/{}

logo: ./logo.svg

manifestType: Digital

connectionForm: src/connection-form.js

connect: src/connect.js
createShipment: src/create-shipment.js
rateShipment: src/rate-shipment.js

deliveryServices:
  - delivery-services/economy-parcel.yaml
  - delivery-services/ground-parcel.yaml
  - delivery-services/overnight-parcel.yaml

pickupServices:
  - pickup-services/one-time.yaml
  - pickup-services/recurring.yaml
  - pickup-services/drop-off.yaml
```

```json
{
  "id": "8ea1989e-d504-433f-b031-b04d5d9ace94",
  "name": "Cargo Incorporated",
  "description": "Cargo Incorporated is the global leader in air cargo.",
  "websiteURL": "https://cargo-inc.net",
  "trackingURLTemplate": "https://cargo-inc.net/tracking/{}",
  "logo": "./logo.svg",
  "manifestType": "Digital",
  "connectionForm": "src/connection-form.js",
  "deliveryServices": [
    "delivery-services/economy-parcel.yaml",
    "delivery-services/ground-parcel.yaml",
    "delivery-services/overnight-parcel.yaml"
  ],
  "pickupServices": [
    "pickup-services/one-time.yaml",
    "pickup-services/recurring.yaml",
    "pickup-services/drop-off.yaml"
  ],
  "connect": "src/connect.js",
  "createShipment": "src/create-shipment.js",
  "rateShipment": "src/rate-shipment.js"
}
```
