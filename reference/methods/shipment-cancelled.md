---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: shipmentCancelled Method
name: shipmentCancelled
description:
  This method is called when a shipment is cancelled for one or more items in one or more sales orders.

documentation: |
  This method is called when a shipment is cancelled for one or more items in one or more sales orders.
  A single shipment may contain items from multiple sales orders, and a single sales order
  may be fulfilled by multiple shipments.

param:
  name: shipment
  type: SalesOrderShipment
  signature: shipmentCreated
  description: |
    The shipment that was cancelled.
  fields:
    - name: trackingNumber
      type: string
      nullable: false
      description: The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number.
        For multi-piece shipments, this may be a separate tracking number, or the same
        tracking number as one of the packages. This string will be between `0` and `100` characters and will not contain newline characters.

    - name: identifiers
      type: object
      nullable: false
      description: Your own identifiers for this shipment.
      
    - name: trackingURL
      type: |
      
        [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)
      nullable: true
      description: The URL of a webpage where the customer can track the shipment.
      
    - name: salesOrder
      type: object
      nullable: false
      description: The sales order associated with this shipment.
      
    - name: salesOrder.id
      type: "[UUID](https://www.npmjs.com/package/uuid)"
      nullable: false
      description: The marketplace's unique ID for the sales order.
      
    - name: salesOrder.identifiers
      type: object
      nullable: false
      description: Your own identifiers for this sales order.

    - name: fulfillmentService
      type: string
      nullable: true
      description: If the shipment is being fulfilled using a well-known third-party carrier, such as UPS, FedEx, DHL, etc., then this field specifies the carrier service.

    - name: shipFrom
      type: |
        [AddressWithContactInfo](./../address.md)
      nullable: true
      description: The sender's contact info and address.
      
    - name: shipTo
      type: "[AddressWithContactInfo](./../address.md)"
      nullable: false
      description: The recipient's contact info and address.

    - name: shipDateTime
      type: |
        [DateTime](./../date-time.md)
      nullable: false
      description: The date/time that the shipment was shipped or is expected to ship. This is not guaranteed to be in the future.    

    - name: contents
      type: object[]
      description:  The items inside the package.

    - name: contents[].salesOrderItem
      type: object
      nullable: true
      description:  The sales order associated with this item.
      
    - name: contents[].salesOrderItem.id
      type: string
      nullable: false
      description: The marketplace's unique ID for the sales order item.
    
    
    - name: contents[].salesOrderItem.sku
      type: string
      nullable: false
      description: The [Stock Keeping Unit](https://en.wikipedia.org/wiki/Stock_keeping_unit). This string must be between `0` and `100` characters and must not contain newline characters.
    
    
    - name: contents[].salesOrderItem.identifiers
      type: object
      nullable: false
      description: Your own identifiers for this sales order item. 

    - name: contents[].product
      type: object
      nullable: false
      description: The product associated with this item.

    - name: contents[].product.id
      type: string
      nullable: false
      description: The product catalog's unique ID for the order. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: contents[].product.sku
      type: string
      nullable: false
      description: The [Stock Keeping Unit](https://en.wikipedia.org/wiki/Stock_keeping_unit). This string must be between `0` and `100` characters and must not contain newline characters.
      
    - name: contents[].product.upc
      type: string
      nullable: false
      description: |
      
        The [Universal Product Code](https://en.wikipedia.org/wiki/Universal_Product_Code) for this item. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: contents[].product.isbn
      type: string
      nullable: false
      description: |
      
        The [International Standard Book Number](https://www.isbn-international.org/) for this item. This string must be between `0` and `100` characters and must not contain newline characters.
    
    - name: contents[].product.asin
      type: string
      nullable: false 
      description: |
      
        The [Amazon Standard Identification Number](https://www.amazon.com/gp/seller/asin-upc-isbn-info.html) for this item. This string must be between `0` and `100` characters and must not contain newline characters.
        
    - name: contentes[].product.fulfillmentSku
      type: string
      nullable: false
      description: |
      
        The [Stock Keeping Unit](https://en.wikipedia.org/wiki/Stock_keeping_unit) related to the fulfillment of this item. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: contents[].product.inventoryID
      type: string
      nullable: false
      description: The inventory ID for this item. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: contents[].product.identifiers
      type: object
      nullable: false
      description: Your own identifiers for this product.  

return:
  name: void
  type: void
  signature: void
  description: |
    This method is used to notify your application when a shipment is cancelled. It does not return a value.
---
Examples
---------------------------

```javascript
async function shipmentCancelled(transaction, shipment) {
  // STEP 1: Validation
  // Add any desired validation here

  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "cancel_shipment",
    session_id: transaction.session.id,
    cancelled_shipment_id: shipment.trackingNumber
  };

  // STEP 3: Call the order source's API
  await apiClient.request({ data });
}

```
```typescript
export default async function shipmentCancelled(
  transaction: Transaction<Session>,
  shipment: SalesOrderShipment,
): Promise<void> {
  // STEP 1: Validation
  // Add any desired validation here

  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "cancel_shipment",
    session_id: transaction.session.id,
    cancelled_shipment_id: shipment.trackingNumber
  };

  // STEP 3: Call the order source's API
  await apiClient.request({ data });
}

```
