---
title: Native Documents
---

# Native Documents

The Cross-platform Rendering service allows you to render native documents (such as labels and customs) into Pdf, Png, and Zpl formats, using templates created in Documents Designer (Windows application).  

The `@shipengine/connect-rendering-client` provides the ability to use the Rendering Service that allows carrier integrators to render native documents.  

## Usage

This example shows you how to render the native documents via `CreateLabel` method.

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
You can use the Documents Designer visual tool to design a document template file. Look at [Documents Designer tool](./documents-designer/documents-designer.md). 

:::success Documents Designer
*For more details on Rendering Service and Documents Designer availability, please reach out to your business contact with Auctane or the [ShipEngine Connect Team](mailto:connect@shipengine.com).*
:::

### Rendering Service

The environment variable `RENDERING_HOST` must be set for the ShipEngine Connect testing environment. Before `connect publish` you have to run the command indicating the correct host url `{rendering_service_url}` (which you can obtain from an Auctane):

```bash
connect env:set RENDERING_HOST={rendering_service_url}
```

In order to use Native Documents in production, you have to add the `RENDERING_HOST` environment variable to module's helm `values.yaml` file:
```
environment:
  RENDERING_HOST: "#{RENDERING_HOST}"
```
The value will be substituted by Octopus, according to environment where the module is deployed to.
