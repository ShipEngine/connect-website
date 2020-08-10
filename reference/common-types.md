---
hidden: true
name: Common Types
description: This page lists the valid values for some of the common types.
charges:
  - name: shipping
    description: The charge is for shipping.
  - name: handling
    description: The charge is for handling of the item.
  - name: oversize
    description: The charge is accessed because the packaging is a non-standard size.
  - name: special_goods
    description: The charge is for special goods.
  - name: delivery_confirmation
    description: The charge is for a delivery confirmation, such as requiring an adult signature.
  - name: insurance
    description: The charge is for insurance.
  - name: discount
    description: The charge is for a discount. This would be reflected by a negative value.
  - name: fuel
    description: The charge is for fuel.
  - name: location_fee
    description: The charge is because of the location of the origin or destination address.
  - name: fee
    description: This charge is for a general purpose fee.
  - name: pickup
    description: The charge is for a package pickup.
  - name: return
    description: The charge is for a return.
  - name: notification
    description: The charge is for a notification.
  - name: duty
    description: The charge is for a foreign duty.
  - name: tax
    description: The charge is for a tax.
  - name: adjustment
    description: The charge is for an adjustment. This can happen if the package dimensions or weight are different from what was used when the label was generated. It would be negative for a refund.
  - name: coupon
    description: The charge is because a coupon was applied. This would be reflected by a negative value.
  - name: credit
    description: The charge is because a credit was applied. This would be reflected by a negative value.
  - name: debit
    description: The charge is because of a debit.
  - name: gift_certificate
    description: The charge is because a gift certificate was applied. This would be reflected by a negative value.
  - name: gift_wrapping
    description: The charge is for gift wrapping.
  - name: promotion
    description: The charge is because of a promotion. This would be reflected by a negative value.
  - name: refund
    description: The charge is for a refund. This would be reflected by a negative value.
  - name: uncategorized
    description: The charge is for something that does not fit into any of the other categories.

notes:
  - name: gift_message
    description: The note contains a gift message.
  - name: message_to_buyer
    description: The note contains a message to the buyer.
  - name: message_from_buyer
    description: The not contains a message from the buyer.
  - name: internal
    description: The note is for internal use.

---

{{ name }}
==========================
This page lists the valid values for some of the common types that are used throughout a [ShipEngine Integration Platform](./../index.md) application.

Charge Types
-----------------------------------
This is the list of values for charge types. You will use one of these values in the type property of a charges array. For example, the [rateShipment](./methods/rate-shipment.md) returns a rate object that includes
a charges array since the total shipping charges are a large factor in selecting a rate.

{% from "nunjucks/imports/reference.njk" import typesTable %}

{{typesTable(charges)}}

Notes Types
------------------------------------------
This is the list of values for note types. You will use one of these values in the type property of a notes array. For example, the [createShipment](./methods/create-shipment.md) method receives a new shipment object that includes
a notes array. Most of the objects passed to and from your methods will contain a notes array.



{{typesTable(notes)}}
