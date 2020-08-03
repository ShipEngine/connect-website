---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: getSalesOrder Method
name: getSalesOrder
description:
  This method returns detailed information about a sales order.

documentation: |
  This method returns detailed information about a sales order.

param:
  name: salesOrder
  type: SalesOrderIdentifier
  signature: getSalesOrder
  description: |
    An object that identifies a sales order.

  fields:
    - name: id
      type: string
      description: The marketplace's unique ID for the sales order. This string will be between `1` and `100` characters and will not contain newline characters.

    - name: identifiers
      type: object
      description: Your own identifiers for this sales order.

return:
  name: salesOrder
  type: SalesOrderPOJO
  signature: SalesOrderPOJO
  description: |
    An object that represents a sales order.
  fields:
    - name: id
      type: string
      required: true
      description: The marketplace's unique ID for the sales order. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: identifiers
      type: object
      required: false
      description: Your own identifiers for this sales order.

    - name: createdDateTime
      type: |
        [DateTime](./../date-time.md) or a string representation of a date in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
      required: true
      description: The date/time that the sales order was originally placed.

    - name: modifiedDateTime
      type: |
        [DateTime](./../date-time.md) or a string representation of a date in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
      required: false
      description: The date/time that the sales order was last updated. Defaults to the `createdDateTime`.

    - name: status
      type: string
      required: true
      description: |
        The current status of this sales order. Valid values include the following:
        * `awaiting_payment` - The sales order is awaiting payment.
        * `awaiting_shipment` - This sales order is awaiting shipment.
        * `on_hold` - This sales order is on hold.
        * `completed` - Thie sales order is completed.
        * `cancelled` - This sales order has been cancelled.

    - name: fulfillmentStatus
      type: string
      required: false
      description: |
        Indicates whether the order has been fulfilled. Valid values include the following:
        * `unfulfilled` - This sales order has not been fulfilled.
        * `partially_fulfilled` - This sales order has been partially fulfilled.
        * `on_hold` - This sales order is on hole.
        * `fulfilled` - This sales order has been fulfilled.
        * `cancelled` - This sales order is on hold.

    - name: paymentStatus
      type: string
      required: false
      description: |
        Indicates whether the customer has paid for the order. Valid values include the following:
        * `awaiting_payment` - This sales order is awaiting payment.
        * `in_process` - This payment for this sales order is being processed.
        * `paid` - This sales order has been paid for.
        * `failed` - The payment for this sales order failed.
        * `cancelled` - The payment for this sales order has been cancelled.

    - name: paymentMethod
      type: string
      required: false
      description: |
        Indicates how the customer has paid for the order. Valid values include the following:
        * `cash` - The sales order was paid for with cash.
        * `cash_equivalent` - The sales order was paid for with guaranteed funds, such as a cashier's check or money order.
        * `check` - This sales order was paid for with a check.
        * `credit_card` - This sales order was paid for with a credit card.
        * `bank_transfer` - This sales order was paid for with a bank transfer.

    - name: orderURL
      type: |
        [URL](https://nodejs.org/api/url.html) or string
      required: false
      description: The URL of a webpage where the customer can view the order.  Must be a valid HTTP or HTTPS url.

    - name: shipTo
      type: |
        [AddressWithContactInfo](./../address.md)
      required: true
      description: The buyer who bought the order. This is not necessarily the same person as the `shipTo`.
        Be sure to include the extra contact info fields as indicated in the reference doc.

    - name: seller
      type: object
      required: true
      description: Identifies the seller who sold the order.

    - name: seller.id
      type: string
      required: true
      description: The marketplace's unique ID for the seller. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: seller.identifiers
      type: object
      required: false
      description: Your own identifiers for this seller.

    - name: buyer
      type: object
      required: true
      description: The buyer who bought the order. This is not necessarily the same person as the `shipTo`.

    - name: buyer.id
      type: string
      required: true
      description: The marketplace's unique ID for the buyer. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: buyer.name
      type: string or object
      required: true
      description: The name of the buyer. This property can be set with a string or an object. The additional properties that must be included in
         the object are described below.

    - name: buyer.name.title
      type: string
      required: false
      description: The title of the buyer (eg "Mr", "Mrs", "Dr"). This string must be between `0` and `100` characters and must not include newline characters.

    - name: buyer.name.given
      type: string
      required: true
      description: The first name of the buyer. This string must be between `1` and `100` characters and must not include newline characters.

    - name: buyer.name.middle
      type: string
      required: false
      description: The middle name of the signer. This string must be between `0` and `100` characters and must not include newline characters.

    - name: buyer.name.family
      type: string
      required: false
      description: The last name or family name of the buyer. This string must be between `0` and `100` characters and must not include newline characters.

    - name: buyer.name.suffix
      type: string
      required: false
      description: The suffix of the buyer (eg "Sr", "Jr", "IV"). This string must be between `0` and `100` characters and must not include newline characters.

    - name: buyer.email
      type: string
      required: false
      description: The email address of the buyer. This string must be a valid email address.

    - name: buyer.phoneNumber
      type: string
      required: false
      description: The phone number of the buyer. This string must be between `0` and `30` characters and must not include newline characters.

    - name: buyer.address
      type: |
        [Address](./../address.md)
      required: false
      description: The buyer's address.

    - name: charges
      type: |
        [Charge](./../charge.md)[]
      required: false
      description: The breakdown of charges for this order item.

    - name: items
      type: object[]
      required: true
      description: The items in this sales order.

    - name: items[].id
      type: string
      required: true
      description: The marketplace's unique ID for the order item. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: items[].sku
      type: string
      required: false
      description: The [Stock Keeping Unit](https://en.wikipedia.org/wiki/Stock_keeping_unit). This string must be between `0` and `100` characters and must not contain newline characters.

    - name: items[].identifiers
      type: object
      required: false
      description: Your own identifiers for this item.

    - name: items[].name
      type: string
      required: true
      description: The user-friendly name of the item. This is often the same as the product name. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: items[].description
      type: string
      required: false
      description: A short description of the item. This is often the same as the product summary. This string must be between `0` and `100` characters and must not contain newline characters.

    - name: items[].fulfillmentStatus
      type: string
      required: false
      description: |
        Indicates whether the order item has been fulfilled. Valid values include the following:
        * `unfulfilled` - This sales order has not been fulfilled.
        * `partially_fulfilled` - This sales order has been partially fulfilled.
        * `on_hold` - This sales order is on hole.
        * `fulfilled` - This sales order has been fulfilled.
        * `cancelled` - This sales order is on hold.

    - name: items[].product
      type: object
      required: false
      description: The product associated with this item.

    - name: items[].product.id
      type: string
      required: true
      description: The product catalog's unique ID for the order. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: items[].product.sku
      type: string
      required: false
      description: The [Stock Keeping Unit](https://en.wikipedia.org/wiki/Stock_keeping_unit). This string must be between `0` and `100` characters and must not contain newline characters.

    - name: items[].product.identifers
      type: object
      required: false
      description: Your own identifers for this product.

    - name: items[].quantity
      type: object
      required: true
      description: The quantity of this item in the sales order.

    - name: items[].quantity.value
      type: number
      required: true
      description: The value of the quantity. (ie 3). The minimum value is `1`.

    - name: items[].unitPrice
      type: object
      description: The sale price of each item. This should NOT include additional charges or adjustments, such as taxes or discounts. Use `charges` for those.

    - name: items[].unitPrice.value
      type: number
      description: The amount of this value.

    - name: items[].unitPrice.currency
      type: string
      description: |
        The currency that the value represents.

    - name: items[].unitWeight
      type: object
      required: false
      description: The weight of each item.

    - name: items[].unitWeight.value
      type: number
      required: true
      description: The weight value for each item. This value must not contain decimals.

    - name: items[].unitWeight.unit
      type: string
      required: true
      description: |
        The unit of measure for this weight. Valid values include the following:
        * `g` - grams
        * `oz` - ounces
        * `kg` - kilograms
        * `lb` - pounds

    - name: items[].itemURL
      type: |
       [URL](https://nodejs.org/api/url.html) or string
      required: false
      description: The URL of a webpage where the customer can view the order item. Must be a valid HTTP or HTTPS url.

    - name: items[].trackingURL
      type: |
       [URL](https://nodejs.org/api/url.html) or string
      required: false
      description: The URL of a webpage where the customer can track the package. Must be a valid HTTP or HTTPS url.

    - name: items[].shippingPreferences
      type: |
        [ShippingPreference](./../shipping-preferences.md)[]
      required: false
      description: Preferences on how this item should be shipped.

    - name: items[].charges
      type: |
        [Charge](./../charge.md)
      required: false
      description: The breakdown of charges for this order item.

    - name: items[].notes
      type: string, </br>
        string[], </br>
        or object[]
      required: false
      description: Additional information about this sales order item. This may be a string, an array of strings, or an
        array of objects. The object properties are listed below.

    - name: items[].notes[].type
      type: |
        [NotesType](./../common-types.md#notes-types)
      required: false
      description: |
        The type for this note.

    - name: items[].notes[].text
      type: string
      required: false
      description: The note text itself. This string must be between `0` and `5000` characters.

    - name: items[].metadata
      type: object
      required: false
      description: Custom data about this order item that was persisted by the ShipEngine Integration Platform.
        Must be JSON serializable.

    - name: notes
      type: string, </br>
        string[], </br>
        or object[]
      required: false
      description: Additional information about this sales order item. This may be a string, an array of strings, or an
        array of objects. The object properties are listed below.

    - name: notes[].type
      type: |
        [NotesType](./../common-types.md#notes-types)
      required: false
      description: |
        The type for this note.

    - name: notes[].text
      type: string
      required: false
      description: The note text itself. This string must be between `0` and `5000` characters.

    - name: metadata
      type: object
      required: false
      description: Custom data about this order item that was persisted by the ShipEngine Integration Platform.
        Must be JSON serializable.
---
Examples
------------------------
```javascript
async function getSalesOrder(transaction, salesOrder){

  // STEP 1: Validation
  // Add any desired validation here

  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "retrieve_sales_order",
    session_id: transaction.session.id,
    sales_order_id: salesOrder.id
  };

  // STEP 3: Call the order source's API
  const response = await apiClient.request({ data });

  // Step 4: Create the output data that ShipEngine expects
  return formatSalesOrder(response.data);
}

function formatSalesOrder(salesOrder) {

  return {
    id: salesOrder.id,
    createdDateTime: salesOrder.created_at,
    status: mapSalesOrderStatus(salesOrder.status),
    shipTo: {
      name: salesOrder.address.business_name,
      addressLines: salesOrder.address.lines,
      cityLocality: salesOrder.address.city,
      stateProvince: salesOrder.address.state,
      postalCode: salesOrder.address.postalCode,
      country: salesOrder.address.country,
    },
    paymentStatus: mapPaymentStatus(salesOrder.payment.status),
    paymentMethod: mapPaymentMethod(salesOrder.payment.method),
    seller: {
      id: salesOrder.seller_id,
    },
    buyer: {
      id: salesOrder.buyer.id,
      name: salesOrder.buyer.name
    },
    items: salesOrder.shipping_items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        quantity: {
          value: item.quantity,
          unit: "ea"
        },
        unitPrice: {
          value: item.price_per_unit,
          currency: "USD"
        }
      }
    }),
    charges: salesOrder.creditCardCharges.map((charges) => {
      return {
        type: "credit",
        amount: {
          value: charges.value,
          currency: "USD"
        }
      }
    })
  }
}
```
```typescript
export default async function getSalesOrder(
  transaction: Transaction<Session>,
  salesOrder: SalesOrderIdentifier,
): Promise<SalesOrderPOJO> {

  // STEP 1: Validation
  // Add any desired validation here

  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "retrieve_sales_order",
    session_id: transaction.session.id,
    sales_order_id: salesOrder.id
  };

  // STEP 3: Call the order source's API
  const response = await apiClient.request<RetrieveSalesOrderResponse>({ data });

  // Step 4: Create the output data that ShipEngine expects
  return formatSalesOrder(response.data);
}
```
