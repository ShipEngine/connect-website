import { DeliveryService, WeightUnit, LengthUnit, AddressWithContactInfoPOJO } from "@shipengine/connect-sdk";
import { CarrierApp, NewShipmentPOJO, NewPackagePOJO, ShipmentCancellationPOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";

import { expect } from "chai";
import findDeliveryServiceByName from "../utils/find-delivery-service-by-name";
import { CancelShipmentsMultipleConfigOptions, CancelShipmentsMultipleTestParams, ShipmentConfig } from "../runner/config/cancel-shipments-multiple";
import { v4 } from "uuid";
import Test from '../runner/test';
import useShipmentAddresses from '../utils/use-shipment-addresses';

interface TestArgs {
  title: string;
  methodArgs: NewShipmentPOJO[];
  config: unknown;
}

/**
 * Test an individual cancellation of one shipment.
 */
export class CancelShipmentsMultiple extends Suite {
  title = "cancelShipments_multiple";

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

  buildTestArg(
    config: CancelShipmentsMultipleConfigOptions,
  ): TestArgs | undefined {

    if (!Array.isArray(config.shipments)) {
      config = { shipments: [] };
    }

    if(config.shipments.length === 1) {
      throw new Error("connect.config.js shipments must contain two or more shipments");
    }

    const userOverrides: {
      deliveryServiceName: string;
      shipFrom?: AddressWithContactInfoPOJO,
      shipTo?: AddressWithContactInfoPOJO,
      shipDateTime: string;
    }[] = [];

    const shipmentNumber = config.shipments.length || 2;

    for (let i = 0; i < shipmentNumber; i++) {
      const deliveryServiceName = config.shipments[i] && config.shipments[i].deliveryServiceName || "";
      const deliveryService = this.setDeliveryService(deliveryServiceName);

      const [shipFrom, shipTo] = useShipmentAddresses(deliveryService);

      if(!shipFrom || !shipTo) {
        break;
      }

      const { tomorrow } = initializeTimeStamps();

      userOverrides.push({
        deliveryServiceName: deliveryService.name,
        shipFrom,
        shipTo,
        shipDateTime: tomorrow
      });
    }

    if (userOverrides.length === 0) {
      return undefined;
    }

    const defaults: CancelShipmentsMultipleTestParams = { shipments: [] };
    defaults.shipments = userOverrides.map((test) => {
      return {
        deliveryServiceName: test.deliveryServiceName,
        shipDateTime: test.shipDateTime,
        shipFrom: test.shipFrom,
        shipTo: test.shipTo,
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
    });

    const testParams = { shipments: [] } as CancelShipmentsMultipleTestParams;

    for (let i = 0; i < shipmentNumber; i++) {
      const reduced = reduceDefaultsWithConfig<
        ShipmentConfig
      >(defaults.shipments[i], config.shipments[i] || {});

      testParams.shipments.push(reduced);
    }

    const shipments = [];

    for (const shipment of testParams.shipments) {
      if (!shipment.shipFrom || !shipment.shipTo) return undefined;

      const deliveryService = findDeliveryServiceByName(shipment.deliveryServiceName, this.app as CarrierApp);

      const packagePOJO: NewPackagePOJO = {
        packaging: {
          id: deliveryService.packaging[0].id
        },
        label: {
          size: deliveryService.labelSizes[0],
          format: deliveryService.labelFormats[0],
        },
        weight: {
          value: shipment.weight.value,
          unit: shipment.weight.unit,
        },
        dimensions: {
          length: shipment.dimensions.length,
          width: shipment.dimensions.width,
          height: shipment.dimensions.height,
          unit: shipment.dimensions.unit
        }
      };

      const newShipmentPOJO: NewShipmentPOJO = {
        deliveryService: {
          id: deliveryService.id,
        },
        shipFrom: shipment.shipFrom,
        shipTo: shipment.shipTo,
        shipDateTime: shipment.shipDateTime,
        packages: [packagePOJO],
      };

      shipments.push(newShipmentPOJO);
    }

    const title = config.expectedErrorMessage
      ? `it raises an error when cancelling ${shipments.length} shipments`
      : `it cancels ${shipments.length} shipments`;

    return {
      title,
      methodArgs: shipments,
      config,
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: CancelShipmentsMultipleConfigOptions) => {
        return this.buildTestArg(config);
      });
    }
    const config = this.config as CancelShipmentsMultipleConfigOptions;
    return [this.buildTestArg(config)];
  }

  tests(): Test[] {
    const testArgs = this.buildTestArgs().filter((args) => args !== undefined) as TestArgs[];

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

          if (!carrierApp.createShipment) {
            throw new Error("createShipment is not implemented");
          }

          if (!carrierApp.cancelShipments) {
            throw new Error("cancelShipments is not implemented");
          }

          for (const shipment of testArg.methodArgs) {
            const shipmentConfirmation = await carrierApp.createShipment(transaction, shipment);

            const cancellationID = v4();
            const shipmentCancellations: ShipmentCancellationPOJO[] = [{
              cancellationID,
              trackingNumber: shipmentConfirmation.trackingNumber
            }];

            const shipmentCancellationConfirmation = await carrierApp.cancelShipments(transaction, shipmentCancellations);

            const customMsg = `The shipmentCancellationConfirmation cancellationID does not match the one that was included in the shipmentCancellation: ${cancellationID}`;
            expect(shipmentCancellationConfirmation[0].cancellationID).to.equal(cancellationID, customMsg);
          }
        }
      );
    });
  }
}
