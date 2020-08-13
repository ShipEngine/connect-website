import {
  DeliveryService,
  WeightUnit,
} from "@shipengine/connect-sdk";

import { CarrierApp, RateCriteriaPOJO, PackageRateCriteriaPOJO} from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import { RateShipmentWithMultipleServicesTestParams, RateShipmentWithMultipleServicesConfigOptions } from "../runner/config/rate-shipment-with-multiple-services";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import objectToTestTitle from "../utils/object-to-test-title";
import { findMatchingDeliveryServicesByCountries } from "../utils/find-matching-delivery-services-by-countries";
import useShipmentAddresses from '../utils/use-shipment-addresses';
import findDeliveryServiceByName from '../utils/find-delivery-service-by-name';

interface TestArgs {
  title: string;
  methodArgs: RateCriteriaPOJO;
  config: any;
  testParams: RateShipmentWithMultipleServicesTestParams;
}

export class RateShipmentWithMultipleServices extends Suite {
  title = "rateShipment_with_multiple_services";

  private deliveryServices: DeliveryService[] = [];

  private setDeliveryServices(config: RateShipmentWithMultipleServicesConfigOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (config.deliveryServiceNames && config.deliveryServiceNames.length > 0) {
      if (config.deliveryServiceNames.length === 1) {
        throw new Error("You must specify more than one delivery service");
      }

      const deliveryServices = config.deliveryServiceNames.map(name => findDeliveryServiceByName(name, carrierApp));
      try {
        findMatchingDeliveryServicesByCountries(deliveryServices);
      }
      catch {
        throw new Error("Configured delivery services must share origin and destination countries for correct rate generation");
      }

      this.deliveryServices = deliveryServices;
    }

    else if (carrierApp.deliveryServices) {
      // Loop through all delivery services and then subsets until a set of shared countries are found.
      // This is a very simple and naive approach that can be expanded upon later if needed.
      const dsCopy = Object.assign([], carrierApp.deliveryServices);
      let results;
      try {
        results = findMatchingDeliveryServicesByCountries(dsCopy);
      } catch {
        results = undefined;
      }

      while (!results && dsCopy.length > 1) {
        // Remove a delivery service and check if the new array shares a set of countries
        dsCopy.pop();
        try {
          results = findMatchingDeliveryServicesByCountries(dsCopy);
        } catch {
          results = undefined;
        }
      }

      if (results) {
        this.deliveryServices = dsCopy;
      }
    }
  }

  buildTestArg(config: RateShipmentWithMultipleServicesConfigOptions): TestArgs | undefined {
    const carrierApp = this.app as CarrierApp;
    if (carrierApp.deliveryServices.length < 2) return undefined;
    this.setDeliveryServices(config);

    if (this.deliveryServices.length === 0) return undefined;
    const [shipFrom, shipTo] = useShipmentAddresses(this.deliveryServices[0]);

    if (!shipTo || !shipFrom) return undefined;

    const { tomorrow } = initializeTimeStamps(shipFrom.timeZone);

    const defaults: RateShipmentWithMultipleServicesTestParams = {
      deliveryServiceNames: this.deliveryServices.map(ds => ds.name),
      shipDateTime: tomorrow,
      shipFrom: shipFrom,
      shipTo: shipTo,
      weight: {
        unit: WeightUnit.Pounds,
        value: 50.0
      },
      packagingName: this.deliveryServices[0].packaging[0].name
    };

    const testParams = reduceDefaultsWithConfig<
      RateShipmentWithMultipleServicesTestParams
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
      deliveryServices: testParams.deliveryServiceNames.map(name => findDeliveryServiceByName(name,  carrierApp)),
      shipFrom: testParams.shipFrom,
      shipTo: testParams.shipTo!,
      shipDateTime: testParams.shipDateTime,
      packages: [packageRateCriteriaPOJO]
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a new shipment rate with multiple services with ${objectToTestTitle(
        testParams,
      )}`
      : `it creates a new shipment rate with multiple services with ${objectToTestTitle(
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
      return this.config.map((config: RateShipmentWithMultipleServicesConfigOptions) => {
        return this.buildTestArg(config);
      });
    } else {
      const config = this.config as RateShipmentWithMultipleServicesConfigOptions;

      return [this.buildTestArg(config)];
    }
  }

  tests() {
    const testArgs = this.buildTestArgs().filter(args => args !== undefined) as TestArgs[];

    if (testArgs.length === 0) {
      return [];
    }
    return testArgs.map((testArg) => {
      return this.test(
        testArg.title,
        testArg.methodArgs,
        testArg.config,
        async () => {
          const carrierApp = this.app as CarrierApp;

          const transaction = await this.transaction(testArg.config);

          // This should never actually throw because we handle this case up stream.
          if (!carrierApp.rateShipment) {
            throw new Error("rateShipment is not implemented");
          }

          const rates = await carrierApp.rateShipment!(transaction, testArg!.methodArgs);

          //Check that all delivery services that were passed in are included in the response
          for (let ds of testArg.methodArgs.deliveryServices!) {
            if(!rates.find(rate=> rate.deliveryService.id === ds.id)) {
              const missingDS = carrierApp.deliveryServices.find(service => service.id === ds.id);

              throw new Error(`Rate for delivery service '${missingDS!.name}' is missing from the response`);
            }
          }

        },
      );
    });
  }
}
