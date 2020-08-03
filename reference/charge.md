---
hidden: true
layout: nunjucks/layouts/object-page.njk
title: Charge objects
name: Charge

description: An itemized charge or credit for a shipment or sales order

documentation: |
  A Charge object describes an itemized charge or credit for a shipment or sales order.

fields:
  - name: name
    type: string
    required: false
    description: The user-friendly name of the charge (e.g. "Fuel Charge", "Oversize Package Fee"). This string must be between `0` and `100` characters and
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
    description: |
      The currency that the value represents.

---
Examples
-------------------------------------------------



