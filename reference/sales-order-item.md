---
layout: nunjucks/layouts/object-page.njk
title: Sales Order Item objects
name: Sales Order Item

description: An object representing an item in a sales order.

documentation: |
 A Sales Order Item object describes a single item in a sales order.

fields:
  - name: id
    type: string
    required: false
    description: The marketplace's unique ID for the order item. This string must be between `0` and `100` characters and
      must not contain newline characters.

  - name: description
    type: string
    required: false
    description: The carrier's description of the charge, not specific to the user. This string must be between `0` and `1000` characters and
      must not contain newline characters.

  - name: code
    type: string
    required: false
    description: The carrier's code for this charge. This string must be between `0` and `100` characters and
      must not contain newline characters.

  - name: type
    type: |
      [ChargeType](./common-types.md#charge-types)
    required: true
    description: The type of the charge.

  - name: amount
    type: object
    required: true
    description: The amount of the charge (negative amount for a credit).

  - name: amount.value
    type: number
    required: true
    description: The value of the amount.

  - name: amount.currency
    type: string
    required: true
    description: The currency that the value represents.


---
Examples
-------------------------------------------------



