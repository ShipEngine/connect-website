import Joi from "joi";
import Config from "./config";
import ono from "@jsdevtools/ono";
import {
  AddressWithContactInfo,
  Weight,
  DateTimeZone,
} from "@shipengine/connect-sdk/lib/internal/common";
import { NewLabel } from "@shipengine/connect-sdk/lib/internal/carriers/documents/new-label";
import { _internal, MonetaryValue } from "@shipengine/connect-sdk/lib/internal/common";
import { NewPackage } from "@shipengine/connect-sdk/lib/internal/carriers/packages/new-package";

const joiOptions = {
  abortEarly: false,
  convert: false,
  allowUnknown: false,
  errors: {
    wrap: {
      label: false,
      array: false,
    }
  }
};

const baseTestParamValidations = {
  connectArgs: Joi.object().keys().unknown(),
  debug: Joi.boolean().optional(),
  retries: Joi.number().optional(),
  session: Joi.object().keys().unknown(),
  timeout: Joi.number().optional(),
  skip: Joi.boolean().optional(),
};

const createShipmentDomesticTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    deliveryConfirmationName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    label: NewLabel[_internal].schema.optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
  }
});

const createShipmentInternationalTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    deliveryConfirmationName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    label: NewLabel[_internal].schema.optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
  }
});

const CreateShipmentMultiPackageTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    deliveryConfirmationName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    packages: Joi.array().min(1).items(NewPackage[_internal].schema).optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
  }
})

const CreateShipmentWithInsuranceTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    deliveryConfirmationName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    label: NewLabel[_internal].schema.optional(),
    packageInsuredValue: MonetaryValue[_internal].schema.optional(),
    packagingName: Joi.string().optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
  }
})

const RateShipmentTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    deliveryServiceName: Joi.string().optional(),
    packagingName: Joi.string().optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
  }
})

const testsSchema = Joi.object({
  createShipment_domestic: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(createShipmentDomesticTestParamsSchema),
    otherwise: createShipmentDomesticTestParamsSchema,
  }),
  createShipment_international: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(createShipmentInternationalTestParamsSchema),
    otherwise: createShipmentInternationalTestParamsSchema,
  }),
  createShipment_multi_package: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(CreateShipmentMultiPackageTestParamsSchema),
    otherwise: CreateShipmentMultiPackageTestParamsSchema,
  }),

  createShipment_with_insurance: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(CreateShipmentWithInsuranceTestParamsSchema),
    otherwise: CreateShipmentWithInsuranceTestParamsSchema,
  }),

  rateShipment: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(RateShipmentTestParamsSchema),
    otherwise: RateShipmentTestParamsSchema,
  }),
}).optional();

const schema = Joi.object().keys({
  connectArgs: Joi.object().keys().unknown(),
  debug: Joi.boolean().optional(),
  failFast: Joi.boolean().optional(),
  retries: Joi.number().optional(),
  session: Joi.object().keys().unknown(),
  timeout: Joi.number().optional(),
  tests: testsSchema,
});

const validateConfig = (config: Config): Config => {
  const { error, value } = schema.validate(config, joiOptions as Joi.ValidationOptions);

  if (error) {
    throw ono(error, { code: "ERR_CONNECT_CONFIG_SCHEMA" });
  }

  return value as Config;
};

export default validateConfig;
