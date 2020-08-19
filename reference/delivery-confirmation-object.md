---
hidden: true
title: Delivery Confirmation Object
name: Delivery Confirmation Object

description:
  The page describes how to define a delivery confirmation.

documentation: |
  A Delivery Confirmation is a way of ensuring that the shipment reaches its final destination, such as obtaining
  a signature upon delivery. You defined the delivery confirmation options available through your app in [Delivery Confirmation Definition](./delivery-confirmation.md)
  files.
 
fields:
   - name: id
     type: UUID
     nullable: false
     description: UUID that uniquely identifies the delivery confirmation. This ID should never change.

   - name: identifiers
     type: object
     nullable: false
     description: Your own identifiers for this delivery confirmation.

   - name: code
     type: string
     nullable: false
     description: Optional code used to map to what the carrier uses to identify the delivery confirmation.

   - name: name
     type: string
     nullable: false
     description: The user-friendly name for this delivery confirmation (e.g. "Adult Signature", "Authority to Leave").

   - name: description
     type: string
     nullable: false
     description: A short, user-friendly description of this delivery confirmation type.

   - name: type
     type: string
     nullable: false
     description: |
       The type of the delivery confirmation. Valid values include the following:
       * `delivery`
       * `signature`
       * `adult_signature`
       * `direct_signature`
       
returnFields:
  - name: id
    type: UUID
    required: true
    description: UUID that uniquely identifies the delivery confirmation. This ID should never change.

  - name: identifiers
    type: object
    nullable: false
    description: Your own identifiers for this delivery confirmation.

  - name: code
    type: string
    nullable: false
    description: Optional code used to map to what the carrier uses to identify the delivery confirmation. 
---

{{ title }}
====================

{{ documentation }}

## Delivery Confirmation Argument 

This table describes the delivery confirmation object that is passed as part of an argument to a ShipEngine Connect 
Carrier App. 
  
For example, the [createShipment method](./methods/create-shipment.md) accepts a `shipment` parameter with
a `deliveryConfirmation` property that corresponds to this object. 
  
{% from "nunjucks/imports/reference.njk" import parametersTable %}

{{parametersTable(fields)}}

## Delivery Confirmation Return Value

This table specifies the properties that are required when a delivery confirmation object is returned from a method.

In the case of a return value, only the minimum properties needed for ShipEngine Connect to look up the delivery confirmation 
are required. You may provide an object matching the specification below. You may also simply provide the `code` as a string
rather than providing this option.

{% from "nunjucks/imports/reference.njk" import referenceTable %}

{{referenceTable(returnFields)}}


