import { DeliveryService, WeightUnit, DeliveryConfirmation, LengthUnit } from "@shipengine/connect-sdk";
import { CarrierApp, NewShipmentPOJO, NewPackagePOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import {
  TrackShipmentReturnConfigOptions,
  TrackShipmentReturnTestParams,
} from "../runner/config/track-shipment-return";
import { initializeTimeStamps } from "../../utils/time-stamps";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import objectToTestTitle from "../utils/object-to-test-title";
import useDomesticShippingAddress from "../utils/use-domestic-shipment-addresses";

import { expect } from "chai";
import findDeliveryServiceByName from "../utils/find-delivery-service-by-name";
import findDeliveryConfirmationByName from "../utils/find-delivery-confirmation-by-name";
import Test from '../runner/test';

interface TestArgs {
  title: string;
  methodArgs: NewShipmentPOJO;
  config: unknown;
}

export class TrackShipmentReturn extends Suite {
  title = "trackShipment_return";

  private deliveryService?: DeliveryService;

  private deliveryConfirmation?: DeliveryConfirmation;

  private setDeliveryService(
    config: TrackShipmentReturnConfigOptions,
  ): void {
    const carrierApp = this.app as CarrierApp;

    if (config.deliveryServiceName) {
      this.deliveryService = findDeliveryServiceByName(
        config.deliveryServiceName,
        carrierApp,
      );

      if (!this.deliveryService.isTrackable) {
        throw new Error(`connect.config.js deliveryServiceName: "${config.deliveryServiceName}" does not support tracking`);
      }
      if (!this.deliveryService.supportsReturns) {
        throw new Error(`connect.config.js deliveryServiceName: "${config.deliveryServiceName}" does not support returns`);
      }

    } else {
      this.deliveryService = undefined;

      for (const ds of carrierApp.deliveryServices) {
        if (ds.isTrackable && ds.supportsReturns) {
          this.deliveryService = ds;
        }
      }
    }
  }

  private setDeliveryConfirmation(
    config: TrackShipmentReturnConfigOptions,
  ): void {
    if (config.deliveryConfirmationName) {
      // We do not want to handle the exception here if this raises. It indicates issues w/ the config provided.
      this.deliveryConfirmation = findDeliveryConfirmationByName(
        config.deliveryConfirmationName,
        this.app as CarrierApp,
      );
    } else if (
      this.deliveryService &&
      this.deliveryService.deliveryConfirmations.length !== 0 &&
      this.deliveryService.deliveryConfirmations[0]
    ) {
      this.deliveryConfirmation = this.deliveryService.deliveryConfirmations[0];
    } else {
      this.deliveryConfirmation = undefined;
    }
  }

  buildTestArg(
    config: TrackShipmentReturnConfigOptions,
  ): TestArgs | undefined {
    this.setDeliveryService(config);
    this.setDeliveryConfirmation(config);

    if (!this.deliveryService) return undefined;

    let shipFrom;
    let shipTo;
    try {
      [shipFrom, shipTo] = useDomesticShippingAddress(this.deliveryService);
    } catch {
      return undefined;
    }

    const { tomorrow } = initializeTimeStamps();

    // Make a best guess at the defaults, need to resolve the default vs config based delivery service early
    // on since that determines what address and associated timezones get generated.
    const defaults: TrackShipmentReturnTestParams = {
      deliveryServiceName: this.deliveryService.name,
      label: {
        size: this.deliveryService.labelSizes[0],
        format: this.deliveryService.labelFormats[0]
      },
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

    if (this.deliveryService.deliveryConfirmations.length > 0) {
      defaults.deliveryConfirmationName = this.deliveryService.deliveryConfirmations[0].name;
    }

    const testParams = reduceDefaultsWithConfig<
      TrackShipmentReturnTestParams
    >(defaults, config);

    if (!testParams.shipFrom || !testParams.shipTo) return undefined;

    const packagePOJO: NewPackagePOJO = {
      packaging: {
        id: this.deliveryService.packaging[0].id
      },
      label: {
        size: testParams.label.size,
        format: testParams.label.format,
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
      returns: {
        isReturn: true,
        rmaNumber: testParams.rmaNumber
      },
      shipFrom: testParams.shipFrom,
      shipTo: testParams.shipTo,
      shipDateTime: testParams.shipDateTime,
      packages: [packagePOJO]
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when tracking a shipment with ${objectToTestTitle(
        testParams,
      )}`
      : `it tracks a shipment with ${objectToTestTitle(
        testParams,
      )}`;

    if (this.deliveryConfirmation) {
      newShipmentPOJO.deliveryConfirmation = {
        id: this.deliveryConfirmation.id,
      };
    }

    if (testParams.deliveryConfirmationName) {
      const deliveryConfirmation = this.deliveryService.deliveryConfirmations.find(
        (dc) => dc.name === testParams.deliveryConfirmationName,
      );

      if (deliveryConfirmation) {
        newShipmentPOJO.deliveryConfirmation = {
          id: deliveryConfirmation.id,
        }
      }
    }

    return {
      title,
      methodArgs: newShipmentPOJO,
      config,
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: TrackShipmentReturnConfigOptions) => {
        return this.buildTestArg(config);
      });
    }
    const config = this.config as TrackShipmentReturnConfigOptions;
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

          if (!carrierApp.trackShipment) {
            throw new Error("trackShipment is not implemented");
          }

          const shipmentConfirmation = await carrierApp.createShipment(transaction, testArg.methodArgs);

          await carrierApp.trackShipment(transaction, { trackingNumber: shipmentConfirmation.trackingNumber });
        }
      );
    });
  }
}
