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

> *TIP*
> Click on the test name to view the parameters for the test.

## `createShipment()` Method
The following tests exercise the [`createShipment()`](./../reference/methods/create-shipment.md) method.
They may also call the [`connect()`](./../reference/methods/connect.md) method if you do not provide
a [`transaction`](./../reference/transaction.md) object in your `connect.config.js` file.
{% from "nunjucks/imports/reference.njk" import testSuiteDetails %}
{{testSuiteDetails(createShipment.fields)}}


## `cancelShipments` Method
The following tests exercise the [`cancelShipments()`](./../reference/methods/cancel-shipments.md) method. They will
also utilize the [`createShipment()`](./../reference/methods/create-shipment.md) method to create the shipment(s) that will
be cancelled in the test. They may also call the [`connect()`](./../reference/methods/connect.md) method if you do not provide
 a [`transaction`](./../reference/transaction.md) object in your `connect.config.js` file.

## `trackShipments()` Method
The following tests exercise the [`trackShipment()`](./../reference/methods/track-shipment.md) method. They will
also utilize the [`createShipment()`](./../reference/methods/create-shipment.md) method to create the shipment(s) that will
be tracked in the test. They may also call the [`connect()`](./../reference/methods/connect.md) method if you do not provide
a [`transaction`](./../reference/transaction.md) object in your `connect.config.js` file.

## `rateShipment()` Method
The following tests exercise the [`rateShipment()`](./../reference/methods/cancel-shipments.md) method.
They may also call the [`connect()`](./../reference/methods/connect.md) method if you do not provide
a [`transaction`](./../reference/transaction.md) object in your `connect.config.js` file.

## `createManifest()` Method
The following tests exercise the [`createManifest()`](./../reference/methods/create-manifest.md) method. They will
also utilize the [`createShipment()`](./../reference/methods/create-shipment.md) method to create the shipment(s) that will
be in the manifest in the test. They may also call the [`connect()`](./../reference/methods/connect.md) method if you do not provide
a [`transaction`](./../reference/transaction.md) object in your `connect.config.js` file.

## `schedulePickup()` Method
The following tests exercise the [`schedulePickup()`](./../reference/methods/schedule-pickup.md) method. They will
also utilize the [`createShipment()`](./../reference/methods/create-shipment.md) method to create the shipment(s) that will
be picked up in the test. They may also call the [`connect()`](./../reference/methods/connect.md) method if you do not provide
a [`transaction`](./../reference/transaction.md) object in your `connect.config.js` file.

## `cancelPickups()` Method
The following tests exercise the [`cancelPickup()`](./../reference/methods/cancel-pickups.md) method. They will
also utilize the [`createShipment()`](./../reference/methods/create-shipment.md) method to create shipment(s) and the
 [`schedulePickup()`](./../reference/methods/schedule-pickup.md) method to schedule the pickup that will
be cancelled in the test. They may also call the [`connect()`](./../reference/methods/connect.md) method if you do not provide
a [`transaction`](./../reference/transaction.md) object in your `connect.config.js` file.
