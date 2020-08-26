import { DeliveryService, PickupService } from "@shipengine/connect-sdk";
import { CarrierApp, PickupRequestPOJO, PickupShipmentPOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import { SameDayPickupTestParams, SameDayPickupConfigOptions } from "../runner/config/same-day-pickup";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import objectToTestTitle from "../utils/object-to-test-title";
import useShipmentAddresses from '../utils/use-shipment-addresses';
import findDeliveryServiceByName from '../utils/find-delivery-service-by-name';
import findPickupServiceByName from '../utils/find-pickup-service-by-name';
import { findDomesticDeliveryService } from '../utils/find-domestic-delivery-service';

interface TestArgs {
  title: string;
  methodArgs: PickupRequestPOJO;
  config: unknown;
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

    const { todayEarly, todayEvening } = initializeTimeStamps();

    const defaults: SameDayPickupTestParams = {
      pickupServiceName: this.pickupService.name,
      deliveryServiceName: this.deliveryService.name,
      address: shipFrom,
      contact: { name: "John Doe" },
      timeWindow: {
        startDateTime: todayEarly,
        endDateTime: todayEvening
      },
      shipments: []
    };

    const testParams = reduceDefaultsWithConfig<
      SameDayPickupTestParams
    >(defaults, config);

    const pickupShipmentPOJO: PickupShipmentPOJO = {
      deliveryService: findDeliveryServiceByName(testParams.deliveryServiceName, carrierApp),
      packages: [{
        packaging: this.deliveryService.packaging[0].code
      }]
    };

    const RateCriteriaPOJO: PickupRequestPOJO = {
      pickupService: findPickupServiceByName(testParams.pickupServiceName, carrierApp),
      address: testParams.address,
      timeWindow: testParams.timeWindow,
      contact: testParams.contact,
      shipments: [pickupShipmentPOJO]
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
          if (!carrierApp.schedulePickup) {
            throw new Error("schedulePickup is not implemented");
          }

          await carrierApp.schedulePickup(transaction, testArg.methodArgs);

        }
      );
    });
  }
}
