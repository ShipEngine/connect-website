import {
  CarrierApp,
  Address,
  DeliveryService,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
  Country,
} from "@shipengine/integration-platform-sdk";
import Suite from "../runner/suite";
import { buildAddress, buildAddressWithContactInfo } from "../factories/address";
import { MethodArgs } from "../runner/method-args";
import { CreateShipmentDomesticOptions } from "../runner/config";
import { initializeTimeStamps } from '../../utils/time-stamps';
import { getDeliveryServiceByName } from './utils';

interface TestArgs {
  title: string;
  methodArgs: MethodArgs<NewShipmentPOJO>;
  config: any;
}

export class CreateShipmentDomestic extends Suite {
  title = "createShipment_domestic";
  
  private deliveryService?: DeliveryService | undefined;

  private setDeliveryService(config: CreateShipmentDomesticOptions): void {
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
      const dsCopy = Object.assign([], carrierApp.deliveryServices) as DeliveryService[];
      const deliveryServices = findDomesticDeliveryService(dsCopy);
      const deliveryService = pickDomesticDeliveryService(deliveryServices);
      if (deliveryService) {
        this.deliveryService = deliveryService;
      }
    }
  }

  buildTestArg(config: CreateShipmentDomesticOptions): TestArgs | undefined {
    this.setDeliveryService(config);

    if (!this.deliveryService) return undefined;

    const country = findMatchingDomesticCountry(this.deliveryService);
    const shipFrom = buildAddressWithContactInfo(`${country}-from`);
    const shipTo = buildAddressWithContactInfo(`${country}-to`);
    const { tomorrow } = initializeTimeStamps(shipFrom!.timeZone);

    const defaults: CreateShipmentDomesticOptions = {
      deliveryServiceName: this.deliveryService.name,
      labelFormat: this.deliveryService.labelFormats[0],
      labelSize: this.deliveryService.labelSizes[0],
      shipDateTime: tomorrow,
      shipFrom: shipFrom!,
      shipTo: shipTo!,
      weight: {
        unit: WeightUnit.Pounds,
        value: 50.0
      },
      packagingName: this.deliveryService.packaging[0].name
    };

    if (this.deliveryService.deliveryConfirmations) {
      defaults.deliveryConfirmationName = this.deliveryService.deliveryConfirmations[0].name;
    }

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
        value: testParams.weight.value,
        unit: testParams.weight.unit
      }
    };

    if (this.deliveryService.deliveryConfirmations) {
      packagePOJO.deliveryConfirmation = {
        id: this.deliveryService.deliveryConfirmations[0].id
      }
    }

    if (testParams.deliveryConfirmationName) {
      packagePOJO.deliveryConfirmation = {
        id: this.deliveryService.deliveryConfirmations.find(dc => dc.name === testParams.deliveryConfirmationName)!.id
      }
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
      ? `it raises an error when creating a new domestic shipment with ${Object.keys(
        testParams,
      )
        .map(function (k: any) {
          return parseTitle(testParams, k);
        })
        .join(", ")}`
      : `it creates a new domestic shipment with ${Object.keys(testParams)
        .map(function (k: any) {
          return parseTitle(testParams, k);
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

function findDomesticDeliveryService(deliveryServices: DeliveryService[]): DomesticDeliveryService {

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
function pickDomesticDeliveryService(deliveryServices: DomesticDeliveryService): DeliveryService | undefined {

  for (let ds of deliveryServices) {
    for (let domesticCountry of ds.domesticCountries) {
      if (buildAddress(`${domesticCountry}-from`)) {
        return ds.deliveryService;
      }
    }
  }

  return undefined;
}

function findMatchingDomesticCountry(ds: DeliveryService): Country | undefined {

  for (let country of ds.originCountries) {
    if (ds.destinationCountries.includes(country)) {
      if (buildAddress(`${country}-from`)) {
        return country;
      }
    }
  }
}

function parseTitle(testParams: CreateShipmentDomesticOptions, key: any): string {
  
  if(key === "shipFrom" || key === "shipTo") {
    const address = Reflect.get(testParams, key) as Address;
    return `${key}: ${address.country}`;
  }

  if(key === "weight") {
    const weight = Reflect.get(testParams, key) as { unit: WeightUnit, value: number }
    return `weightValue: ${weight.value}, weightUnit: ${weight.unit}`;
  }

  return `${key}: ${Reflect.get(testParams, key)}`;
}