import {
  CarrierApp,
  Address,
  DeliveryService,
  RateCriteriaPOJO,
  WeightUnit,
  Country,
  PackageRateCriteriaPOJO,
  AddressWithContactInfoPOJO,
} from "@shipengine/integration-platform-sdk";
import Suite from "../runner/suite";
import { buildAddressWithContactInfo } from "../factories/address";
import { RateShipmentOptions } from "../runner/config";
import { initializeTimeStamps } from '../../utils/time-stamps';
import { getDeliveryServiceByName, findMatchingDeliveryServiceCountries } from './utils';

interface TestArgs {
  title: string;
  methodArgs: RateCriteriaPOJO;
  config: any;
}

export class RateShipment extends Suite {
  title = "rateShipment";

  private deliveryServices?: DeliveryService[] = [];
  private shipFrom?: AddressWithContactInfoPOJO;
  private shipTo?: AddressWithContactInfoPOJO;

  private setDeliveryServices(config: RateShipmentOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (Array.isArray(config.deliveryServiceNames)) {

      for (let dsName of config.deliveryServiceNames) {
        const ds = getDeliveryServiceByName(dsName, carrierApp);
        if (!ds) {
          throw new Error(
            `deliveryServiceName: ${dsName} does not exist`,
          );
        }
        this.deliveryServices?.push(ds);
        return;
      }
    }
    else if (typeof config.deliveryServiceNames === "string") {
      const ds = getDeliveryServiceByName(config.deliveryServiceNames, carrierApp);
      if (!ds) {
        throw new Error(
          `deliveryServiceName: ${config.deliveryServiceNames} does not exist`,
        );
      }
      this.deliveryServices = [ds];
    }
    else if (carrierApp.deliveryServices) {
      this.deliveryServices = Object.assign([],carrierApp.deliveryServices);
    }
  }

  private setAddresses(config: RateShipmentOptions, originCountries: Country[], destinationCountries: Country[]) {
    if (config.shipFrom) {
      this.shipFrom = buildAddressWithContactInfo(`${config.shipFrom.country}-from`);
    }
    else {
      for(let oc of originCountries) {
        if(buildAddressWithContactInfo(`${oc}-from`)) {
          this.shipFrom = buildAddressWithContactInfo(`${oc}-from`);
        }
      }
    }

    if (config.shipTo) {
      this.shipTo = buildAddressWithContactInfo(`${config.shipTo.country}-from`);
    }
    else {
      for(let dc of destinationCountries) {
        if(buildAddressWithContactInfo(`${dc}-from`)) {
          this.shipTo = buildAddressWithContactInfo(`${dc}-from`);
        }
      }
    }
  }

  buildTestArg(config: RateShipmentOptions): TestArgs | undefined {
    this.setDeliveryServices(config);

    if (!this.deliveryServices) return undefined;

    const results = findMatchingDeliveryServiceCountries(this.deliveryServices);

    this.setAddresses(config, results.originCountries, results.destinationCountries);

    if (!this.shipTo || !this.shipFrom) return undefined;

    const { tomorrow } = initializeTimeStamps(this.shipFrom.timeZone);

    const defaults: RateShipmentOptions = {
      deliveryServiceNames: this.deliveryServices.map(ds => ds.name),
      shipDateTime: tomorrow,
      shipFrom: this.shipFrom,
      shipTo: this.shipTo,
      weight: {
        unit: WeightUnit.Pounds,
        value: 50.0
      },
      packagingName: this.deliveryServices[0].packaging[0].name
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

    const packageRateCriteriaPOJO: PackageRateCriteriaPOJO = {
      packaging: [{
        id: this.deliveryServices[0].packaging[0].id,
      }],
      weight: {
        value: testParams.weight.value,
        unit: testParams.weight.unit,
      }
    };

    let RateCriteriaPOJO: RateCriteriaPOJO = {
      deliveryServices: this.deliveryServices.map((ds) => { return {id: ds.id} }),
      shipFrom: testParams.shipFrom,
      shipTo: testParams.shipTo!,
      shipDateTime: testParams.shipDateTime,
      packages: [packageRateCriteriaPOJO]
    };


    const title = config.expectedErrorMessage
      ? `it raises an error when retrieving rates with ${Object.keys(
        testParams,
      )
        .map(function (k: any) {
          return parseTitle(testParams, k);
        })
        .join(", ")}`
      : `it retrieves rates with ${Object.keys(testParams)
        .map(function (k: any) {
          return parseTitle(testParams, k);
        })
        .join(", ")}`;

    return {
      title,
      methodArgs: RateCriteriaPOJO,
      config
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: RateShipmentOptions) => {
        return this.buildTestArg(config);
      });
    } else {
      const config = this.config as RateShipmentOptions;

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

          carrierApp.rateShipment! &&
            (await carrierApp.rateShipment!(transaction, testArg!.methodArgs));
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

function parseTitle(testParams: RateShipmentOptions, key: any): string {

  if (key === "shipFrom" || key === "shipTo") {
    const address = Reflect.get(testParams, key) as Address;
    return `${key}: ${address.country}`;
  }

  if(key === "weight") {
    const weight = Reflect.get(testParams, key) as { unit: WeightUnit, value: number }
    return `weightValue: ${weight.value}, weightUnit: ${weight.unit}`;
  }

  return `${key}: ${Reflect.get(testParams, key)}`
}