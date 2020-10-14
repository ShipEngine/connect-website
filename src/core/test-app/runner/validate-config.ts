/* eslint-disable camelcase */
import Config from "./config";
import ono from "@jsdevtools/ono";
import {
  AddressWithContactInfo,
  Weight,
  DateTimeZone,
  ContactInfo,
  TimeRange,
  Dimensions,
  Address, Joi
} from "@shipengine/connect-sdk/lib/internal/common";
import { NewLabel } from "@shipengine/connect-sdk/lib/internal/carriers/documents/new-label";
import { _internal, MonetaryValue } from "@shipengine/connect-sdk/lib/internal/common";
import { PickupCancellationReason } from '@shipengine/connect-sdk';
import { ValidationOptions } from 'joi';

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

const connectionFormTestParamsSchema = Joi.object({
  connectionFormData: Joi.object().keys().unknown(),
});

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

const cancelShipmentsSingleTestParamsSchema = Joi.object({
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

const cancelShipmentsMultipleTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...[{
    deliveryServiceName: Joi.string().optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
    dimensions: Dimensions[_internal].schema.optional()
  }]
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

const RateShipmentReturnTestParamsSchema = Joi.object({
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

const CancelPickupsSamedayTestParamsSchema = Joi.object({
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
    }),
    cancellationReason: Joi.string().enum(PickupCancellationReason)
  }
});

const CancelPickupsNextdayTestParamsSchema = Joi.object({
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
    }),
    cancellationReason: Joi.string().enum(PickupCancellationReason)
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
  connect_all_fields: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(connectionFormTestParamsSchema),
    otherwise: connectionFormTestParamsSchema,
  }),
  createShipment_return: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(createShipmentReturnTestParamsSchema),
    otherwise: createShipmentReturnTestParamsSchema,
  }),
  cancelShipments_single: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(cancelShipmentsSingleTestParamsSchema),
    otherwise: cancelShipmentsSingleTestParamsSchema,
  }),
  cancelShipments_multiple: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(cancelShipmentsMultipleTestParamsSchema),
    otherwise: cancelShipmentsMultipleTestParamsSchema,
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

  rateShipment_return: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(RateShipmentReturnTestParamsSchema),
    otherwise: RateShipmentReturnTestParamsSchema,
  }),

  rateShipment_with_all_services: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(RateShipmentWithAllServicesTestParamsSchema),
    otherwise: RateShipmentWithAllServicesTestParamsSchema,
  }),

  cancelPickups_same_day: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(CancelPickupsSamedayTestParamsSchema),
    otherwise: CancelPickupsSamedayTestParamsSchema,
  }),

  cancelPickups_next_day: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(CancelPickupsNextdayTestParamsSchema),
    otherwise: CancelPickupsNextdayTestParamsSchema,
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

export enum ValidateConfigError {
  SchemaInvalid = "ERR_SCHEMA_INVALID"
}

const validateConfig = (config: Config): Config => {
  const { error, value } = schema.validate(config, joiOptions as ValidationOptions);

  if (error) {
    throw ono(error, { code: ValidateConfigError.SchemaInvalid });
  }

  return value as Config;
};

export default validateConfig;
