import { DeliveryService, WeightUnit } from "@shipengine/connect-sdk";
import { CarrierApp, NewShipmentPOJO, NewPackagePOJO, ShipmentCancellation, ShipmentCancellationPOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import reduceDefaultsWithConfig from '../utils/reduce-defaults-with-config';
import objectToTestTitle from '../utils/object-to-test-title';
import useDomesticShippingAddress from '../utils/use-domestic-shipment-addresses';

import { findDomesticDeliveryService } from '../utils/find-domestic-delivery-service';
import { expect } from "chai";
import findDeliveryServiceByName from '../utils/find-delivery-service-by-name';
import { CancelShipmentConfigOptions, CancelShipmentTestParams } from '../runner/config/cancel-shipment';
import { v4 } from "uuid";


interface TestArgs {
  title: string;
  methodArgs: NewShipmentPOJO;
  config: any;
}

export class CancelShipment extends Suite {
  title = "cancelShipment";

  private deliveryService?: DeliveryService;

  private setDeliveryService(
    config: CancelShipmentConfigOptions,
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
    config: CancelShipmentConfigOptions,
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
    const defaults: CancelShipmentTestParams = {
      deliveryServiceName: this.deliveryService.name,
      shipDateTime: tomorrow,
      shipFrom: shipFrom,
      shipTo: shipTo,
      weight: {
        unit: WeightUnit.Pounds,
        value: 50.0,
      }
    };

    const testParams = reduceDefaultsWithConfig<
      CancelShipmentTestParams
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
    };

    const newShipmentPOJO: NewShipmentPOJO = {
      deliveryService: {
        id: this.deliveryService.id,
      },
      shipFrom: testParams.shipFrom!,
      shipTo: testParams.shipTo!,
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
      return this.config.map((config: CancelShipmentConfigOptions) => {
        return this.buildTestArg(config);
      });
    }
    const config = this.config as CancelShipmentConfigOptions;
    return [this.buildTestArg(config)];
  }

  tests() {
    const testArgs = this.buildTestArgs().filter((args) => args !== undefined);

    if (testArgs.length === 0) {
      return [];
    }
    return testArgs.map((testArg) => {
      return this.test(
        testArg!.title,
        testArg!.methodArgs,
        testArg!.config,
        async () => {
          const carrierApp = this.app as CarrierApp;

          const transaction = await this.transaction(testArg!.config);

          if (!carrierApp.createShipment) {
            throw new Error("createShipment is not implemented");
          }

          if (!carrierApp.cancelShipments) {
            throw new Error("cancelShipment is not implemented");
          }

          const shipmentConfirmation = await carrierApp.createShipment(transaction, testArg!.methodArgs);

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
