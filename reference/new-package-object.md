---
hidden: true
layout: nunjucks/layouts/object-page.njk
title: New Package Object
name: New Package
identifier: New Package Properties

description:
  The page describes the New Package object.

documentation: |
  The New Package object describes the package information needed when creating a new shipment. This page describes the properties
  of the New Package object.

fields:
   -  name: packaging
      type: object
      description: The packaging used for this package.

   - name: packaging.id
     type: "[UUID](https://www.npmjs.com/package/uuid)"
     description: A UUID that uniquely identifies this packaging. This is the UUID you used in the [Packaging Definition](./packaging.md)
       file for this packaging..

   - name: packaging.identifiers
     type: object
     description: Your own identifiers for this packaging.

   - name: packaging.code
     type: string
     required: false
     description: Optional code used to map to what the carrier uses to identify the packaging.

   - name: packaging.name
     type: string
     description: The user-friendly name for this packaging (e.g. "Flat-Rate Box", "Large Padded Envelope").
       This string will be between `1` and `100` characters and will not contain newline characters.

   - name: packaging.description
     type: string
     description: A short, user-friendly description of the packaging.
       This string will be between `0` and `1000` characters and will not contain newline characters.

   - name: packaging.requiresWeight
     type: boolean
     description: Indicates whether the weight must be specified when using this packaging.

   - name: packaging.requiresDimensions
     type: boolean
     description: Indicates whether the dimensions must be specified when using this packaging.

   - name: dimensions
     type: object
     description: The dimensions for the package.

   - name: dimensions.length
     type: number
     description: The length of the package. This value may contain decimals.

   - name: dimensions.width
     type: number
     description: The width of the package. This value may contain decimals.

   - name: dimensions.height
     type: number
     description: The height of the package. This value may contain decimals.

   - name: dimensions.unit
     type: string
     description: |
       The unit of measurement for the dimensions. Valid values include the following:
       * `in` - inches
       * `cm` - centimeters

   - name: weight
     type: |
       [Weight](./weight-object.md)
     description: The weight of the package.
     required: false

   - name: insuredValue
     type: object
     description: The insured value of this shipment.

   - name: insuredValue.value
     type: number
     description: The value of the insured amount.

   - name: insuredValue.currency
     type: string
     description: |
       The currency that the value represents.

   - name: containsAlcohol
     type: boolean
     description: Indicates whether the package contains alcohol.

   - name: isNonMachineable
     type: boolean
     description: Indicates whether the package cannot be processed automatically due to size, shape, weight, etc. and requires manual handling.

   - name: label
     type: object
     description: An object representing the information required to create a new label.

   - name: label.format
     type: string
     description: |
       The preferred file format of the label. The carrier should return the label in this format, if possible.
       Valid values include the following:
       * `pdf` - Portable Document Format (PDF)
       * `zpl` - Zebra Printer Label (ZPL)
       * `png` - Portable Graphics Format (PNG)

   - name: label.size
     type: string
     description: |
       The preferred label size. The carrier should return the label in this size, if possible.
       Valid values include the following:
       * `A4`- A4 sized paper ( 8.27 inches x 11.69 inches)
       * `A6` - A6 sized paper (4 1/8 inches x 5 7/8 inches)
       * `letter` - Letter sized paper (8.5 inches by 11 inches)
       * `4x6` - Paper sized 4 inches by 6 inches
       * `4x8` - Paper sized 4 inches by 8 inches

   - name: label.referenceFields
     type: string[]
     description: |
       Some carriers provide general-purpose fields on their labels for custom text.
       This is sometimes used for messages, like "Thank you for shopping with us!",
       or may be used to store reference data, such as account numbers, warehouse codes, etc.

       The exact location on the label depends on the carrier, as does the allowed number of fields
       and the maximum length of each field. If more fields are specified than are supported by the
       carrier, then the extra fields should be ignored. Likewise, if a field length exceeds the
       carrier's maximum length, then it should be truncated. The *actual* values that are used
       should be returned, so the caller can detect any differences.

       Note that these fields should NOT be used to set **named** fields on the label,
       such as "RMA Number" or "Order ID". Those should be set using the correspond
       properties of the shipment.

       Each string in this array will be between `0` and `100` characters and will not contain newline characters.

   - name: customs
     type: |
       
       [Customs](./customs.md)
     description: The customs associate with this package.
     
   - name: contents
     type: object
     description: Describes the items inside the package.

   - name: contents.sku
     type: string
     description: The [Stock Keeping Unit](https://en.wikipedia.org/wiki/Stock_keeping_unit). This string will be between `0` and `100` characters and will not contain newline characters.

   - name: contents.identifiers
     type: object
     description: Your own identifiers for this item.

   - name: contents.salesOrder
     type: object
     description: The sales order associated with this item.

   - name: contents.salesOrder.id
     type: string
     description: The marketplace's unique ID for the sales order. This string will be between `1` and `100` characters and will not contain newline characters.

   - name: contents.salesOrder.identifiers
     type: object
     description: Your own identifiers for this sales order.

   - name: contents.salesOrderItem
     type: object
     description: The sales order item associated with this item.

   - name: contents.salesOrderItem.id
     type: string
     description: The marketplace's unique ID for the sales order item. This string will be between `1` and `100` characters and will not contain newline characters.

   - name: contents.salesOrderItem.sku
     type: string
     description: The [Stock Keeping Unit](https://en.wikipedia.org/wiki/Stock_keeping_unit). This string will be between `0` and `100` characters and will not contain newline characters.

   - name: contents.salesOrderItem.identifiers
     type: object
     description: Your own identifiers for this sales order item.

   - name: contents.product
     type: object
     description: The product associated with this item.

   - name: contents.product.id
     type: string
     description: The product catalog's unique ID for the order. This string will be between `1` and `100` characters and will not contain newline characters.

   - name: contents.product.sku
     type: string
     description: The [Stock Keeping Unit](https://en.wikipedia.org/wiki/Stock_keeping_unit). This string will be between `0` and `100` characters and will not contain newline characters.

   - name: contents.product.identifiers
     type: object
     description: Your own identifiers for this product.

   - name: contents.quantity
     type: object
     description: The quantity of this item in the package.

   - name: contents.quantity.value
     type: number
     description: The quantity of items. The minimum value is `1`. This value will not contain decimals.

   - name: contents.unitPrice
     type: object
     description: The sale price of each item.

   - name: contents.unitPrice.value
     type: number
     description: The value of the amount.

   - name: contents.unitPrice.currency
     type: string
     description: |
       The currency that the value represents.

   - name: contents.totalPrice
     type: object
     description: The total price of this item. This is `unitPrice` multiplied by `quantity`.

   - name: contents.totalPrice.value
     type: number
     description: The value of the amount.

   - name: contents.totalPrice.currency
     type: string
     description: |
       The currency that the value represents.
---


