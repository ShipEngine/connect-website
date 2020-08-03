---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: getSalesOrderByDate Method
name: getSalesOrderByDate
description:
  This method returns detailed information about sales orders, filtered by time range.

documentation: |
  This method returns detailed information about sales orders, filtered by time range.

param:
  name: range
  type: SalesOrderTimeRange
  signature: getSalesOrderByDate
  description: |
    Specifies a date/time range to retrieve sales orders for.

  fields:
    - name: startDateTime
      type: |
        [DateTime](./../date-time.md)
      description: The start date/time of the range.

    - name: endDateTime
      type: |
        [DateTime](./../date-time.md)
      description: The end date/time of the range.

    - name: toString
      type: method
      description: A method that returns the time range as a string.

    - name: includeChanges
      type: boolean
      description: Indicates whether orders that were modified during the date/time range should be returned.
        If `false` (the default), then only orders that were *created* during the date/time are returned.

    - name: paging
      type: object
      description: An object that indicates that page preferences for the items that are returned from this method.

    - name: paging.pageSize
      type: number
      description: The desired maximum number of items to return. This value will always be provided and will be greater than zero.

    - name: paging.pageNumber
      type: number
      description: The desired page number to return. This value will always be provided and will be zero or greater.

    - name: paging.pageCount
      type: number
      description: he desired maximum number of pages to return. This value is optional.

    - name: paging.cursor
      type: string
      description: Identifies the next page of results to return. This value is optional.

return:
  name: salesOrders
  type: SalesOrderArray
  signature: SalesOrderArray[]
  description: |
    An array of sales orders matching the date range.
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
         [DateTime](./../date-time.md), </br>
         [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), or a string representation of a date in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
      required: true
      description: The date/time that the sales order was originally placed.

    - name: modifiedDateTime
      type: |
         [DateTime](./../date-time.md), </br>
         [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), or a string representation of a date in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
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

    - name: shippingPreferences
      type: |
        [ShippingPreferences](./../shipping-preferences.md)[]
      required: false
      description: An array of preferences on how this order should be fulfilled.

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

    - name: items[].product
      type: object
      required: true
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
      description: The value of the quantity. (e.g. 3). The minimum value is `1`.

    - name: items[].unitPrice
      type: object
      required: true
      description: The sale price of each item. This should NOT include additional charges or adjustments, such as taxes or discounts. Use `charges` for those.

    - name: items[].unitPrice.value
      type: number
      required: true
      description: The amount of this value.

    - name: items[].unitPrice.currency
      type: string
      required: true
      description: |
        The currency that the value represents.

    - name: items[].unitWeight
      type: object
      required: false
      description: The weight of each item.

    - name: items[].unitWeight.value
      type: number
      description: The weight value for each item. This value may contain decimals.

    - name: items[].unitWeight.unit
      type: string
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


    - name: items.thumbnailURL
      type: |
       [URL](https://nodejs.org/api/url.html) or string
      required: false
      description: The URL of a webpage where the customer can view an image of the order item.

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
      description: Custom data about this sales order that was persisted by the ShipEngine Integration Platform.
        Must be JSON serializable.

    - name: paging
      type: object
      description: An object that indicates that page preferences for the items that are returned from this method.

    - name: paging.pageSize
      type: number
      description: The desired maximum number of items to return. This value will always be provided and will be greater than zero.

    - name: paging.pageNumber
      type: number
      description: The desired page number to return. This value will always be provided and will be zero or greater.

    - name: paging.pageCount
      type: number
      description: he desired maximum number of pages to return. This value is optional.

    - name: paging.cursor
      type: string
      description: Identifies the next page of results to return. This value is optional.

---
Examples
------------------
```javascript
async function getSalesOrdersByDate(transaction, range) {
  // STEP 1: Validation
  // Add any desired validation here

  // STEP 2: Create the data that the order's API expects
  const data = {
    operation: "retrieve_sales_orders_by_date",
    session_id: transaction.session.id,
    start_date:  range.startDateTime,
    end_date: range.endDateTime
  };

  // STEP 3: Call the order source's API
  const response = await apiClient.request({ data });

  // Step 4: Create the output data that ShipEngine expects
  return formatSalesOrders(response.data);
}

function formatSalesOrders(salesOrders) {

  return salesOrders.map(salesOrder => {
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
        country: mapCountryCode(salesOrder.address.country),
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
      })
    }
  });
}
```
```typescript
export default async function getSalesOrdersByDate(
  transaction: Transaction<Session>,
  range: SalesOrderTimeRange,
): Promise<Iterable<SalesOrderPOJO>> {
  // STEP 1: Validation
  // Add any desired validation here

  // STEP 2: Create the data that the order's API expects
  const data = {
    operation: "retrieve_sales_orders_by_date",
    session_id: transaction.session.id,
    start_date:  range.startDateTime,
    end_date: range.endDateTime
  };

  // STEP 3: Call the order source's API
  const response = await apiClient.request<RetrieveSalesOrdersByDateResponse>({ data });

  // Step 4: Create the output data that ShipEngine expects
  return formatSalesOrders(response.data);
}
```
