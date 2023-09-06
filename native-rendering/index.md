---
title: Document Rendering
---

# Document Rendering

The Connect runtime exposes the capability to render documents (such as labels and customs forms) from code.
The documents can be generated  in PDF, PNG and ZPL formats, using templates created in the [Documents Designer](./documents-designer/index.md).

## Usage

Developers have the ability to render documents in a specific format, which is passed as `label_format` field in `GetDocumentsRequest` request.  
The `getDocuments` function expects a request and `DocumentTemplate` or path to the template file and can be used for all connect app types.

This example shows you how to render the documents within the `CreateLabel` method:  

```typescript
import { CreateLabelRequest, CreateLabelResponse } from '@shipengine/connect-carrier-api';
import { getDocuments } from '@shipengine/connect-runtime';
import { DemoCarrier } from '../definitions/demo-carrier';

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    return await getDocuments(request, DemoCarrier.DocumentTemplate);
};
```

The Documents Designer allows you to create multiple documents within a single template file. In this case, it is possible to select the document to be rendered by its name.  
In the following example, two documents are selected:  

```typescript
getDocumentsRequest.documentNames = ['standard_label', 'additional_label']
return await getDocuments(GetDocumentsRequest, DemoCarrier.DocumentTemplate);
```

### Document Template

Your app must contain a document template definition. For the carrier api metadata can specifies the location of the template file:  

```typescript
export const DemoCarrier: Carrier = {
  Name: 'Demo Carrier',
  DocumentTemplate: join(__dirname, '../../../assets/templates/demo_carrier_template.carrier'),
  /.../
};
```

You can use the [Documents Designer](./documents-designer/index.md)
visual tool to design a document template file.

:::success ACCESS
*To get access to rendering capabilities and Documents Designer, please reach out to your business contact with Auctane or the [ShipEngine Connect Team](mailto:connect@shipengine.com).*
:::

## Customs Documents for Carrier App

For international shipments, customs declarations CN22 and CN23 are required, as well as an optional commercial invoice.  
Whether you use a CN22 form or a CN23 depends on the weight and value of the package.  
Depending on the carrier and the destination you need to include a commercial invoice in addition to the CN22/CN23.

The following customs documents are supported by default:

* CN22 (customs declaration)
* CN23 (customs declaration)
* CI (commercial invoice)

Based on the carrier's rules, you need to decide what kind of document to render by selecting the customs document code.  
Customs documents are available in three languages: EN (English), DE (German) and FR (French). 
By default, customs are generated in English.  
Customs documents required carrier name specified so this parameter is mandatory.

This example shows how to generate commercial invoice and customs declaration in French:

```typescript
import { CreateLabelRequest, CreateLabelResponse, getCustoms } from '@shipengine/connect-carrier-api';
import { GetDocumentsRequest } from '@shipengine/connect-runtime';
import { DemoCarrier } from '../definitions/demo-carrier';

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    const getDocumentsRequest : GetDocumentsRequest = { ...request, ...{ language : 'FR', documentNames : ["CI","CN22"] }};

    return await getCustoms(DemoCarrier.Name, getDocumentsRequest);
};
```
 
Customs declarations can be combined with the carrier label as follows:
```typescript
import { CreateLabelRequest, CreateLabelResponse, getCustoms, combineDocuments } from '@shipengine/connect-carrier-api';
import { getDocuments,  } from '@shipengine/connect-runtime';
import { DemoCarrier } from '../definitions/demo-carrier';

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    const carrierLabel = await getDocuments(request, DemoCarrier.DocumentTemplate);
    const customsForms = await getCustoms(DemoCarrier.Name, request);    
    return combineDocuments(carrierLabel, customsForms);
};
```