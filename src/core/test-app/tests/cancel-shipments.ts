import { DeliveryService, WeightUnit, LengthUnit } from "@shipengine/connect-sdk";
import { CarrierApp, NewShipmentPOJO, NewPackagePOJO, ShipmentCancellationPOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import objectToTestTitle from "../utils/object-to-test-title";
import useDomesticShippingAddress from "../utils/use-domestic-shipment-addresses";

import { findDomesticDeliveryService } from "../utils/find-domestic-delivery-service";
import { expect } from "chai";
import findDeliveryServiceByName from "../utils/find-delivery-service-by-name";
import { CancelShipmentsConfigOptions, CancelShipmentsTestParams } from "../runner/config/cancel-shipments";
import { v4 } from "uuid";
import Test from '../runner/test';


interface TestArgs {
  title: string;
  methodArgs: NewShipmentPOJO;
  config: unknown;
}

/**
 * Test an individual cancellation of one shipment.
 */
export class CancelShipments extends Suite {
  title = "cancelShipment";

  private deliveryService?: DeliveryService;

  private setDeliveryService(
    config: CancelShipmentsConfigOptions,
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

  buildTestArg(
    config: CancelShipmentsConfigOptions,
  ): TestArgs | undefined {
    this.setDeliveryService(config);

    if (!this.deliveryService) return undefined;

    let shipFrom;
    let shipTo;
    try {
      [shipFrom, shipTo] = useDomesticShippingAddress(this.deliveryService);
    } catch { }

    const { tomorrow } = initializeTimeStamps();

    // Make a best guess at the defaults, need to resolve the default vs config based delivery service early
    // on since that determines what address and associated timezones get generated.
    const defaults: CancelShipmentsTestParams = {
      deliveryServiceName: this.deliveryService.name,
      shipDateTime: tomorrow,
      shipFrom: shipFrom,
      shipTo: shipTo,
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
    };

    const testParams = reduceDefaultsWithConfig<
      CancelShipmentsTestParams
    >(defaults, config);

    if (!testParams.shipFrom || !testParams.shipTo) return undefined;

    const packagePOJO: NewPackagePOJO = {
      packaging: {
        id: this.deliveryService.packaging[0].id
      },
      label: {
        size: this.deliveryService.labelSizes[0],
        format: this.deliveryService.labelFormats[0],
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

    const newShipmentPOJO: NewShipmentPOJO = {
      deliveryService: {
        id: this.deliveryService.id,
      },
      shipFrom: testParams.shipFrom,
      shipTo: testParams.shipTo,
      shipDateTime: testParams.shipDateTime,
      packages: [packagePOJO],
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when cancelling a shipment with ${objectToTestTitle(
        testParams,
      )}`
      : `it cancels a shipment with ${objectToTestTitle(
        testParams,
      )}`;

    return {
      title,
      methodArgs: newShipmentPOJO,
      config,
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: CancelShipmentsConfigOptions) => {
        return this.buildTestArg(config);
      });
    }
    const config = this.config as CancelShipmentsConfigOptions;
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
            throw new Error("CancelShipments is not implemented");
          }

          const shipmentConfirmation = await carrierApp.createShipment(transaction, testArg.methodArgs);

          const cancellationID = v4();
          const shipmentCancellations: ShipmentCancellationPOJO[] = [{
            cancellationID,
            trackingNumber: shipmentConfirmation.trackingNumber
          }];

          const shipmentCancellationConfirmation = await carrierApp.cancelShipments(transaction, shipmentCancellations);

          const customMsg = `The shipmentCancellationConfirmation cancellationID does not match the one that was included in the shipmentCancellation: ${cancellationID}`;
          expect(shipmentCancellationConfirmation[0].cancellationID).to.equal(cancellationID, customMsg);

        }
      );
    });
  }
}
