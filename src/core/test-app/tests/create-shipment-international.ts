import {
  DeliveryConfirmation,
  DeliveryService,
  WeightUnit,
  LengthUnit,
} from "@shipengine/connect-sdk";

import { CarrierApp, NewShipmentPOJO, NewPackagePOJO } from "@shipengine/connect-sdk/lib/internal";

import Suite from "../runner/suite";
import findDeliveryConfirmationByName from "../utils/find-delivery-confirmation-by-name";
import findDeliveryServiceByName from "../utils/find-delivery-service-by-name";
import findInternationalDeliveryService from "../utils/find-international-delivery-service";
import objectToTestTitle from "../utils/object-to-test-title";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import useInternationalShipmentAddresses from "../utils/use-international-shipment-addresses";
import {
  CreateShipmentInternationalConfigOptions,
  CreateShipmentInternationalTestParams,
} from "../runner/config/create-shipment-international";
import { initializeTimeStamps } from "../../utils/time-stamps";
import { expect } from "chai";
import Test from '../runner/test';

interface TestArgs {
  title: string;
  methodArgs: NewShipmentPOJO;
  config: unknown;
  testParams: CreateShipmentInternationalTestParams;
}

export class CreateShipmentInternational extends Suite {
  public title = "createShipment_international";

  private deliveryService?: DeliveryService;

  private deliveryConfirmation?: DeliveryConfirmation;

  private setDeliveryService(
    config: CreateShipmentInternationalConfigOptions,
  ): void {
    if (config.deliveryServiceName) {
      // We do not want to handle the exception here if this raises. It indicates issues w/ the config provided.
      this.deliveryService = findDeliveryServiceByName(
        config.deliveryServiceName,
        this.app as CarrierApp,
      );
    }
    else {
      try {
        this.deliveryService = findInternationalDeliveryService(
          this.app as CarrierApp,
        );
      } catch {
        this.deliveryService = undefined;
      }
    }
  }

  private setDeliveryConfirmation(
    config: CreateShipmentInternationalConfigOptions,
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

  private buildTestArg(
    config: CreateShipmentInternationalConfigOptions,
  ): TestArgs | undefined {
    this.setDeliveryService(config);
    this.setDeliveryConfirmation(config);

    // If we cant resolve a delivery serivice above then we dont have enough info to setup this test
    if (!this.deliveryService) return undefined;

    let shipFrom;
    let shipTo;
    try {
      [shipFrom, shipTo] = useInternationalShipmentAddresses(this.deliveryService);
    } catch {
      return undefined;
    }

    const { tomorrow } = initializeTimeStamps();

    const defaults: CreateShipmentInternationalTestParams = {
      deliveryServiceName: this.deliveryService.name,
      shipDateTime: tomorrow, // It would prob be a better DX to give the user an enum of relative values "tomorrow", "nextWeek" etc.
      shipFrom: shipFrom,
      shipTo: shipTo,
      label: {
        size: this.deliveryService.labelSizes[0],
        format: this.deliveryService.labelFormats[0],
      },
      weight: {
        value: 50.0,
        unit: WeightUnit.Pounds,
      },
      dimensions: {
        length: 12,
        width: 12,
        height: 12,
        unit: LengthUnit.Inches
      }
    };

    const testParams = reduceDefaultsWithConfig<
      CreateShipmentInternationalTestParams
    >(defaults, config);

    if (!testParams.shipFrom || !testParams.shipTo) return undefined;

    const packagePOJO: NewPackagePOJO = {
      packaging: {
        id: this.deliveryService.packaging[0].id,
      },
      label: testParams.label,
      weight: testParams.weight,
      dimensions: {
        length: testParams.dimensions.length,
        width: testParams.dimensions.width,
        height: testParams.dimensions.height,
        unit: testParams.dimensions.unit
      }
    };


    const newShipmentPOJO: Partial<NewShipmentPOJO> = {
      deliveryService: {
        id: this.deliveryService.id,
      },
      shipFrom: testParams.shipFrom,
      shipTo: testParams.shipTo,
      packages: [packagePOJO],
    };

    if(testParams.shipDateTime) {
      newShipmentPOJO.shipDateTime = testParams.shipDateTime;
    }

    if (this.deliveryConfirmation) {
      newShipmentPOJO.deliveryConfirmation = {
        id: this.deliveryConfirmation.id,
      };
    }

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a new international shipment with ${objectToTestTitle(
        testParams,
      )}`
      : `it creates a new international shipment with ${objectToTestTitle(
        testParams,
      )}`;

    return {
      title: title,
      methodArgs: newShipmentPOJO as NewShipmentPOJO,
      config: config,
      testParams: testParams,
    };
  }

  private buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map(
        (config: CreateShipmentInternationalConfigOptions) => {
          return this.buildTestArg(config);
        },
      );
    }

    const config = this.config as CreateShipmentInternationalConfigOptions;
    return [this.buildTestArg(config)];
  }

  tests(): Test[] {
    const testArgs = this.buildTestArgs().filter((args) => args !== undefined) as TestArgs[];

    if (testArgs.length === 0) return [];


    return testArgs
      .map((testArg) => {
        return this.test(
          testArg.title,
          testArg.methodArgs,
          testArg.config,
          async () => {
            const carrierApp = this.app as CarrierApp;

            const transaction = await this.transaction(testArg.config);

            // This should never actually throw because we handle this case up stream.
            if (!carrierApp.createShipment)
              throw new Error("createShipment is not implemented");

            const shipmentConfirmation = await carrierApp.createShipment(
              transaction,
              testArg.methodArgs,
            );

            // If DeliveryServiceDefinition.isTrackable is true, then the shipment must have a trackingNumber set
            if (this.deliveryService?.isTrackable) {
              const customMsg = "The shipmentConfirmation.isTrackable returned from createShipment must be present when the given deliveryService.isTrackable is set to 'true'";
              expect(shipmentConfirmation.trackingNumber, customMsg).to.be.ok;
            }
          }
        );
      });
  }
}
