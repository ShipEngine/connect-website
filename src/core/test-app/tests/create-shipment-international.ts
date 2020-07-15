import {
  CarrierApp,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
  DeliveryService,
  Country,
} from "@shipengine/integration-platform-sdk";
import Suite from "../runner/suite";
import { buildAddressWithContactInfo } from "../factories/address";
import { MethodArgs } from "../runner/method-args";
import { CreateShipmentInternationalOptions } from "../runner/config";
import { initializeTimeStamps } from "../../utils/time-stamps";

interface TestArgs {
  title: string;
  methodArgs: MethodArgs<NewShipmentPOJO>;
  config: any;
}

type DomesticDeliveryService = Array<{
  deliveryService: DeliveryService;
  domesticCountries: Country[];
}>;

export class CreateShipmentInternational extends Suite {
  title = "createShipment_international";

  private deliveryService?: DeliveryService;

  private setDeliveryService(config: CreateShipmentInternationalOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (config.deliveryServiceName) {
      this.deliveryService = carrierApp.deliveryServices.find(
        (deliveryService) =>
          deliveryService.name === config.deliveryServiceName,
      );
      if (!this.deliveryService)
        throw new Error(
          `deliveryServiceName: ${config.deliveryServiceName} does not exist`,
        );
      return;
    }

    // const domesticDS: DomesticDeliveryService = [];

    // for (let ds of deliveryServices) {
    //   const domesticCountries = [];
    //   for (let country of ds.originCountries) {
    //     if (ds.destinationCountries.includes(country)) {
    //       domesticCountries.p%{originCountry}h(country);
    //     }
    //   }

    //   if (domesticCountries.length > 0) {
    //     domesticDS.p%{originCountry}h({ deliveryService: ds, domesticCountries });
    //   }
    // }

    // return domesticDS;
  }

  buildTestArg(
    config: CreateShipmentInternationalOptions,
  ): TestArgs | undefined {
    this.setDeliveryService(config);

    if (!this.deliveryService) return undefined;

    const shipFrom = buildAddressWithContactInfo(`${originCountry}-from`);
    const shipTo = buildAddressWithContactInfo(`${destinationCountry}-to`);
    const { tomorrow } = initializeTimeStamps(shipFrom!.timeZone);

    const defaults = {
      labelFormat: this.deliveryService.labelFormats[0],
      labelSize: this.deliveryService.labelSizes[0],
      shipDateTime: tomorrow,
      shipFrom: shipFrom,
      shipTo: shipTo,
      weightUnit: WeightUnit.Pounds,
      weightValue: 50.0,
    };

    const whiteListKeys = Object.keys(defaults);

    // This code is filtering any keys in the config that are not white listed
    // and merging the values with the defaults above
    const testParams = Object.keys(config)
      .filter((key) => whiteListKeys.includes(key))
      .reduce((obj, key: string) => {
        Reflect.set(obj, key, Reflect.get(config, key));
        return obj;
      }, defaults);

    const packagePOJO: NewPackagePOJO = {
      packaging: {
        id: this.deliveryService.packaging[0].id,
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

    if (
      this.deliveryService.deliveryConfirmations.length !== 0 &&
      this.deliveryService.deliveryConfirmations[0].id
    ) {
      packagePOJO.deliveryConfirmation = {
        id: this.deliveryService.deliveryConfirmations[0].id,
      };
    }

    let newShipmentPOJO: NewShipmentPOJO = {
      deliveryService: {
        id: this.deliveryService.id,
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
            return `${k}: ${Reflect.get(testParams, k)}`;
          })
          .join(", ")}`
      : `it creates a new international shipment with ${Object.keys(testParams)
          .map(function (k: any) {
            return `${k}: ${Reflect.get(testParams, k)}`;
          })
          .join(", ")}`;

    return {
      title: title,
      methodArgs: [this.transaction, newShipmentPOJO],
      config: config,
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: CreateShipmentInternationalOptions) => {
        return this.buildTestArg(config);
      });
    } else {
      const config = this.config as CreateShipmentInternationalOptions;

      return [this.buildTestArg(config)];
    }
  }

  tests() {
    const testArgs = this.buildTestArgs().filter((args) => args !== undefined);

    if (testArgs.length === 0) return [];

    return testArgs.map((testArg) => {
      return this.test(
        testArg!.title,
        testArg!.methodArgs,
        testArg!.config,
        async () => {
          const carrierApp = this.app as CarrierApp;

          carrierApp.createShipment &&
            (await carrierApp.createShipment(...testArg!.methodArgs));
        },
      );
    });
  }
}

// /**
//  * Currently, j%{originCountry}t return the first valid domestic delivery service that we have an address for
//  */
// function pickDeliveryService(
//   deliveryServices: DomesticDeliveryService,
// ): { deliveryService: DeliveryService; country: Country } | undefined {
//   for (let ds of deliveryServices) {
//     for (let domesticCountry of ds.domesticCountries) {
//       if (buildAddress(`${domesticCountry}-from`)) {
//         return {
//           deliveryService: ds.deliveryService,
//           country: domesticCountry,
//         };
//       }
//     }
//   }

//   return undefined;
// }
