---
hidden: true
title: v0.0.34 Change Log
name: v0.0.34 Change Log

description: Log of changes between v0.0.33 and v0.0.34.

documentation: |
  This page describes the changes that occurred between releases `v0.0.33` and `v0.0.34`.
---

# Change Log v0.0.33 -> v0.0.34

## Overall Changes
* HTML label format is no longer supported
* Removed geo-coordinates from all Address properties
* Removed support for Localization
* Updated [CLI](./../cli.md) namespace. You should uninstall the old one before the latest version.
* [CLI](./../cli.md) commands are no longer prefaced with `apps:`. The documentation has been updated.
```npm uninstall @shipengine/cli -g
npm install @shipengine/integration-platform-cli -g
```
* The `shipengine test` command has changed. We are in the process of updating the documentation for this.



## Carrier App
These changes affect the [Carrier App](./../carrier-app/index.md).

### [Carrier App Definition](./../reference/carrier.md)
* Added an `icon` property similar to the logo property.
* Added a `manifestType` property.

### [createShipment()](./../reference/methods/create-shipment.md) Method
#### Parameter: `NewShipment`

#### Removed properties:
     * `outboundShipment`
     * `packages.contents.quantity.unit`

#### Added properties:
    * `deliveryService.supportsReturns`

#### Changes:
    * `packages.customs.contents.unitValue.value` -  now a number rather than a string
    * `packages.customs.contents.unitValue.currency` - now accepts any string rather than an enum value
    * `packages.customs.contents.totalValue.value` - now a number rather than a string
    * `packages.customs.contents.totalValue.currency` - now accepts any string rather than an enum value
    * `packages.contents.unitPrice.value` - now a number rather than a string
    * `packages.contents.unitPrice.currency` - now accepts any string rather than an enum value
    * `packages.contents.totalPrice.value` - now a number rather than a string
    * `packages.contents.totalPrice.currency` - now accepts any string rather than an enum value


#### Return Value: `ShipmentConfirmation`

#### Removed properties:
    * `deliveryWindow`
    * `fulfillmentService`
    * `zone`
    * `isGuarnteed`
    * `isNegotiatedRate`
    * `minimumDeliveryDays`
    * `maximumDeliveryDays`
    * `metadata`
    * `trackingURL`
    * `packages.trackingURL`
    * `packages.documents`
    * `packages.label`
    * `packages.customForm`
    * `billing`
    * `charges.code`
    * `charges.description`
    * `charges.notes`
    * `packages.customs.contents.unitValue.unit`
    * `packages.customs.contents.totalValue.unit`

#### Added properties: (moved from the packages property up a level)
    * `documents`
    * `label`
    * `customsForm`

#### Changes:
    * `packages.insuredValue.value` - now a number rather than a string
    * `packages.insuredValue.currency` - now accepts any string rather than an enum value
    * `charges.amount.value` - now accepts a number rather than a string
    * `charges.amount.value.currency` - now accepts any string rather than an enum value

###  [rateShipment()](./../reference/methods/rate-shipment.md) Method

#### Parameter: `RateCriteria`

#### Removed properties:
    * `outboundShipment`
    * `deliveryWindow`
    * `fulfillmentService`
    * `zone`
    * `isGuaranteed`
    * `minimumDeliveryDays`
    * `maximumDeliveryDays`

#### Added properties:
    * `deliveryService.supportsReturns`
    * `deliveryService.manifestType`

#### Changes:
    * Renamed `deliveryServices` to `deliveryService` and changed it from an array to a single object
    * Renamed `fulfillmentServices` to `fulfillmentService` and changed it from an array to a single object
    * `totalInsuredValue.value` - now a number rather than a string
    * `totalInsuredValue.currency` - now accepts any string rather than an enum value

#### Return Value: `Rate`

#### Removed properties:
    * `charges.code`
    * `charges.description`
    * `charges.notes`

#### Added properties:
    * `deliveryService.supportsReturns`
    * `deliveryService.manifestType`

#### Changes:
    * `charges.amount.value` - now accepts a number rather than a string
    * `charges.amount.value.currency` - now accepts any string rather than an enum value
    * `deliveryService` now acceptes an object or a string containing the `code`.

### [trackShipment()](./../reference/methods/track-shipment.md)


### Return Value: `TrackingInfo`

#### Added properties:
    * `packages[].packaging.deliveryService.supportsReturns`
    * `packages[].packaging.deliveryService.manifestType`

#### Changes:
    * `packages[].packaging` now acceptes an object or a string containing the `code`.

### [schedulePickup()](./../reference/methods/schedule-pickup.md)

#### Parameter: `PickupRequest`

#### Added properties:
    * `pickupService.shipments[].deliveryService.supportsReturns`
    * `pickupService.shipments[].deliveryService.manifestType`

#### Removed properties:
    * `contact.phoneExtension`

#### Return Value: `PickupConfirmation`

#### Removed properties:
    * `charges.code`
    * `charges.description`
    * `charges.notes`

#### Changes:
    * `charges.amount.value` - now accepts a number rather than a string
    * `charges.amount.value.currency` - now accepts any string rather than an enum value

### [cancelPickup()](./../reference/methods/cancel-pickups.md)

#### Parameter: `PickupCancellation`

#### Added properties:
    * `shipments[].deliveryService.supportsReturns`
    * `shipments[].deliveryService.manifestType`

#### Removed properties:
    * `contact.phoneExtension`

### Definition Changes
[Delivery Service](./../reference/delivery-service.md)
    *  Added `supportsReturns` property.
    *  Added  `manifestType` property.
    *  Added `code` property.

[Pickup Service](./../reference/pickup-service.md)
  * Added `code` property.

[Packaging](./../reference/packaging.md)
  * Added `code` property.

[Delivery Confirmation](./../reference/delivery-confirmation.md)
  * Added `code` property.

## Order  App
These changes affect the [Order App](./../order-app/index.md).

### [Order App Definition](./../reference/order.md)
Added an icon property similar to the logo property.

### [getSalesOrdersByDate()](./../reference/methods/get-sales-orders-by-date.md)

#### Parameter: `SalesOrderTimeRange`
#### Added properties:
    * `paging`
    * `paging.pageSize`
    * `paging.pageNumber`
    * `paging.pageCount`
    * `paging.cursor`

#### Return Value: `SalesOrderArray` (Previously returned `<Iterable>SalesOrder`)
#### Removed properties:
    * `fulfillmentStatus`
    * `paymentStatus`
    * `seller`
    * `charges.code`
    * `charges.description`
    * `charges.notes`
    * `totalCharges.code`
    * `totalCharges.description`
    * `totalCharges.notes`
    * `buyer.identifiers`
    * `buyer.phoneExtension`
    * `items.quantity.unit`

#### Added properties:
    * `paging`
    * `paging.pageSize`
    * `paging.pageNumber`
    * `paging.pageCount`
    * `paging.cursor`
    * `buyer.address` (optional)

#### Changes:
    * `charges.amount.value` - now accepts a number rather than a string
    * `charges.amount.value.currency` - now accepts any string rather than an enum value
    * `totalCharges.amount.value` - now accepts a number rather than a string
    * `totalCharges.amount.value.currency` - now accepts any string rather than an enum value
    * `shippingPreferences.insuredValue.value` - now accepts a number rather than a string
    * `shippingPreferences.insuredValue.currency` - now accepts any string rather than an enum value


### [shipmentCreated()](./../reference/methods/shipment-created.md)
#### Parameter: `SalesOrderShipment`
#### Removed properties:
    * `deliveryDateTime`
    * `minimumDeliveryDays`
    * `maximumDeliveryDays`
    * `deliveryWindow`
    * `packages`
    * `items.fulfillmentStatus`
    * `items.trackingURL`
    * `items.shippingPreferences`
    * `items.charges`
    * `items.totalAmount`
    * `items.totalCharges`

#### Added properties:
    * `contents` (moved from packages up a level)
    * `contents.salesOrder`
    * `contents.salesOrder.id`
    * `contents.salesOrder.identifiers`
    * `contents.salesOrderItem`
    * `contents.salesOrderItem.id`
    * `contents.salesOrderItem.sku`
    * `contents.salesOrderItem.identifiers`
    * `contents.product`
    * `contents.product.id`
    * `contents.product.sku`
    * `contents.product.identifiers`
    * `contents.quantity`
    * `contents.quantity.value`
    * `items.thumbnailURL`

#### Changes:
    * `items.product` is now required
    * `fulfillmentStatus` now accepts a string instead of an enum

### [shipmentCancelled()](./../reference/methods/shipment-cancelled.md)
#### Parameter: `SalesOrderShipment`
#### Removed properties:
    * `deliveryDateTime`
    * `minimumDeliveryDays`
    * `maximumDeliveryDays`
    * `deliveryWindow`
    * `packages`
    * `items.fulfillmentStatus`
    * `items.trackingURL`
    * `items.shippingPreferences`
    * `items.charges`
    * `items.totalAmount`
    * `items.totalCharges`
#### Added properties:
    * `contents` (moved from packages up a level)
    * `contents.salesOrder`
    * `contents.salesOrder.id`
    * `contents.salesOrder.identifiers`
    * `contents.salesOrderItem`
    * `contents.salesOrderItem.id`
    * `contents.salesOrderItem.sku`
    * `contents.salesOrderItem.identifiers`
    * `contents.product`
    * `contents.product.id`
    * `contents.product.sku`
    * `contents.product.identifiers`
    * `contents.quantity`
    * `contents.quantity.value`
    * `items.thumbnailURL`

#### Changes:
    * `items.product` is now required
    * `fulfillmentStatus` now accepts a string instead of an enum

### getSalesOrder() Method
No longer supported.

### getSeller() Method
No longer supported.


