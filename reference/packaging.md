---
hidden: true
title: Packaging Definition
name: Packaging Definition
identifier: Packaging Properties

description:
  The page describes how to define a type of packaging.

documentation: |
  Carrier packaging options are defined inside files that are then used by the [ShipEngine Integration Platform](./../index.md) to offer these
  packaging options to users who utilize the carrier within one of our e-commerce applications. Each packaging type that you wish to offer
  should have its own definition file. These files can reside anywhere within your application as long as their locations are specified in the [Carrier Application Definition](./carrier.md) file.
   The definition may be specified in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [TypeScript](https://www.typescriptlang.org/), [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), or
    [YAML](https://en.wikipedia.org/wiki/YAML).


param:
  fields:
     - name: id
       type: UUID
       required: true
       description: UUID that uniquely identifies the packaging. This ID should never change.

     - name: identifiers
       type: object
       required: false
       description: Your own identifiers for this packaging option.

     - name: code
       type: string
       required: false
       description: Optional code used to map to what the carrier identify the packaging.

     - name: name
       type: string
       required: true
       description: The user-friendly name for this packaging (e.g. "Flat-Rate Box", "Large Padded Envelope").

     - name: description
       type: string
       required: false
       description: A short, user-friendly description of the packaging.

     - name: requiresWeight
       type: boolean
       required: false
       description: Indicates whether the weight must be specified when using this packaging.

     - name: requiresDimensions
       type: boolean
       required: false
       description: Indicates whether the dimensions must be specified when using this packaging.
---


  {% from "nunjucks/imports/reference.njk" import referenceTable %}

  {{name}}
  ===============================================
  {{documentation}}


  ###   {{ identifier }}
  {{referenceTable(param.fields)}}


  Examples
  -----------------------------------------------

```yaml
id: 03318192-3e6c-475f-a496-a4f17c1dbcae
identifiers:
  apiCode: PAK
name: Package
description: Your own packaging, up to 100 kilograms
requiresWeight: true
requiresDimensions: true
```

```javascript
{
  id: "03318192-3e6c-475f-a496-a4f17c1dbcae",
  identifiers: {
    apiCode: "PAK"
  },
  code: "PAK",
  name: "Package",
  description: "Your own packaging, up to 100 kilograms",
  requiresWeight: true,
  requiresDimensions: true
}

```

```json
{
  "id": "03318192-3e6c-475f-a496-a4f17c1dbcae",
  "code": "PAK",
  "name": "Package",
  "description": "Your own packaging, up to 100 kilograms",
  "requiresWeight": true,
  "requiresDimensions": true
}
```

```typescript
import { PackagingDefinition } from "@shipengine/integration-platform-sdk";

const packagePackaging: PackagingDefinition = {
  id: "03318192-3e6c-475f-a496-a4f17c1dbcae",
  code: "PAK",
  name: "Package",
  description:
    "Your own packaging, up to 100 kilograms",
  requiresWeight: true,
  requiresDimensions: true
};

export default packagePackaging;

```
