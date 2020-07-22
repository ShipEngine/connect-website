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
import { initializeTimeStamps } from '../../utils/time-stamps';
import { RateShipmentAllServicesTestParams, RateShipmentAllServicesConfigOptions } from '../runner/config/rate-shipment';
import reduceDefaultsWithConfig from '../utils/reduce-defaults-with-config';
import objectToTestTitle from '../utils/object-to-test-title';
import findDeliveryServiceByName from '../utils/find-delivery-service-by-name';

interface TestArgs {
  title: string;
  methodArgs: RateCriteriaPOJO;
  config: any;
  testParams: RateShipmentAllServicesTestParams;
}

export class RateShipmentAllServices extends Suite {
  title = "rateShipment_allServices";

  private deliveryServices?: DeliveryService[] = [];
  private shipFrom?: AddressWithContactInfoPOJO;
  private shipTo?: AddressWithContactInfoPOJO;

  private setDeliveryServices(config: RateShipmentAllServicesConfigOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (Array.isArray(config.deliveryServiceNames)) {

      for (let dsName of config.deliveryServiceNames) {
        const ds = findDeliveryServiceByName(dsName, carrierApp);
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
      const ds = findDeliveryServiceByName(config.deliveryServiceNames, carrierApp);
      if (!ds) {
        throw new Error(
          `deliveryServiceName: ${config.deliveryServiceNames} does not exist`,
        );
      }
      this.deliveryServices = [ds];
    }
    else if (carrierApp.deliveryServices) {
      this.deliveryServices = Object.assign([], carrierApp.deliveryServices);
    }
  }

  private setAddresses(config: RateShipmentAllServicesConfigOptions, originCountries: Country[], destinationCountries: Country[]) {
    if (config.shipFrom) {
      this.shipFrom = buildAddressWithContactInfo(`${config.shipFrom.country}-from`);
    }
    else {
      for (let oc of originCountries) {
        if (buildAddressWithContactInfo(`${oc}-from`)) {
          this.shipFrom = buildAddressWithContactInfo(`${oc}-from`);
        }
      }
    }

    if (config.shipTo) {
      this.shipTo = buildAddressWithContactInfo(`${config.shipTo.country}-from`);
    }
    else {
      for (let dc of destinationCountries) {
        if (buildAddressWithContactInfo(`${dc}-from`)) {
          this.shipTo = buildAddressWithContactInfo(`${dc}-from`);
        }
      }
    }
  }

  buildTestArg(config: RateShipmentAllServicesConfigOptions): TestArgs | undefined {
    this.setDeliveryServices(config);

    if (!this.deliveryServices) return undefined;

    const results = findMatchingDeliveryServiceCountries(this.deliveryServices);

    this.setAddresses(config, results.originCountries, results.destinationCountries);

    if (!this.shipTo || !this.shipFrom) return undefined;

    const { tomorrow } = initializeTimeStamps(this.shipFrom.timeZone);

    const defaults: RateShipmentAllServicesTestParams = {
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

    const testParams = reduceDefaultsWithConfig<
      RateShipmentAllServicesTestParams
    >(defaults, config);

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
      deliveryServices: this.deliveryServices.map((ds) => { return { id: ds.id } }),
      shipFrom: testParams.shipFrom,
      shipTo: testParams.shipTo!,
      shipDateTime: testParams.shipDateTime,
      packages: [packageRateCriteriaPOJO]
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a new international shipment with ${objectToTestTitle(
        testParams,
      )}`
      : `it creates a new international shipment with ${objectToTestTitle(
        testParams,
      )}`;

    return {
      title,
      methodArgs: RateCriteriaPOJO,
      config,
      testParams
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: RateShipmentAllServicesOptions) => {
        return this.buildTestArg(config);
      });
    } else {
      const config = this.config as RateShipmentAllServicesOptions;

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

function parseTitle(testParams: RateShipmentAllServicesOptions, key: any): string {

  if (key === "shipFrom" || key === "shipTo") {
    const address = Reflect.get(testParams, key) as Address;
    return `${key}: ${address.country}`;
  }

  if (key === "weight") {
    const weight = Reflect.get(testParams, key) as { unit: WeightUnit, value: number }
    return `weightValue: ${weight.value}, weightUnit: ${weight.unit}`;
  }

  return `${key}: ${Reflect.get(testParams, key)}`
}