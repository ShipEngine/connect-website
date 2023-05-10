---
title: Document Rendering
---

# Document Rendering

The Connect runtime exposes the capability to render documents (such as labels and customs forms) from code.
The documents can be generated  in PDF, PNG and ZPL formats, using templates created in the [Documents Designer](./documents-designer/index.md).

The `@shipengine/connect-rendering-client` provides developers with the ability to access the rendering capabilities.

## Usage

Developers have the ability to render the documents in the `label_format` passed in `CreateLabelRequest`.  
The `GetDocuments` function expects a request and carrier definition that contains a path to the template file.

This example shows you how to render the documents within the `CreateLabel` method.

```typescript
import { CreateLabelRequest, CreateLabelResponse } from '@shipengine/connect-carrier-api';
import { GetDocuments } from '@shipengine/connect-rendering-client';
import { DemoCarrier } from '../definitions/demo-carrier';

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    return await GetDocuments(request, DemoCarrier);
};
```

If you have created the template with multiple documents, it is possible to select the document to be rendered by its name.  
In the following example, two documents are selected:

```typescript
return await GetDocuments(request, DemoCarrier, ['standard_label', 'additional_label']);
```

You have the ability to design multi-language document templates as well.  
Remember to use the same language code in `GetDocuments` that was defined in the document template.  

This example shows how to render document in specific language:
```typescript
return await GetDocuments(request, DemoCarrier, ['standard_label', 'additional_label'], 'FR');
```

### Document Template

Your app definition must contain a document template file. The carrier metadata specifies the location of the file:

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

### Environment Variable

The environment variable `RENDERING_HOST` must be set for the Connect testing environment.

Before run `connect publish` you have to set the variable indicating the correct host url `{rendering_service_url}` (that can be obtained from Auctane):
```bash
connect env:set RENDERING_HOST={rendering_service_url}
```

## Customs Documents

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

This example shows how to generate commercial invoice and customs declaration in French:

```typescript
import { CreateLabelRequest, CreateLabelResponse } from '@shipengine/connect-carrier-api';
import { GetCustoms } from '@shipengine/connect-rendering-client';
import { DemoCarrier } from '../definitions/demo-carrier';

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    return await GetCustoms(request, DemoCarrier, ['CI', 'CN22'], 'FR');
};
```
 
Customs declarations can be combined with the carrier label as follows:
```typescript
import { CreateLabelRequest, CreateLabelResponse } from '@shipengine/connect-carrier-api';
import { GetDocuments, GetCustoms, CombineDocuments } from '@shipengine/connect-rendering-client';
import { DemoCarrier } from '../definitions/demo-carrier';

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    const carrierLabel = await GetDocuments(request, DemoCarrier);
    const customsForms = await GetCustoms(request, DemoCarrier, ['CI', 'CN23']);    
    return CombineDocuments(carrierLabel, customsForms);
};
```