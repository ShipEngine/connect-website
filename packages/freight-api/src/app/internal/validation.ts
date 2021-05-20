import { BadRequestError } from "@shipengine/connect-runtime";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const schemaCache = new Ajv({
  allErrors: true,
});

addFormats(schemaCache);

schemaCache.addSchema(
  require("../../schemas/connect-freight-carrier-request.json"),
  "connect-freight-carrier-request"
);
schemaCache.addSchema(
  require("../../schemas/connect-freight-carrier-response.json"),
  "connect-freight-carrier-response"
);
schemaCache.addSchema(
  require("../../schemas/freight-quote-request.json"),
  "freight-quote-request"
);
schemaCache.addSchema(
  require("../../schemas/freight-quote-response.json"),
  "freight-quote-response"
);
schemaCache.addSchema(
  require("../../schemas/freight-shipment-documents-request.json"),
  "freight-shipment-documents-request"
);
schemaCache.addSchema(
  require("../../schemas/freight-shipment-documents-response.json"),
  "freight-shipment-documents-response"
);
schemaCache.addSchema(
  require("../../schemas/freight-spot-quote-request.json"),
  "freight-spot-quote-request"
);
schemaCache.addSchema(
  require("../../schemas/freight-spot-quote-response.json"),
  "freight-spot-quote-response"
);
schemaCache.addSchema(
  require("../../schemas/provision-freight-provider-account-request.json"),
  "provision-freight-provider-account-request"
);
schemaCache.addSchema(
  require("../../schemas/provision-freight-provider-account-response.json"),
  "provision-freight-provider-account-response"
);
schemaCache.addSchema(
  require("../../schemas/schedule-freight-pickup-request.json"),
  "schedule-freight-pickup-request"
);
schemaCache.addSchema(
  require("../../schemas/schedule-freight-pickup-response.json"),
  "schedule-freight-pickup-response"
);
schemaCache.addSchema(
  require("../../schemas/track-freight-shipment-request.json"),
  "track-freight-shipment-request"
);
schemaCache.addSchema(
  require("../../schemas/track-freight-shipment-response.json"),
  "track-freight-shipment-response"
);

export function validateRequest(operation: string, request: any) {
  validate(operation + "-request", request, "Invalid request");
}

export function validateResponse(operation: string, response: any) {
  validate(operation + "-response", response, "Invalid response");
}

function validate(cacheKey: string, instance: any, message: string) {
  if (!instance) {
    return;
  }

  const validator = schemaCache.getSchema(cacheKey);

  if (!validator) {
    return;
  }

  if (validator) {
    const valid = validator(instance);

    if (!valid) {
      throw new BadRequestError(
        message,
        validator.errors?.map((x) => ({
          message: `body${x.instancePath} ${x.message}`,
        }))
      );
    }
  }
}
