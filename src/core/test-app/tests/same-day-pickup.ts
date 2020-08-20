import {
  DeliveryService,
  WeightUnit,
  Definition,
  PickupService,
} from "@shipengine/connect-sdk";

import { CarrierApp, RateCriteriaPOJO, PackageRateCriteriaPOJO, PickupRequestPOJO } from "@shipengine/connect-sdk/lib/internal";

import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import { SameDayPickupTestParams, SameDayPickupConfigOptions } from "../runner/config/same-day-pickup";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import objectToTestTitle from "../utils/object-to-test-title";
import useShipmentAddresses from '../utils/use-shipment-addresses';
import findDeliveryServiceByName from '../utils/find-delivery-service-by-name';
import findPickupServiceByName from '../utils/find-pickup-service-by-name';

interface TestArgs {
  title: string;
  methodArgs: PickupRequestPOJO;
  config: any;
  testParams: SameDayPickupTestParams;
}

export class SameDayPickup extends Suite {
  title = "pickup_same_day";

  private deliveryService: DeliveryService | undefined;
  private pickupService: PickupService | undefined;

  private setDeliveryService(
    config: SameDayPickupConfigOptions,
  ): void {
    const carrierApp = this.app as CarrierApp;

    if (config.deliveryServiceName) {
      this.deliveryService = findDeliveryServiceByName(
        config.deliveryServiceName,
        carrierApp,
      );
    } else {
      try {
        this.deliveryService = findDomesticDeliveryService(carrierApp);
      } catch {
        this.deliveryService = undefined;
      }
    }
  }


  private setPickupService(config: SameDayPickupConfigOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (config.pickupServiceName) {
      this.pickupService = findPickupServiceByName(config.pickupServiceName, carrierApp);
    }

    else if (carrierApp.deliveryServices) {
      for (const ds of carrierApp.deliveryServices) {
        const [shipFrom, shipTo] = useShipmentAddresses(ds);
        if (shipFrom && shipTo) {
          this.deliveryService = ds;
        }
      }
    }
  }

  buildTestArg(config: SameDayPickupConfigOptions): TestArgs | undefined {
    const carrierApp = this.app as CarrierApp;
    this.setPickupService(config);
    this.setDeliveryService(config);

    if (!this.deliveryService || !this.pickupService) return undefined;
    const [shipFrom, shipTo] = useShipmentAddresses(this.deliveryService);

    if (!shipTo || !shipFrom) return undefined;

    const { tomorrow } = initializeTimeStamps();

    const defaults: SameDayPickupTestParams = {
      deliveryServiceName: this.deliveryService.name,
      timeWindow: tomorrow,
      shipFrom: shipFrom,
      shipTo: shipTo,
      packagingName: this.deliveryService.packaging[0].name
    };

    const testParams = reduceDefaultsWithConfig<
      SameDayPickupTestParams
    >(defaults, config);

    const packageRateCriteriaPOJO: PackageRateCriteriaPOJO = {
      packaging: {
        id: this.deliveryService.packaging[0].id,
      },
      weight: {
        value: testParams.weight.value,
        unit: testParams.weight.unit,
      }
    };

    const RateCriteriaPOJO: PickupRequestPOJO = {
      deliveryService: findDeliveryServiceByName(this.deliveryService.name, carrierApp),
      shipFrom: testParams.shipFrom,
      shipTo: testParams.shipTo!,
      shipDateTime: testParams.shipDateTime,
      packages: [packageRateCriteriaPOJO]
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a new shipment rate with ${objectToTestTitle(
        testParams,
      )}`
      : `it creates a new shipment rate with ${objectToTestTitle(
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
      return this.config.map((config: SameDayPickupConfigOptions) => {
        return this.buildTestArg(config);
      });
    }

    const config = this.config as SameDayPickupConfigOptions;
    return [this.buildTestArg(config)];
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

          // Check that the delivery service that was passed in is included in the response
          if (isDefinition(testArg.methodArgs.deliveryService)) {
            const configuredDeliveryServiceID = Reflect.get(testArg.methodArgs.deliveryService, "id");
            if (!rates.find(rate => rate.deliveryService.id === configuredDeliveryServiceID)) {
              const missingDS = carrierApp.deliveryServices.find(deliveryService => deliveryService.id === configuredDeliveryServiceID);

              throw new Error(`Rate for delivery service '${missingDS!.name}' is missing from the response`);
            }
          }
        }
      );
    });
  }
}

function isDefinition(obj: unknown): obj is Definition {
  return (typeof obj === "object") && ("id" in obj!);
}