---
title: Document Rendering
---

# Document Rendering

The Connect runtime exposes the capability to render documents (such as labels and customs forms) from code.
The documents can be generated  in PDF, PNG and ZPL formats, using templates created in the [Documents Designer](./documents-designer/index.md).

The `@shipengine/connect-rendering-client` provides developers with the ability to access the rendering capabilities.

## Usage

This example shows you how to render the documents within the `CreateLabel` method.

```typescript
import {CreateLabelRequest, CreateLabelResponse} from '@shipengine/connect-carrier-api';
import {getDocuments, RenderingRequest} from '@shipengine/connect-rendering-client';

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    return await getDocuments(request.metadata.carrier_code, request);
}
```
### Document Template

Your app definition must contain a document template file. The carrier metadata specifies the location of the file:

```typescript
export const DemoCarrier: Carrier = {
  /.../
  DocumentTemplate: join(__dirname, '../../../assets/templates/demo_carrier_code.carrier')
}
```

You can use the [Documents Designer](./documents-designer/index.md)
visual tool to design a document template file.

:::success ACCESS
*To get access to rendering capabilities and Documents Designer, please reach out to your business contact with Auctane or the [ShipEngine Connect Team](mailto:connect@shipengine.com).*
:::

### Deploy

The environment variable `RENDERING_HOST` must be set for the ShipEngine Connect testing environment.

Before run `connect publish` you have to set the variable indicating the correct host url `{rendering_service_url}` (that can be obtained from Auctane):

```bash
connect env:set RENDERING_HOST={rendering_service_url}
```
