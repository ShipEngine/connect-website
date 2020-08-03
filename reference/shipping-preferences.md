---
hidden: true
layout: nunjucks/layouts/object-page.njk
title: Shipping Preference objects
name: Shipping Preferences

description: Shipping preferences are conveyed using the ShippingPreference object.

documentation: |
  Shipping preferences are conveyed using the ShippingPreference object.

fields:
  - name: deliveryConfirmationType
    type: string
    required: false
    description: |
      The requested delivery confirmation. Valid values include the following:
      * `delivery` - Package is dropped off at the destination address.
      * `signature` - A person at the destination address signs for the package.
      * `adult_signature` - A person of legal adult age for the destination jurisdiction signs for the package.
      * `direct_signature` - The person named as the recipient signs for the package.

  - name: deliveryDateTime
    type: |
      [DateTime](./date-time.md), </br>
      [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), or a string representation of a date in [ISO](https://www.w3.org/TR/NOTE-datetime) format.
    required: false
    description: The date and time that the shipment should be delivered.

  - name: containsAlcohol
    type: boolean
    required: false
    description: Indicates whether the shipment needs to be marked as containing alcohol.

  - name: saturdayDelivery
    type: boolean
    required: false
    description: Indicates whether Saturday delivery is requested.

  - name: insuredValue
    type: object
    required: false
    description: Requests that the shipment be insured for the specified value.

  - name: insuredValue.value
    type: number
    required: true
    description: The value of the insured amount.

  - name: insuredValue.currency
    type: string
    required: true
    description: |
      The currency the value represents.

---




