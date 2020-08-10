---
hidden: true
title: Carrier App Tests
description: Carrier App Tests

createShipment:
  fields:
    - name: createShipment_domestic
      link: ./create-shipment-domestic.md
      description: Creates a domestic shipment.
    - name: createShipment_international
      link: ./create-shipment-international.md
      description: Creates an international shipment.
    - name: createShipment_insurance
      link: ./create-shipment-insurance.md
      description: Creates a domestic shipment with insurance.
    - name: createShipment_multipackage
      link: ./create-shipment-multipackage.md
      description: Creates a domestic shipment with multiple packages.
---

{{ title }}
==========================================
The following automated tests are available for the [Carrier App](./../reference/carrier.md).

## `createShipment()` Method
The following tests exercise the [`createShipment()`](./../reference/methods/create-shipment.md) method.
{% from "nunjucks/imports/reference.njk" import testSuiteDetails %}
{{testSuiteDetails(createShipment.fields)}}

