---
hidden: true
layout: nunjucks/layouts/object-page.njk
title: Customs objects
name: Customs

description: An object representing customs for international shipments.

documentation: |
  An object representing customs for international shipments.

fields:
   
  - name: customs
    type: object
    nullable: false
    description: Customs declarations for this package.

  - name: customs.nonDeliveryOption
    type: string
    nullable: true
    description: |
      Indicates what should be done if the package cannot be delivered. If `undefined`, the default behavior
      of the receiving country's customs department applies, which may incur charges.
      Valid values include the following:
        * `return` - Return to sender.
        * `abandon` - Treat as abandoned.

  - name: customs.contents
    type: object[]
    nullable: false
    description: |
      Describes the contents of the package for customs purposes.

      Note that Customs contents may not correspond one-to-one with the package contents.
      Package contents usually include one item per unique merchandise SKU
      e.g. one red t-shirt and one blue t-shirt), whereas customs contents are often grouped by
      product type (e.g. two t-shirts). In addition, some package contents don't need to be declared
      for customs purposes.

  - name: customs.contents[].type
    type: string
    nullable: false
    description: |
      The customs type category. Valid values include the following:
      * `gift` - The package contains a gift
      * `documents` - The package contains documents.
      * `merchandise` - The package contains merchandise.
      * `returned_goods` - The package is a returned shipment.
      * `commercial_sample` - The package contains a commercial sample, such as a flooring sample.
      * `humanitarian_donation` - The package contains a donation.
      * `other` - The package contains items that fall outside the other categories.

  - name: customs.contents[].sku
    type: string
    nullable: false
    description: The [Stock Keeping Unit](https://en.wikipedia.org/wiki/Stock_keeping_unit). This string will be between `0` and `100` characters and will not contain newline characters.

  - name: customs.contents[].description
    type: string
    nullable: false
    description: A description of the item. Usually required if `type` is `other`. This string will be between `0` and `1000` characters and will not contain newline characters.

  - name: customs.contents[].quantity
    type: object
    nullable: false
    description: The quantity of items in the package.

  - name: customs.contents[].quantity.value
    type: number
    nullable: false
    description: The value of the quantity. The minimum value is `1`.

  - name: customs.contents[].unitValue
    type: object
    nullable: false
    description: The monetary value of each unit in the package.

  - name: customs.contents[].unitValue.value
    type: number
    nullable: false
    description: The amount of this value.

  - name: customs.contents[].unitValue.currency
    type: string
    nullable: false
    description: |
      The currency that the value represents.

  - name: customs.contents[].countryOfOrigin
    type: |
      [CountryCode](./country-codes.md)
    nullable: true
    description: The [ISO 3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) for the
      [country](./country-codes.md) of origin. This is usually the same as `countryOfManufacture`,
      but some countries distinguish between the two for certain products.

  - name: customs.contents[].countryOfManufacture
    type: |
      [CountryCode](./country-codes.md)
    nullable: true
    description: The [ISO 3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_code) for the
      [country](./country-codes.md) where the item was manufactured.

  - name: customs.contents[].harmonizedTariffCode
    type: string
    nullable: false
    description: The [Harmonized Tariff Code](https://hts.usitc.gov/) for the item. This string must be between `0` and `30` characters and must not contain newline characters.
    
---    
