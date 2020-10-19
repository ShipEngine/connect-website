import { PickupService, LengthUnit, WeightUnit, DeliveryService } from "@shipengine/connect-sdk";
import { CarrierApp, PickupRequestPOJO, PickupShipmentPOJO, PickupPackagePOJO, PickupCancellationPOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import { CancelPickupsMultipleTestParams, CancelPickupsMultipleConfigOptions, PickupShipmentConfig } from "../runner/config/cancel-pickups-multiple";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import objectToTestTitle from "../utils/object-to-test-title";
import useShipmentAddresses from '../utils/use-shipment-addresses';
import findDeliveryServiceByName from '../utils/find-delivery-service-by-name';
import findPickupServiceByName from '../utils/find-pickup-service-by-name';
import Test from '../runner/test';
import { buildAddress } from '../factories/address';
import findPackagingByName from '../utils/find-packaging-by-name';
import { PickupCancellationReason } from '@shipengine/connect-sdk/lib/internal/input';
import { v4 } from 'uuid';
import { expect } from 'chai';

interface TestArgs {
  title: string;
  methodArgs: PickupRequestPOJO;
  config: unknown;
  testParams: CancelPickupsMultipleTestParams;
}

export class CancelPickupsMultiple extends Suite {
  title = "cancelPickups_multi_shipment";

  private pickupService: PickupService | undefined;

  private setDeliveryService(
    deliveryServiceName?: string
  ): DeliveryService {
    const carrierApp = this.app as CarrierApp;

    if (deliveryServiceName) {
      return findDeliveryServiceByName(
        deliveryServiceName,
        carrierApp,
      );
    }

    return carrierApp.deliveryServices[0];
  }

  private setPickupService(config: CancelPickupsMultipleConfigOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (config.pickupServiceName) {
      this.pickupService = findPickupServiceByName(config.pickupServiceName, carrierApp);
    }

    else if (carrierApp.pickupServices.length > 0) {
      this.pickupService = carrierApp.pickupServices[0];
    }
  }

  buildTestArg(config: Partial<CancelPickupsMultipleConfigOptions>): TestArgs | undefined {
    const carrierApp = this.app as CarrierApp;
    this.setPickupService(config as CancelPickupsMultipleConfigOptions);

    if (!this.pickupService) return undefined;

    if (!Array.isArray(config.shipments)) {
      config.shipments = [];
    }

    const defaults: CancelPickupsMultipleConfigOptions = { shipments: [] };
    const shipmentNumber = config.shipments.length || 2;

    if (config.shipments.length === 1) {
      throw new Error("connect.config.js shipments must contain two or more shipments");
    }

    const { todayEarly, todayEvening } = initializeTimeStamps();

    // Generate the potential user overrides 
    for (let i = 0; i < shipmentNumber; i++) {
      const deliveryServiceName = config.shipments[i] && config.shipments[i].deliveryServiceName || "";
      const deliveryService = this.setDeliveryService(deliveryServiceName);

      const [shipFrom, shipTo] = useShipmentAddresses(deliveryService);

      if (!shipTo || !shipFrom) return undefined;

      const address = buildAddress(`${shipFrom.country}-from`);

      defaults.pickupServiceName = this.pickupService.name;
      defaults.address = address;
      defaults.contact = { name: "John Doe" };
      defaults.timeWindow = {
        startDateTime: todayEarly,
        endDateTime: todayEvening
      };

      defaults.cancellationReason = PickupCancellationReason.NotReady;

      defaults.shipments && defaults.shipments.push({
        deliveryServiceName: deliveryService.name,
        packages: [
          {
            packagingName: deliveryService.packaging[0].name,
            weight: {
              unit: WeightUnit.Pounds,
              value: 50.0,
            },
            dimensions: {
              length: 12,
              width: 12,
              height: 12,
              unit: LengthUnit.Inches
            }
          }
        ]
      });
    }

    if (defaults.shipments && defaults.shipments.length === 0) {
      return undefined;
    }

    // Merge the top level properties
    const testParams: CancelPickupsMultipleTestParams = {
      pickupServiceName: config.pickupServiceName || defaults.pickupServiceName,
      address: config.address || defaults.address,
      contact: config.contact || defaults.contact,
      timeWindow: config.timeWindow || defaults.timeWindow,
      shipments: []
    };

    // Merge the individual shipments array
    for (let i = 0; i < shipmentNumber; i++) {
      if (config.shipments[i]) {
        const reduced = reduceDefaultsWithConfig<
          PickupShipmentConfig
        >(defaults.shipments[i], config.shipments[i]);
        testParams.shipments.push(reduced);

      }
      else {
        testParams.shipments.push(defaults.shipments[i]);
      }
    }

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

    const pickupRequestPOJO: PickupRequestPOJO = {
      pickupService: findPickupServiceByName(testParams.pickupServiceName!, carrierApp),
      address: testParams.address!,
      timeWindow: testParams.timeWindow!,
      contact: testParams.contact!,
      shipments
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when scheduling a pickup with shipments ${objectToTestTitle(
        testParams,
      )}`
      : `it schedules a pickup with multiple shipments ${objectToTestTitle(
        testParams,
      )}`;

    return {
      title,
      methodArgs: pickupRequestPOJO,
      config,
      testParams
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: CancelPickupsMultipleConfigOptions) => {
        return this.buildTestArg(config);
      });
    }

    const config = this.config as CancelPickupsMultipleConfigOptions;
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

          if (!carrierApp.cancelPickups) {
            throw new Error("cancelPickups is not implemented");
          }

          const confirmation = await carrierApp.schedulePickup(transaction, testArg.methodArgs);

          const cancellationID = v4();

          const pickupCancellation: PickupCancellationPOJO = {
            cancellationID,
            id: confirmation.id,
            pickupService: testArg.methodArgs.pickupService,
            reason: testArg.testParams.cancellationReason!,
            notes: [],
            address: testArg.methodArgs.address,
            contact: testArg.methodArgs.contact,
            timeWindows: [testArg.methodArgs.timeWindow],
            shipments: testArg.methodArgs.shipments
          }

          const cancellationOutcomes = await carrierApp.cancelPickups(transaction, [pickupCancellation]);

          const customMsg = `The cancelled pickup cancellationID does not match the one that was included in the pickupCancellation: ${cancellationID}`;
          expect(cancellationOutcomes[0].cancellationID).to.equal(cancellationID, customMsg);

        }
      );
    });
  }
}
