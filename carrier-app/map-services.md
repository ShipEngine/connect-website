---
title: Map Your Services
description: Learn how to map your services to the ShipEngine Integration Platform Data model
---

Mapping Your Services
====================
The way your app models certain services may not always match up perfectly with the ShipEngine Integration Platform's data contracts. It will be your app method's job to transform your carrier's data into the format that the Integration Platform expects.

Example
-------
A simple example would be the [Create Shipment Confirmation](../reference/methods/create-shipment.md#return-value) that is returned in the [Create Shipment Method](../reference/methods/create-shipment.md).

You can return an optional `trackingNumber` in your response to the Integration Platform request. However, your carrier may use different property names or have the information nested inside of another object. Part of the method's logic will be consolidating the data into the expected return object.


Sample Applications
-------------------
You can also look at the [ShipEngine Integration Platform Sample Apps repository](https://github.com/ShipEngine/shipengine-integration-platform-sample-apps) to see other examples of what this might look like.

For example, the [rate-shipment.js](https://github.com/ShipEngine/shipengine-integration-platform-sample-apps/blob/master/freightco/rate-shipment.js) has a `formatRate()` function that takes a carrier's rate and transforms the data to fit the [rate shipment return value](../reference/methods/rate-shipment.md#return-value).