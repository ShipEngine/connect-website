# Paperless Labels

## Overview

A "paperless label" is an alternative to printing out a label from a carrier
that you affix to a package. It is a digital code or image that can be presented
to a package courier as a record of the shipping transaction. It most often
takes the form of a QR code.

## How to

### ServiceAttribute

To indicate that a carrier service supports paperless labels, add the `PaperlessLabel`
code to the `ServiceAttributes` section of the shipping service definition.

Example:

```typescript
export const NextDayAir: ShippingService = {
  Id: "a0000000-aaaa-4fef-9121-19aab729eeb2",
  Name: "Next Day Air",
  Abbreviation: "NDA",
  Code: "nda_01",
  ServiceAttributes: [ServiceAttributesEnum.PaperlessLabel]
  ...
```

### CreateLabel input

A request for a paperless label will be indicated by the `paperless_label` value
passed in the `display_scheme` attribute on the input to the `CreateLabel` function.
Note that `display_scheme` is an array, and the request may ask for a `label`
and `paperless_label`. You are expected to return all requested documents in
the `documents` array of the function output.

```json
{
    "service_code": "example_service",
    "ship_from": {
        ...
    },
    "display_schemes": [
        "label",
        "paperless_label"
    ],
```

### CreateLabel output

The output of the `CreateLabel` function should contain a `Document` for
each of the requested `display_schemes`.

```typescript
return {
  tracking_number,
  trackable: true,
  documents: [
    {
      type: DocumentType.PaperlessLabel,
      format: DocumentFormat.Png,
      data: "<base64 image data>"
    }
  ]
}
```
