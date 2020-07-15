import {
  CarrierApp,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
  Country,
} from "@shipengine/integration-platform-sdk";
import Suite from "../runner/suite";
import { buildAddressWithContactInfo, buildAddress } from "../factories/address";
import { MethodArgs } from "../runner/method-args";
import { CreateShipmentDomesticOptions } from "../runner/config";
import { DeliveryService } from '@shipengine/integration-platform-sdk/lib/internal';
import { initializeTimeStamps } from '../../utils/time-stamps';

interface TestArgs {
  title: string;
  methodArgs: MethodArgs<NewShipmentPOJO>;
  config: any;
}

// This code is terse. Find context/help below.
// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];

export class CreateShipmentDomestic extends Suite {
  title = "createShipment_domestic";

  buildTestArg(config: CreateShipmentDomesticOptions): TestArgs | undefined {
    const carrierApp = this.app as CarrierApp;

    const dsCopy = Object.assign([], carrierApp.deliveryServices) as DeliveryService[];
    const deliveryServices = findDomesticDeliveryServices(dsCopy);

    const results = pickDeliveryService(deliveryServices);

    if (!results) {
      return undefined;
    }

    const { deliveryService, country } = results;

    const shipFrom = buildAddressWithContactInfo(`${country}-from`);
    const shipTo = buildAddressWithContactInfo(`${country}-to`);
    const { tomorrow } = initializeTimeStamps(shipFrom!.timeZone);

    const defaults = {
      labelFormat: deliveryService.labelFormats[0],
      labelSize: deliveryService.labelSizes[0],
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
      ? `it raises an error when creating a new domestic shipment with ${Object.keys(
        testParams,
      )
        .map(function (k: any) {
          return `${k}: ${_getKeyValue_(k)(testParams)}`;
        })
        .join(", ")}`
      : `it creates a new domestic shipment with ${Object.keys(testParams)
        .map(function (k: any) {
          return `${k}: ${_getKeyValue_(k)(testParams)}`;
        })
        .join(", ")}`;

    return {
      title,
      methodArgs: [this.transaction, newShipmentPOJO],
      config
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
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

          carrierApp.createShipment &&
            (await carrierApp.createShipment(...testArg!.methodArgs));
        },
      );
    });
  }
}

type DomesticDeliveryService = Array<{ deliveryService: DeliveryService, domesticCountries: Country[] }>;

function findDomesticDeliveryServices(deliveryServices: DeliveryService[]): DomesticDeliveryService {

  const domesticDS: DomesticDeliveryService = [];

  for (let ds of deliveryServices) {
    const domesticCountries = [];
    for (let country of ds.originCountries) {
      if (ds.destinationCountries.includes(country)) {
        domesticCountries.push(country);
      }
    }

    if (domesticCountries.length > 0) {
      domesticDS.push({ deliveryService: ds, domesticCountries })
    }
  }

  return domesticDS;
}

/**
 * Currently, just return the first valid domestic delivery service that we have an address for
 */
function pickDeliveryService(deliveryServices: DomesticDeliveryService): { deliveryService: DeliveryService, country: Country } | undefined {

  for (let ds of deliveryServices) {
    for (let domesticCountry of ds.domesticCountries) {
      if (buildAddress(`${domesticCountry}-from`)) {
        return { deliveryService: ds.deliveryService, country: domesticCountry };
      }
    }
  }

  return undefined;
}
