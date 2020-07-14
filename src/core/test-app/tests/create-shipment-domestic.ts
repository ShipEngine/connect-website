import {
  CarrierApp,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
  ServiceArea,
  Country,
} from "@shipengine/integration-platform-sdk";
import Suite from "../runner/suite";
import { buildAddressWithContactInfo, buildAddress } from "../factories/address";
import { MethodArgs } from "../runner/method-args";
import { CreateShipmentDomesticOptions } from "../runner/config";
import { DeliveryService } from '@shipengine/integration-platform-sdk/lib/internal';
import { each } from 'lodash';

interface TestArgs {
  methodArgs: MethodArgs<NewShipmentPOJO>;
  config: any;
}

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
    const weightValue = config.weightValue ? Number(config.weightValue) : 50.0;
    const weightUnit = config.weightUnit ? config.weightUnit : WeightUnit.Pounds;
    const shipDateTime = new Date();
    const shipFrom = buildAddressWithContactInfo(`${country}-from`);
    const shipTo = buildAddressWithContactInfo(`${country}-to`);

    let labelFormat = deliveryService.labelFormats[0];
    let labelSize = deliveryService.labelSizes[0];

    const packagePOJO: NewPackagePOJO = {
      deliveryConfirmation: {
        id: deliveryService.deliveryConfirmations[0].id,
      },
      packaging: {
        id: deliveryService.packaging[0].id,
      },
      label: {
        size: labelSize,
        format: labelFormat,
      },
      weight: {
        value: weightValue,
        unit: weightUnit,
      },
    };

    let newShipmentPOJO: NewShipmentPOJO = {
      deliveryService: {
        id: deliveryService.id,
      },
      shipFrom: shipFrom!,
      shipTo: shipTo!,
      shipDateTime: shipDateTime,
      packages: [packagePOJO],
    };

    return {
      methodArgs: [this.transaction, newShipmentPOJO],
      config: config
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
        "it creates a new domestic shipment",
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
