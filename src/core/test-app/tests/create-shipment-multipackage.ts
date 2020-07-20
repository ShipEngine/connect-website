import {
  CarrierApp,
  Address,
  DeliveryService,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
} from "@shipengine/integration-platform-sdk";
import Suite from "../runner/suite";
import { buildAddressWithContactInfo } from "../factories/address";
import { CreateShipmentMultiPackageOptions } from "../runner/config";
import { initializeTimeStamps } from '../../utils/time-stamps';
import { getDeliveryServiceByName, getPackagingByName, getDeliveryConfirmationByName } from './utils';

interface TestArgs {
  title: string;
  methodArgs: NewShipmentPOJO;
  config: any;
}

export class CreateShipmentMultiPackage extends Suite {
  title = "createShipment_multiPackage";

  private deliveryService?: DeliveryService | undefined;

  private setDeliveryService(config: CreateShipmentMultiPackageOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (config.deliveryServiceName) {

      this.deliveryService = getDeliveryServiceByName(config.deliveryServiceName, carrierApp);

      if (!this.deliveryService)
        throw new Error(
          `deliveryServiceName: ${config.deliveryServiceName} does not exist`,
        );
      return;
    }

    else {
      const deliveryService = carrierApp.deliveryServices[0];
      if (deliveryService) {
        this.deliveryService = deliveryService;
      }
    }
  }

  buildTestArg(config: CreateShipmentMultiPackageOptions): TestArgs | undefined {
    const carrierApp = this.app as CarrierApp;

    this.setDeliveryService(config);

    if (!this.deliveryService) return undefined;

    const shipFrom = buildAddressWithContactInfo(`${this.deliveryService.originCountries[0]}-from`);
    const shipTo = buildAddressWithContactInfo(`${this.deliveryService.destinationCountries[0]}-to`);
    
    if(!shipFrom || !shipTo) return undefined;   
    
    const { tomorrow } = initializeTimeStamps(shipFrom!.timeZone);

    // Make a best guess at the defaults, need to resolve the default vs config based delivery service early
    // on since that determines what address and associated timezones get generated.
    const defaults: CreateShipmentMultiPackageOptions = {
      deliveryServiceName: this.deliveryService.name,

      shipDateTime: tomorrow,
      shipFrom: shipFrom!,
      shipTo: shipTo!,
      packages: [
        {
          packagingName: this.deliveryService.packaging[0].name,
          labelFormat: this.deliveryService.labelFormats[0],
          labelSize: this.deliveryService.labelSizes[0],
          weight: {
            unit: WeightUnit.Pounds,
            value: 50.0
          }
        },
        {
          packagingName: this.deliveryService.packaging[0].name,
          labelFormat: this.deliveryService.labelFormats[0],
          labelSize: this.deliveryService.labelSizes[0],
          weight: {
            unit: WeightUnit.Pounds,
            value: 25.0
          }
        }
      ]
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

    // Hydrate create shipment packages
    const packages = testParams.packages.map((pkgParams) => {
      const packaging = getPackagingByName(pkgParams.packagingName, carrierApp)

      if (!packaging) {
        throw new Error(`Unable to find a package definition for ${pkgParams.packagingName}`);
      }

      let newPackage: NewPackagePOJO = {
        packaging: {
          id: packaging.id,
        },
        label: {
          size: pkgParams.labelSize,
          format: pkgParams.labelFormat,
        },
        weight: {
          value: pkgParams.weight.value,
          unit: pkgParams.weight.unit
        }
      }

      if(pkgParams.deliveryConfirmationName) {
        const deliveryConfirmation = getDeliveryConfirmationByName(pkgParams.deliveryConfirmationName, carrierApp);

        if(!deliveryConfirmation) {
          throw new Error(`Unable to find a delivery confirmation definition for ${pkgParams.deliveryConfirmationName}`);
        }

        newPackage.deliveryConfirmation = deliveryConfirmation;
      }

      return newPackage;
    });

    let newShipmentPOJO: NewShipmentPOJO = {
      deliveryService: {
        id: this.deliveryService.id,
      },
      shipFrom: testParams.shipFrom!,
      shipTo: testParams.shipTo!,
      shipDateTime: testParams.shipDateTime,
      packages
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a new multi-package shipment with ${Object.keys(
        testParams,
      )
        .map(function (k: any) {
          return parseTitle(testParams, k);
        })
        .join(", ")}`
      : `it creates a new multi-package shipment with ${Object.keys(testParams)
        .map(function (k: any) {
          return parseTitle(testParams, k);
        })
        .join(", ")}`;

    return {
      title,
      methodArgs: newShipmentPOJO,
      config
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: CreateShipmentMultiPackageOptions) => {
        return this.buildTestArg(config);
      });
    } else {
      const config = this.config as CreateShipmentMultiPackageOptions;

      return [this.buildTestArg(config)];
    }
  }

  tests() {
    const testArgs = this.buildTestArgs().filter(args => args !== undefined);

    if (testArgs.length === 0) {
      return [];
    }
    return testArgs.map((testArg) => {
      return this.test(
        testArg!.title,
        testArg!.methodArgs,
        testArg!.config,
        async () => {
          const carrierApp = this.app as CarrierApp;

          const transaction = await this.transaction(testArg!.config);

          carrierApp.createShipment &&
            (await carrierApp.createShipment(transaction, testArg!.methodArgs));
        },
      );
    });
  }
}

function parseTitle(testParams: CreateShipmentMultiPackageOptions, key: any): string {

  if (key === "shipFrom" || key === "shipTo") {
    const address = Reflect.get(testParams, key) as Address;
    return `${key}: ${address.country}`;
  }

  if (key === "packages") {
    return `Number of Packages: ${Reflect.get(testParams, key).length}`;
  }

  return `${key}: ${Reflect.get(testParams, key)}`;
}
