import { DeliveryService, PickupService, LengthUnit, WeightUnit, PickupCancellationReason } from "@shipengine/connect-sdk";
import { CarrierApp, PickupRequestPOJO, PickupShipmentPOJO, PickupPackagePOJO, PickupCancellationPOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import { CancelPickupsSameDayTestParams, CancelPickupsSameDayConfigOptions } from "../runner/config/cancel-pickups-same-day";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import objectToTestTitle from "../utils/object-to-test-title";
import useShipmentAddresses from '../utils/use-shipment-addresses';
import findDeliveryServiceByName from '../utils/find-delivery-service-by-name';
import findPickupServiceByName from '../utils/find-pickup-service-by-name';
import { findDomesticDeliveryService } from '../utils/find-domestic-delivery-service';
import Test from '../runner/test';
import { buildAddress } from '../factories/address';
import findPackagingByName from '../utils/find-packaging-by-name';
import { v4 } from "uuid";
import { expect } from "chai";

interface TestArgs {
  title: string;
  methodArgs: PickupRequestPOJO;
  config: unknown;
  testParams: CancelPickupsSameDayTestParams;
}

export class CancelPickupsSameDay extends Suite {
  title = "cancelPickups_same_day";

  private deliveryService: DeliveryService | undefined;

  private pickupService: PickupService | undefined;

  private setDeliveryService(
    config: CancelPickupsSameDayConfigOptions,
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

  private setPickupService(config: CancelPickupsSameDayConfigOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (config.pickupServiceName) {
      this.pickupService = findPickupServiceByName(config.pickupServiceName, carrierApp);
    }

    else if (carrierApp.pickupServices.length > 0) {
      this.pickupService = carrierApp.pickupServices[0];
    }
  }

  buildTestArg(config: CancelPickupsSameDayConfigOptions): TestArgs | undefined {
    const carrierApp = this.app as CarrierApp;
    this.setPickupService(config);
    this.setDeliveryService(config);

    if (!this.deliveryService || !this.pickupService) return undefined;
    const [shipFrom, shipTo] = useShipmentAddresses(this.deliveryService);

    if (!shipTo || !shipFrom) return undefined;

    const address = buildAddress(`${shipFrom.country}-from`);

    const { todayEarly, todayEvening } = initializeTimeStamps();

    const defaults: CancelPickupsSameDayTestParams = {
      pickupServiceName: this.pickupService.name,
      deliveryServiceName: this.deliveryService.name,
      address,
      contact: { name: "John Doe" },
      timeWindow: {
        startDateTime: todayEarly,
        endDateTime: todayEvening
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
      }],
      cancellationReason: PickupCancellationReason.NotReady
    };

    const testParams = reduceDefaultsWithConfig<
    CancelPickupsSameDayTestParams
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
      ? `it raises an error when scheduling a pickup with ${objectToTestTitle(
        testParams,
      )}`
      : `it schedules a pickup with ${objectToTestTitle(
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
      return this.config.map((config: CancelPickupsSameDayConfigOptions) => {
        return this.buildTestArg(config);
      });
    }

    const config = this.config as CancelPickupsSameDayConfigOptions;
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

          // This should never actually throw because we handle this case up stream.
          if (!carrierApp.cancelPickups) {
            throw new Error("cancelPickups is not implemented");
          }

          await carrierApp.schedulePickup(transaction, testArg.methodArgs);

          const cancellationID = v4();

          const pickupCancellation: PickupCancellationPOJO[] = [{
            cancellationID,
            id: v4(),
            pickupService: testArg.methodArgs.pickupService,
            reason: testArg.testParams.cancellationReason,
            address: testArg.methodArgs.address,
            contact: testArg.methodArgs.contact,
            timeWindows: [testArg.methodArgs.timeWindow],
            shipments: testArg.methodArgs.shipments,
          }]

          const pickupCancelOutcome = await carrierApp.cancelPickups(transaction, pickupCancellation);
          const customMsg = `The pickupCancellationOutcome cancellationID does not match the cancellationID that was included in the PickupCancellation parameter: ${cancellationID}`;
          expect(pickupCancelOutcome[0].cancellationID).to.equal(cancellationID, customMsg);
        }
      );
    });
  }
}
