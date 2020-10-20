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
import { SalesOrderIdentifier, SalesOrderPackageItem } from '@shipengine/connect-sdk/lib/internal';

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

const acknowledgeOrdersTestParamsSchema = Joi.object({
  notifications: Joi.array().min(1).items(Joi.object({
      id: Joi.string(),
      identifiers: Joi.object().keys().unknown(),
      orderNumber: Joi.string(),
      importedDate: Joi.string(),
  })).optional(),
});


const shipmentCreatedTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    trackingURL: Joi.string(),
    salesOrder: SalesOrderIdentifier[_internal].schema,
    carrierCode: Joi.string(),
    carrierServiceCode: Joi.string(),
    shipFrom: AddressWithContactInfo[_internal].schema,
    shipTo: AddressWithContactInfo[_internal].schema,
    shipDateTime: DateTimeZone[_internal].schema,
    contents: SalesOrderPackageItem[_internal].schema,
    accessToken: Joi.string()
  }
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

const cancelShipmentsMultipleTestParamsSchema = Joi.object(
  Object.assign(
    baseTestParamValidations,
    {
      shipments: Joi.array().items({
        deliveryServiceName: Joi.string().optional(),
        shipDateTime: DateTimeZone[_internal].schema.optional(),
        shipFrom: AddressWithContactInfo[_internal].schema.optional(),
        shipTo: AddressWithContactInfo[_internal].schema.optional(),
        weight: Weight[_internal].schema.optional(),
        dimensions: Dimensions[_internal].schema.optional()
      })
    }
  )
);

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

const createShipmentMultiPackageTestParamsSchemaPackage = Joi.object({
  packagingName: Joi.string().optional(),
  label: NewLabel[_internal].schema.optional(),
  weight: Weight[_internal].schema.optional(),
  dimensions: Dimensions[_internal].schema.optional()
})

const createShipmentMultiPackageTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    deliveryConfirmationName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    packages: Joi.array().min(1).items(createShipmentMultiPackageTestParamsSchemaPackage).optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
  }
})

const createShipmentWithInsuranceTestParamsSchema = Joi.object({
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

const rateShipmentTestParamsSchema = Joi.object({
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

const rateShipmentReturnTestParamsSchema = Joi.object({
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

const rateShipmentWithAllServicesTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    shipFrom: AddressWithContactInfo[_internal].schema.optional(),
    shipTo: AddressWithContactInfo[_internal].schema.optional(),
    weight: Weight[_internal].schema.optional(),
    dimensions: Dimensions[_internal].schema.optional(),
    shipDateTime: DateTimeZone[_internal].schema.optional(),
  }
});

const sameDayPickupTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    pickupServiceName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    address: Address[_internal].schema.optional(),
    contact: ContactInfo[_internal].schema.optional(),
    timeWindow: TimeRange[_internal].schema.optional(),
    shipments: Joi.array().items({
      deliveryServiceName: Joi.string(),
      packages: Joi.array().items(Joi.object({
        packagingName: Joi.string(),
        dimensions: Dimensions[_internal].schema.optional(),
        weight: Weight[_internal].schema.optional()
      }))
    })
  }
});

const cancelPickupsSamedayTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    pickupServiceName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    address: Address[_internal].schema.optional(),
    contact: ContactInfo[_internal].schema.optional(),
    timeWindow: TimeRange[_internal].schema.optional(),
    shipments: Joi.array().items({
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

const cancelPickupsNextdayTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    pickupServiceName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    address: Address[_internal].schema.optional(),
    contact: ContactInfo[_internal].schema.optional(),
    timeWindow: TimeRange[_internal].schema.optional(),
    shipments: Joi.array().items({
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

const cancelPickupsMultiShipmentTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    pickupServiceName: Joi.string().optional(),
    address: Address[_internal].schema.optional(),
    contact: ContactInfo[_internal].schema.optional(),
    timeWindow: TimeRange[_internal].schema.optional(),
    shipments: Joi.array().items({
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

const nextDayPickupTestParamsSchema = Joi.object({
  ...baseTestParamValidations,
  ...{
    pickupServiceName: Joi.string().optional(),
    deliveryServiceName: Joi.string().optional(),
    address: Address[_internal].schema.optional(),
    contact: ContactInfo[_internal].schema.optional(),
    timeWindow: TimeRange[_internal].schema.optional(),
    shipments: Joi.array().items({
      deliveryServiceName: Joi.string(),
      packages: Joi.array().items(Joi.object({
        packagingName: Joi.string(),
        dimensions: Dimensions[_internal].schema.optional(),
        weight: Weight[_internal].schema.optional()
      }))
    })
  }
});

const schedulePickupMultiShipmentTestParamsSchema = Joi.object({
    ...baseTestParamValidations,
    ...{
      pickupServiceName: Joi.string().optional(),
      deliveryServiceName: Joi.string().optional(),
      address: Address[_internal].schema.optional(),
      contact: ContactInfo[_internal].schema.optional(),
      timeWindow: TimeRange[_internal].schema.optional(),
      shipments: Joi.array().items({
        deliveryServiceName: Joi.string(),
        packages: Joi.array().items(Joi.object({
          packagingName: Joi.string(),
          dimensions: Dimensions[_internal].schema.optional(),
          weight: Weight[_internal].schema.optional()
        }))
      })
    }
  }
);

const trackShipmentSchema = Joi.object({
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

const trackShipmentReturnSchema = Joi.object({
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
  acknowledgeOrders: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(acknowledgeOrdersTestParamsSchema),
    otherwise: acknowledgeOrdersTestParamsSchema,
  }),
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
    then: Joi.array().items(createShipmentMultiPackageTestParamsSchema),
    otherwise: createShipmentMultiPackageTestParamsSchema,
  }),
  createShipment_with_insurance: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(createShipmentWithInsuranceTestParamsSchema),
    otherwise: createShipmentWithInsuranceTestParamsSchema,
  }),
  rateShipment: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(rateShipmentTestParamsSchema),
    otherwise: rateShipmentTestParamsSchema,
  }),

  rateShipment_return: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(rateShipmentReturnTestParamsSchema),
    otherwise: rateShipmentReturnTestParamsSchema,
  }),

  rateShipment_with_all_services: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(rateShipmentWithAllServicesTestParamsSchema),
    otherwise: rateShipmentWithAllServicesTestParamsSchema,
  }),

  cancelPickups_same_day: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(cancelPickupsSamedayTestParamsSchema),
    otherwise: cancelPickupsSamedayTestParamsSchema,
  }),
  cancelPickups_next_day: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(cancelPickupsNextdayTestParamsSchema),
    otherwise: cancelPickupsNextdayTestParamsSchema,
  }),
  cancelPickups_multi_shipment: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(cancelPickupsMultiShipmentTestParamsSchema),
    otherwise: cancelPickupsMultiShipmentTestParamsSchema,
  }),
  schedulePickup_same_day: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(sameDayPickupTestParamsSchema),
    otherwise: sameDayPickupTestParamsSchema,
  }),
  schedulePickup_next_day: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(nextDayPickupTestParamsSchema),
    otherwise: nextDayPickupTestParamsSchema,
  }),
  schedulePickup_multi_shipment: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(schedulePickupMultiShipmentTestParamsSchema),
    otherwise: schedulePickupMultiShipmentTestParamsSchema,
  }),
  shipmentCreated: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(shipmentCreatedTestParamsSchema),
    otherwise: shipmentCreatedTestParamsSchema,
  }),
  trackShipment: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(trackShipmentSchema),
    otherwise: trackShipmentSchema,
  }),
  trackShipment_return: Joi.alternatives().conditional(Joi.array(), {
    then: Joi.array().items(trackShipmentReturnSchema),
    otherwise: trackShipmentReturnSchema,
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
