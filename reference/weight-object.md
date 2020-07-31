---
layout: nunjucks/layouts/object-page.njk
title: Weight object
name: Weight object

description: The weight of an item.

documentation: |
  A Weight object describes the weight of an item.

fields:
   - name: value
     type: number
     description: The weight value for this package. This value may contain decimals.
     required: true

   - name: unit
     type: string
     description: |
       The unit of measure for this weight. Valid values include the following:
       * `g` - grams
       * `oz` - ounces
       * `kg` - kilograms
       * `lb` - pounds
     required: true

   - name: ounces
     type: number
     description:  The weight in ounces.
     required: true

   - name: grams
     type: number
     description: The weight in grams.
     required: true

   - name: toOunces()
     type: method
     description: A method that returns the weight in ounces.
     required: true

   - name: toGrams()
     type: method
     description: A method that returns the weight in grams.
     required: true
---
Examples
-------------------------------------------------



