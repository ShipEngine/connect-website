import { DeliveryService, PickupService, LengthUnit, WeightUnit } from "@shipengine/connect-sdk";
import { CarrierApp, PickupRequestPOJO, PickupShipmentPOJO, PickupPackagePOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import { SchedulePickupNextDayTestParams, SchedulePickupNextDayConfigOptions } from "../runner/config/schedule-pickup-next-day";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import objectToTestTitle from "../utils/object-to-test-title";
import useShipmentAddresses from '../utils/use-shipment-addresses';
import findDeliveryServiceByName from '../utils/find-delivery-service-by-name';
import findPickupServiceByName from '../utils/find-pickup-service-by-name';
import { findDomesticDeliveryService } from '../utils/find-domestic-delivery-service';
import Test from '../runner/test';
import { buildAddress } from '../factories/address';
import findPackagingByName from '../utils/find-packaging-by-name';

interface TestArgs {
  title: string;
  methodArgs: PickupRequestPOJO;
  config: unknown;
  testParams: SchedulePickupNextDayTestParams;
}

export class SchedulePickupNextDay extends Suite {
  title = "schedulePickup_next_day";

  private deliveryService: DeliveryService | undefined;

  private pickupService: PickupService | undefined;

  private setDeliveryService(
    config: SchedulePickupNextDayConfigOptions,
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

  private setPickupService(config: SchedulePickupNextDayConfigOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (config.pickupServiceName) {
      this.pickupService = findPickupServiceByName(config.pickupServiceName, carrierApp);
    }

    else if (carrierApp.pickupServices.length > 0) {
      this.pickupService = carrierApp.pickupServices[0];
    }
  }

  buildTestArg(config: SchedulePickupNextDayConfigOptions): TestArgs | undefined {
    const carrierApp = this.app as CarrierApp;
    this.setPickupService(config);
    this.setDeliveryService(config);

    if (!this.deliveryService || !this.pickupService) return undefined;
    const [shipFrom, shipTo] = useShipmentAddresses(this.deliveryService);

    if (!shipTo || !shipFrom) return undefined;

    const address = buildAddress(`${shipFrom.country}-from`);

    const { tomorrowEarlyAM, tomorrowEvening } = initializeTimeStamps();

    const defaults: SchedulePickupNextDayTestParams = {
      pickupServiceName: this.pickupService.name,
      deliveryServiceName: this.deliveryService.name,
      address,
      contact: { name: "John Doe" },
      timeWindow: {
        startDateTime: tomorrowEarlyAM,
        endDateTime: tomorrowEvening
      },
      shipments: [{
        deliveryServiceName: this.deliveryService.name,
        packages: [
          {
            packagingName: this.deliveryService.packaging[0].name,
            dimensions: {
              length: 12,
              width: 12,
              height: 12,
              unit: LengthUnit.Inches
            },
            weight: {
              unit: WeightUnit.Pounds,
              value: 5.0
            }
          }
        ]
      }]
    };

    const testParams = reduceDefaultsWithConfig<
      SchedulePickupNextDayTestParams
    >(defaults, config);

    const shipments: PickupShipmentPOJO[] = testParams.shipments.map((shipmentParams) => {
      const shipment: PickupShipmentPOJO = {
        deliveryService: findDeliveryServiceByName(shipmentParams.deliveryServiceName, carrierApp),
        packages: shipmentParams.packages.map((pkgParams) => {
          const pkg: PickupPackagePOJO = {
            packaging: findPackagingByName(pkgParams.packagingName, carrierApp),
            dimensions: pkgParams.dimensions,
            weight: pkgParams.weight
          };

          return pkg;
        })
      }

      return shipment;
    });

    const rateCriteriaPOJO: PickupRequestPOJO = {
      pickupService: findPickupServiceByName(testParams.pickupServiceName, carrierApp),
      address: testParams.address,
      timeWindow: testParams.timeWindow,
      contact: testParams.contact,
      shipments
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when scheduling a next day pickup with ${objectToTestTitle(
        testParams,
      )}`
      : `it schedules a next day pickup with ${objectToTestTitle(
        testParams,
      )}`;

    return {
      title,
      methodArgs: rateCriteriaPOJO,
      config,
      testParams
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: SchedulePickupNextDayConfigOptions) => {
        return this.buildTestArg(config);
      });
    }

    const config = this.config as SchedulePickupNextDayConfigOptions;
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
          if (!carrierApp.schedulePickup) {
            throw new Error("schedulePickup is not implemented");
          }

          await carrierApp.schedulePickup(transaction, testArg.methodArgs);

        }
      );
    });
  }
}
