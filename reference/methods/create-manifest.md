---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: createManifest Method
name: createManifest

description:
  This method creates an end-of-day manifest.

documentation: |
  This method creates an end-of-day manifest and should be implemented by carrier apps that support end-of-day manifesting.

param:
  name: manifest
  type: NewManifest
  signature: createManifest
  description: |
    An object containing information needed to create a new end-of-day manifest.

  fields:
    - name: shipFrom
      type: "[Address](./../address.md)"
      description: The address of the location that is performing end-of-day manifesting. This field is required if the carrier's `manifestLocations` setting is `single_location` in the [Carrier Definition](./../carrier.md) file.

    - name: openDateTime
      type: |
        [DateTime](./../date-time.md)
      description: The start-of-day time, or the `manifestDateTime` of the earliest manifest being manifested.

    - name: closeDateTime
      type: |
        [DateTime](./../date-time.md)
      description: The end-of-day time, or the `manifestDateTime` of the latest manifest being manifested.

    - name: shipments
      type: object[]
      description: |
        This shipments in the manifest.
        The meaning of this field varies depending on the carrier's `manifestShipments` setting.
           * `all_shipments` - This field must include all shipments that have not yet been manifested.
           * `explicit_shipments` - This field specifies which shipments should be manifested.
           * `exclude_shipments` - This field specifies which shipments should _not_ be manifested.
           All other shipments will be manifested.

    - name: shipments[].trackingNumber
      type: string
      description: |
        The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
        This string will be between `0` and `100` characters and will not contain newline characters.

    - name: shipments[].identifiers
      type: object
      description: Your own identifiers for this shipment.



return:
  name: manifestConfirmation
  type: ManifestConfirmationPOJO
  signature: manifestConfirmationPOJO
  description: |
    An object that contains confirmation that an end-of-day manifest has been created.
  fields:
    - name: manifests
      type: object[]
      required: true
      description: An object containing information about this manifest, including the shipments that are included. If not specified, the assumption is that the manifest includes all of the shipments.

    - name: manifests[].id
      type: string
      required: false
      description: The carrier's manifest ID, if any. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: manifests[].identifiers
      type: object
      required: false
      description: Your own identifers for this manifest.

    - name: manifests[].shipments
      type: object[]
      required: true
      description: The shipments that are included in this manifest.

    - name: manifests[].shipments[].trackingNumber
      type: string
      required: false
      description: The master tracking number for the entire outbound shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages.
         This string must be between `0` and `100` characters and must not contain newline characters.

    - name: manifests[].shipments[].identifiers
      type: object
      required: false
      description: Your own identifers for this shipment.

    - name: manifests[].document
      type: object
      required: false
      description: The digital manifest document, such as a PDF SCAN form.

    - name: manifests[].document.name
      type: string
      required: false
      description: The user-friendly name of the document (e.g. "Label", "Customs Form"). This string must be between `0` and `100` characters and must not contain newline characters.

    - name: manifests[].document.type
      type: string
      required: false
      description: |
        The type of document (e.g. label, customs form, SCAN form). Valid values include the following:
        * `label` - label
        * `customs_form` - customs form
        * `scan_form` - SCAN form

    - name: manifests[].document.size
      type: string
      required: true
      description: |
        The size of document (e.g. label, customs form, SCAN form). Valid values include the following:
        * `A4`- A4 sized paper ( 8.27 inches x 11.69 inches)
        * `letter` - Letter sized paper (8.5 inches by 11 inches)
        * `4x6` - Paper sized 4 inches by 6 inches
        * `4x8` - Paper sized 4 inches by 8 inches

    - name: manifests[].document.format
      type: string
      required: true
      description: |
        The file format of the document. Valid values include the following:
        * `pdf` - Portable Document Format (PDF)
        * `zpl` - Zebra Printer Label (ZPL)
        * `png` - Portable Graphics Format (PNG)

    - name: manifests[].document.data
      type: |
        [Buffer](https://nodejs.org/api/buffer.html)
      required: true
      description: The document data, in the specified file format.

    - name: manifests[].notes
      type: string, </br>
        string[], </br>
        or object[]
      required: false
      description: Human-readable information regarding this manifest.

    - name: manifests[].notes[].type
      type: |
        [NotesType](./../common-types.md#notes-types)
      required: false
      description: |
        The type for this note.

    - name: manifests[].notes[].text
      type: string
      required: false
      description: The note text itself. This string must be between `0` and `5000` characters.

    - name: manifests[].metadata
      type: object
      required: false
      description: Your custom data about this manifest that will be persisted by the ShipEngine Integration Platform. Must be JSON serializable.

    - name: notManifested
      type: object[]
      required: true
      description: An array of the shipments that could not be manifested, and the reason each shipment was not manifested.

    - name: notManifested[].code
      type: string
      required: true
      description: The carrier's error code. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: notManifested[].description
      type: string
      required: true
      description: The carrier's description of the error code. This description should not be specific to this particular shipment. This string must be between `0` and `1000` characters and must not contain newline characters.

    - name: notManifested[].notes
      type: string, </br>
        string[], </br>
        or object[]
      required: false
      description: Human-readable information regarding this manifest.

    - name: notManifested[].notes[].type
      type: |
        [NotesType](./../common-types.md#notes-types)
      required: false
      description: |
        Ththe type for this note.

    - name: notManifested[].notes[].text
      type: string
      required: false
      description: The note text itself. This string must be between `0` and `5000` characters.

---

Examples
-----------

```javascript
module.exports = async function createManifest(transaction, manifest) {
    // Your Carrier's code logic goes here
}
```

```typescript
import {
  Transaction,
  NewManifest,
  ManifestConfirmationPOJO
} from "@shipengine/integration-platform-sdk";

export default async function createManifest(
  transaction: Transaction, manifest: NewManifest): Promise<ManifestConfirmationPOJO[]> {
    // Your Carrier's code logic goes here
}
```


