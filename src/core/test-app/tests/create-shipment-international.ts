import {
  CarrierApp,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
  ServiceArea,
} from "@shipengine/integration-platform-sdk";
import Suite from "../runner/suite";
import { buildAddressWithContactInfo } from "../factories/address";
import { MethodArgs } from "../runner/method-args";
import { CreateShipmentDomesticOptions } from "../runner/config";
import { initializeTimeStamps, getTimeTitle } from "../../utils/time-stamps";

interface TestArgs {
  title: string;
  methodArgs: MethodArgs<NewShipmentPOJO>;
  config: any;
}

// This code is terse. Find context/help below.
// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];

export class CreateShipmentInternational extends Suite {
  title = "createShipment_international";

  buildTestArg(config: CreateShipmentDomesticOptions): TestArgs {
    const carrierApp = this.app as CarrierApp;

    let deliveryService;
    // Check to see if the config supplies one

    // Check ServiceArea

    // Pick first one
    deliveryService = carrierApp.deliveryServices.find(
      (deliveryService) => deliveryService.serviceArea === ServiceArea.Domestic,
    );

    if (!deliveryService)
      throw new Error(
        "delivery serivce can not be undefined for createShipment_international",
      );

    const { tomorrow } = initializeTimeStamps("America/Chicago");

    const defaults = {
      labelFormat: deliveryService.labelFormats[0],
      labelSize: deliveryService.labelSizes[0],
      shipDateTime: tomorrow,
      shipFrom: buildAddressWithContactInfo("US-from"),
      shipTo: buildAddressWithContactInfo("US-to"),
      weightUnit: WeightUnit.Pounds,
      weightValue: 50.0,
    };

    let testParams = { ...defaults, ...config };
    const whiteListKeys = Object.keys(defaults);

    testParams = Object.keys(testParams)
      .filter((key) => whiteListKeys.includes(key))
      .reduce((obj, key: string) => {
        obj[key] = testParams[key];
        return obj;
      }, {});

    const packagePOJO: NewPackagePOJO = {
      deliveryConfirmation: {
        id: deliveryService.deliveryConfirmations[0].id,
      },
      packaging: {
        id: deliveryService.packaging[0].id,
      },
      label: {
        size: testParams.labelSize,
        format: testParams.labelFormat,
      },
      weight: {
        value: testParams.weightValue,
        unit: testParams.weightUnit,
      },
    };

    let newShipmentPOJO: NewShipmentPOJO = {
      deliveryService: {
        id: deliveryService.id,
      },
      shipFrom: testParams.shipFrom!,
      shipTo: testParams.shipTo!,
      shipDateTime: testParams.shipDateTime,
      packages: [packagePOJO],
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a new international shipment with ${Object.keys(
          testParams,
        )
          .map(function (k: any) {
            return `${k}: ${_getKeyValue_(k)(testParams)}`;
          })
          .join(", ")}`
      : `it creates a new international shipment with ${Object.keys(testParams)
          .map(function (k: any) {
            return `${k}: ${_getKeyValue_(k)(testParams)}`;
          })
          .join(", ")}`;

    return {
      title: title,
      methodArgs: [this.transaction, newShipmentPOJO],
      config: config,
    };
  }

  buildTestArgs(): TestArgs[] {
    if (Array.isArray(this.config)) {
      return this.config.map((config: CreateShipmentDomesticOptions) => {
        return this.buildTestArg(config);
      });
    } else {
      const config = this.config as CreateShipmentDomesticOptions;

      return [this.buildTestArg(config)];
    }
  }

  tests() {
    return this.buildTestArgs().map((testArg) => {
      return this.test(
        testArg.title,
        testArg.methodArgs,
        testArg.config,
        async () => {
          const carrierApp = this.app as CarrierApp;

          carrierApp.createShipment &&
            (await carrierApp.createShipment(...testArg.methodArgs));
        },
      );
    });
  }
}
