---
hidden: true
title: Order Application Definition
name: Order Application Definition
identifier: Order Application

description:
  The page describes how to define an Order application.
documentation: |
  The Order Application Definition file tells the [ShipEngine Integration Platform](./../index.md) where to find the resources that define
  your application, such as methods and forms.


  This file can reside anywhere within your application as long as its location is specified
  in the `main` property of your `package.json` file.
  The definition may be specified in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [TypeScript](https://www.typescriptlang.org/), [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), or
  [YAML](https://en.wikipedia.org/wiki/YAML).

param:
  fields:
     - name: id
       type: UUID
       required: true
       description: A UUID that uniquely identifies the application for internal ShipEngine Integration Platform purposes. This ID should never change.

     - name: name
       type: string
       required: true
       description: The user-friendly name for this Order application.

     - name: description
       type: string
       required: false
       description: A short, user-friendly description of this Order application.

     - name: websiteURL
       type: string
       required: true
       description: The URL of this service's website.

     - name: logo
       type: string
       required: true
       description: The file path to the third party service's logo image.

     - name: connectionForm
       type: "[Form](./forms.md)"
       required: true
       description: A form that allows the user to connect to the service. This form will usually prompt for an account number and login credentials.

     - name: settingsForm
       type: "[Form](./forms.md)"
       required: false
       description: A form that allows the user to configure connection settings

     - name: connect
       type: method *or* string
       required: false
       description: |
         A method that connects to an existing account using the data that was gathered in the
         [`connectionform`](./forms.md).
         Note that this function does not return a value but rather updates the
         [`transaction.session`](./transaction.md) property.
         You may define this method direcly inline inside of this file or you may specify the path to the file
         that exports your [`connect`](./methods/connect.md) method.

     - name: getSalesOrdersByDate
       type: method *or* string
       required: false
       description: A method that returns all orders that were created and/or modified within a given time frame. You may define this method direcly inline inside
         of this file or you may specify the path to the file that exports your [`getSalesOrdersByDate`](./methods/get-sales-orders-by-date.md) method.

     - name: shipmentCreated
       type: method *or* string
       required: false
       description: A method that's called when a shipment is created for one or more items in one or more sales orders.
         A single shipment may contain items from multiple sales orders, and a single sales order may be fulfilled by multiple shipments.
         You may define this method direcly inline inside of this file or you may specify the path to the file that exports your
         [`shipmentCreated`](./methods/shipment-created.md)
          method.

     - name: shipmentCancelled
       type: method *or* string
       required: false
       description: A method that's called when a shipment is cancelled for one or more items in one or more sales orders.
         A single shipment may contain items from multiple sales orders, and a single sales order may be fulfilled by multiple shipments.
         You may define this method direcly inline inside of this file or you may specify the path to the file that exports your
         [`shipmentCancelled`](./methods/shipment-cancelled.md)
          method.

---
{% from "nunjucks/imports/reference.njk" import referenceTable %}

{{name}}
===============================================
{{documentation}}


###   {{ identifier }}
{{referenceTable(param.fields)}}

Examples
------------
```typescript
import { OrderAppDefinition } from "@shipengine/integration-platform-sdk";

const orderSource: OrderAppDefinition = {
  id: "5e386891-f693-4cdf-8b0c-82d7eb7542d0",
  name: "IBuy MarketPlace",
  description: "Welcome to iBuy, the international marketplace for all of your needs.",
  websiteURL: "https://www.iBuy.net",
  logo: "./../logo.svg",
  connectionForm: import("./forms/connect"),
  settingsForm: import("./forms/settings"),

  connect: import("./methods/connect"),
  getSeller: import("./methods/get-seller"),
  getSalesOrder: import("./methods/get-sales-order"),
  getSalesOrdersByDate: import("./methods/get-sales-orders-by-date"),
  shipmentCreated: import("./methods/shipment-created"),
  shipmentCancelled: import("./methods/shipment-cancelled"),
  localization: {
      "en-GB": {
        websiteURL: "https://cargo-inc.co.uk"
      },
      es: {
        description: iBuy MarketPlace es el líder mundial en carga aérea.
        websiteURL: "https://ibuy.net/es/"
      },
      zh: {
        name: "货运公司"
        description: "货运公司是航空货运的全球领导者。"
        websiteURL: "https://ibuy.cn"
      }
    }
  }
}

export default orderSource;
```

```javascript
const orderSource = {
  id: "5e386891-f693-4cdf-8b0c-82d7eb7542d0",
  name: "IBuy MarketPlace",
  description: "Welcome to iBuy, the international marketplace for all of your needs.",
  websiteURL: "https://www.iBuy.net",
  logo: "./../logo.svg",
  connectionForm: "./forms/connect.js",
  settingsForm: "./forms/settings.js",

  connect: "./methods/connect.js",
  getSeller: "./methods/get-seller.js",
  getSalesOrder: "./methods/get-sales-order.js",
  getSalesOrdersByDate: "./methods/get-sales-orders-by-date.js",
  shipmentCreated: "./methods/shipment-created.js",
  shipmentCancelled: "./methods/shipment-cancelled.js",
  localization: {
    en-GB: {
      websiteURL: https://iBuy.co.uk
    },
    es: {
      description: iBuy MarketPlace es el líder mundial en carga aérea.
      websiteURL: https://ibuy.net/es/
   },
    zh: {
      name: 货运公司
      description: 货运公司是航空货运的全球领导者。
      websiteURL: https://ibuy.cn
    }
}

module.exports = orderSource;
```

```yaml
id: 5e386891-f693-4cdf-8b0c-82d7eb7542d0

name: IBuy MarketPlace

description:  Welcome to iBuy, the international marketplace for all of your needs.

websiteURL: https://www.ibuy.net

logo: ./../logo.svg

connectionForm: forms/connection-form.js

connect: methods/connect.js
getSeller: methods/get-seller.js
getSalesOrder: methods/get-sales-order.js
getSalesOrdersByDate: methods/get-sales-orders-by-date.js
shipmentCreated: methods/shipment-created.js
shipmentCancelled: /methods/shipment-cancelled.js

localization:
  en-GB:
    websiteURL: https://iBuy.co.uk

  es:
    description: iBuy es el líder mundial en carga aérea.
    websiteURL: https://ibuy.net/es/

  zh:
    name: 货运公司
    description: 货运公司是航空货运的全球领导者。
    websiteURL: https://ibuy.cn
```

