/* eslint-disable camelcase */
import Joi from "joi";
import Config from "./config";
import ono from "@jsdevtools/ono";
import {
  AddressWithContactInfo,
  Weight,
  DateTimeZone,
  ContactInfo,
  TimeRange,
  Dimensions,
  Address,
} from "@shipengine/connect-sdk/lib/internal/common";
import { NewLabel } from "@shipengine/connect-sdk/lib/internal/carriers/documents/new-label";
import { _internal, MonetaryValue } from "@shipengine/connect-sdk/lib/internal/common";

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
  expectedErrorMessage: Joi.string().optional(),
  retries: Joi.number().optional(),
  session: Joi.object().keys().unknown(),
  skip: Joi.boolean().optional(),
  timeout: Joi.number().optional(),
};

const createShipmentReturnTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    rmaNumber: Joi.string().optional(),
    deliveryConfirmationName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
    dimensions: Dimensions[_internal].schema.optional(),
    label: NewLabel[_internal].schema.optional(),
  }
});

const cancelShipmentTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    deliveryServiceName: Joi.string().optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
    dimensions: Dimensions[_internal].schema.optional()
  }
});

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
    dimensions: Dimensions[_internal].schema.optional()
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
    dimensions: Dimensions[_internal].schema.optional()
  }
});

const CreateShipmentMultiPackageTestParamsSchemaPackage = Joi.object({
  packagingName: Joi.string().optional(),
  label: NewLabel[_internal].schema.optional(),
  weight: Weight[_internal].schema.optional(),
  dimensions: Dimensions[_internal].schema.optional()
})

const CreateShipmentMultiPackageTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    deliveryConfirmationName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    packages: Joi.array().min(1).items(CreateShipmentMultiPackageTestParamsSchemaPackage).optional(),
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
    dimensions: Dimensions[_internal].schema.optional()
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
    dimensions: Dimensions[_internal].schema.optional(),
  }
});

const RateShipmentWithAllServicesTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
    dimensions: Dimensions[_internal].schema.optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
  }
});

const SameDayPickupTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    pickupServiceName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    address: Address[_internal].schema.optional(),
    contact: ContactInfo[_internal].schema.optional(),
    timeWindow: TimeRange[_internal].schema.optional(),
    shipments: Joi.object({
      deliveryServiceName: Joi.string(),
      packages: Joi.array().items(Joi.object({
        packagingName: Joi.string(),
        dimensions: Dimensions[_internal].schema.optional(),
        weight: Weight[_internal].schema.optional()
      }))
    })
  }
});

const NextDayPickupTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    pickupServiceName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    address: Address[_internal].schema.optional(),
    contact: ContactInfo[_internal].schema.optional(),
    timeWindow: TimeRange[_internal].schema.optional(),
    shipments: Joi.object({
      deliveryServiceName: Joi.string(),
      packages: Joi.array().items(Joi.object({
        packagingName: Joi.string(),
        dimensions: Dimensions[_internal].schema.optional(),
        weight: Weight[_internal].schema.optional()
      }))
    })
  }
});

const TrackShipmentSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    rmaNumber: Joi.string().optional(),
    deliveryConfirmationName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
    dimensions: Dimensions[_internal].schema.optional(),
    label: NewLabel[_internal].schema.optional(),
  }
});

const TrackShipmentReturnSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    rmaNumber: Joi.string().optional(),
    deliveryConfirmationName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
    dimensions: Dimensions[_internal].schema.optional(),
    label: NewLabel[_internal].schema.optional(),
  }
});

const testsSchema = Joi.object({
  createShipment_return: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(createShipmentReturnTestParamsSchema),
    otherwise: createShipmentReturnTestParamsSchema,
  }),
  cancelShipment: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(cancelShipmentTestParamsSchema),
    otherwise: cancelShipmentTestParamsSchema,
  }),
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

  rateShipment_with_all_services: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(RateShipmentWithAllServicesTestParamsSchema),
    otherwise: RateShipmentWithAllServicesTestParamsSchema,
  }),
  schedulePickup_same_day: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(SameDayPickupTestParamsSchema),
    otherwise: SameDayPickupTestParamsSchema,
  }),
  schedulePickup_next_day: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(NextDayPickupTestParamsSchema),
    otherwise: NextDayPickupTestParamsSchema,
  }),
  trackShipment: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(TrackShipmentSchema),
    otherwise: TrackShipmentSchema,
  }),
  trackShipment_return: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(TrackShipmentReturnSchema),
    otherwise: TrackShipmentReturnSchema,
  })

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
