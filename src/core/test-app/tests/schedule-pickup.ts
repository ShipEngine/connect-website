import {
  CarrierApp,
  Address,
  DeliveryService,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
  Country,
  PickupRequestPOJO,
  PickupService,
} from "@shipengine/integration-platform-sdk";
import Suite from "../runner/suite";
import { buildAddress, buildAddressWithContactInfo } from "../factories/address";
import { MethodArgs } from "../runner/method-args";
import { SchedulePickupOptions } from "../runner/config";
import { initializeTimeStamps } from '../../utils/time-stamps';
import { getPickupServiceByName } from './utils';
import { buildContactInfo } from '../factories/contact-info';

interface TestArgs {
  title: string;
  methodArgs: MethodArgs<PickupRequestPOJO>;
  config: any;
}

export class SchedulePickup extends Suite {
  title = "schedulePickup";
  
  private pickupService?: PickupService | undefined;

  private setPickupService(config: SchedulePickupOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (config.pickupServiceName) {

      this.pickupService = getPickupServiceByName(config.pickupServiceName, carrierApp);

      if (!this.pickupService)
        throw new Error(
          `pickupServiceName: ${config.pickupServiceName} does not exist`,
        );
      return;
    }

    else {
      // Currently just select the first available pickup service

      if (carrierApp.pickupServices.length > 0) {
        this.pickupService = carrierApp.pickupServices[0];
      }
    }
  }

  buildTestArg(config: SchedulePickupOptions): TestArgs | undefined {
    const carrierApp = this.app as CarrierApp;

    this.setPickupService(config);

    if (!this.pickupService) return undefined;

    // generate an address based on the first country that the carrier ships to or from.
    const defaultCountry = carrierApp.countries.find((country) => {
      if(buildAddress(`${country}-from`)) {
        return true;
      }
    });

    if(!defaultCountry) return undefined;
    
    const address = buildAddress(`${defaultCountry}-from`);
    
    const { tomorrowEarlyAM, tomorrow } = initializeTimeStamps(address.timeZone);

    const defaults: SchedulePickupOptions = {
      pickupServiceName: this.pickupService.name,
      timeWindow: {
        startDateTime: tomorrowEarlyAM,
        endDateTime: tomorrow
      },
      address,
      contact: buildContactInfo(`${defaultCountry}-from`),
      notes: "",
      shipments: this.deliveryService.packaging[0].name
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
      return this.config.map((config: SchedulePickupOptions) => {
        return this.buildTestArg(config);
      });
    } else {
      const config = this.config as SchedulePickupOptions;

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
          carrierApp.schedulePickup &&
            (await carrierApp.schedulePickup(...testArg!.methodArgs));
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
function selectPickupRequestService(pickupServices: PickupService[]): PickupService | undefined {

  for (let ds of pickupServices) {
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

function parseTitle(testParams: SchedulePickupOptions, key: any): string {
  
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