---
hidden: true
title: Localization
description: Language Localization
---

Language Localization
============

Localization, also referred to as `l10n`, is the process of adapting a product or content to a specific locale or market. Language translation is one of many aspects of localizing
your application for various markets. In anticipation of an upcoming localization feature, the structure of a [ShipEngine Connect](./index.md) application
 allows you to provide localization information for certain aspects of your application. This allows for
localization of any of the [BCP 47 supported languages](https://tools.ietf.org/html/bcp47).

To find out what properties are available for localization, you can check the reference docs for the `localization` properties.

For the [Carrier Application Definition](reference/carrier.md), you may provide localization information for the `name`, `description`, and `websiteURL` properties.

Example
--------

The sample Carrier Application Definition below is a great example of the level of granularity that ShipEngine Connect localization model provides.

The definition is specified in the carrier's primary language, which is US-based English. This carrier is also available in the UK, which uses `en-GB` as its locale. Localization makes it possible for a user from the UK
to be shown the UK version of the website URL. You should provide localization data for every country in which your service is available. In the example below, we've provided a localization information for Spanish (`es`) and Chinese (`zh`).


By providing a localized version for every language in which you perform services, ShipEngine Connect will be able to show your user's information about your service in
the language that is most familiar to them.

```yaml highlights="1-12"
localization:
  en-GB:
    websiteURL: https://cargo-inc.co.uk

  es:
    description: Cargo Incorporated es el líder mundial en carga aérea.
    websiteURL: https://cargo-inc.net/es/

  zh:
    name: 货运公司
    description: 货运公司是航空货运的全球领导者。
    websiteURL: https://cargo-inc.cn

id: 40cc4792-dd01-4f71-9c74-b70d42756b1a
name: Cargo Incorporated
description: Cargo Incorporated is the global leader in air cargo.
websiteURL: https://cargo-inc.net
logo: ../logo.svg

createLabel: src/create-shipment.js
getRates: src/rate-shipment.js

deliveryServices:
  - delivery-services/international-standard.yaml
  - delivery-services/international-economy.yaml
  - delivery-services/international-overnight.yaml


```


<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="./error-handling.md">Previous: Error Handling</a>
  <a class="button button-small button-secondary" href="./sandbox.md">Next: Sandbox Environments</a>
</div>
