import {
  DeliveryService,
  WeightUnit,
  Definition,
  LengthUnit,
} from "@shipengine/connect-sdk";

import { CarrierApp, RateCriteriaPOJO, PackageRateCriteriaPOJO } from "@shipengine/connect-sdk/lib/internal";

import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import { RateShipmentReturnTestParams, RateShipmentReturnConfigOptions } from "../runner/config/rate-return-shipment";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import objectToTestTitle from "../utils/object-to-test-title";
import useShipmentAddresses from '../utils/use-shipment-addresses';
import findDeliveryServiceByName from '../utils/find-delivery-service-by-name';
import Test from '../runner/test';

interface TestArgs {
  title: string;
  methodArgs: RateCriteriaPOJO;
  config: unknown;
  testParams: RateShipmentReturnTestParams;
}

export class RateShipmentReturn extends Suite {
  title = "rateShipment_return";

  private deliveryService: DeliveryService | undefined;

  private setDeliveryService(config: RateShipmentReturnConfigOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (config.deliveryServiceName) {
      this.deliveryService = findDeliveryServiceByName(config.deliveryServiceName, carrierApp);
      if(!this.deliveryService.supportsReturns) {
        throw new Error (
          `connect.config.js deliveryServiceName: '${config.deliveryServiceName}' does not support returns`
        );
      }
    }

    else if (carrierApp.deliveryServices) {
      for (const ds of carrierApp.deliveryServices) {
        if(ds.supportsReturns) {
          const [shipFrom, shipTo] = useShipmentAddresses(ds);
          if (shipFrom && shipTo) {
            this.deliveryService = ds;
          }
        }
      }
    }
  }

  buildTestArg(config: RateShipmentReturnConfigOptions): TestArgs | undefined {
    const carrierApp = this.app as CarrierApp;
    this.setDeliveryService(config);

    if (!this.deliveryService) return undefined;
    const [shipFrom, shipTo] = useShipmentAddresses(this.deliveryService);

    if (!shipTo || !shipFrom) return undefined;

    const { tomorrow } = initializeTimeStamps();

    const defaults: RateShipmentReturnTestParams = {
      deliveryServiceName: this.deliveryService.name,
      shipDateTime: tomorrow,
      shipFrom: shipFrom,
      shipTo: shipTo,
      weight: {
        unit: WeightUnit.Pounds,
        value: 50.0
      },
      dimensions: {
        length: 12,
        width: 12,
        height: 12,
        unit: LengthUnit.Inches
      },
      packagingName: this.deliveryService.packaging[0].name
    };

    const testParams = reduceDefaultsWithConfig<
      RateShipmentReturnTestParams
    >(defaults, config);

    const packageRateCriteriaPOJO: PackageRateCriteriaPOJO = {
      packaging: {
        id: this.deliveryService.packaging[0].id,
      },
      weight: {
        value: testParams.weight.value,
        unit: testParams.weight.unit,
      },
      dimensions: {
        length: testParams.dimensions.length,
        width: testParams.dimensions.width,
        height: testParams.dimensions.height,
        unit: testParams.dimensions.unit
      }
    };

    const RateCriteriaPOJO: RateCriteriaPOJO = {
      deliveryService: findDeliveryServiceByName(this.deliveryService.name, carrierApp),
      shipFrom: testParams.shipFrom,
      shipTo: testParams.shipTo,
      shipDateTime: testParams.shipDateTime,
      packages: [packageRateCriteriaPOJO]
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a new shipment return rate with ${objectToTestTitle(
        testParams,
      )}`
      : `it creates a new shipment return rate with ${objectToTestTitle(
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
      return this.config.map((config: RateShipmentReturnConfigOptions) => {
        return this.buildTestArg(config);
      });
    }

    const config = this.config as RateShipmentReturnConfigOptions;
    return [this.buildTestArg(config)];
  }

  tests(): Test[] {
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

          const rates = await carrierApp.rateShipment(transaction, testArg.methodArgs);

          // Check that the delivery service that was passed in is included in the response
          if (isDefinition(testArg.methodArgs.deliveryService)) {
            const configuredDeliveryServiceID = Reflect.get(testArg.methodArgs.deliveryService, "id") as string;
            if (!rates.find(rate => rate.deliveryService.id === configuredDeliveryServiceID)) {
              const missingDS = carrierApp.deliveryServices.find(deliveryService => deliveryService.id === configuredDeliveryServiceID) as DeliveryService;

              throw new Error(`Rate for delivery service '${missingDS.name}' is missing from the response`);
            }
          }
        }
      );
    });
  }
}

function isDefinition(obj: unknown): obj is Definition {
  return typeof obj === "object" && obj !== null && "id" in obj;
}
