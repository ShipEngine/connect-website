import {
  CarrierApp,
  DeliveryConfirmation,
  DeliveryService,
  NewPackagePOJO,
  NewShipmentPOJO,
  WeightUnit,
} from "@shipengine/integration-platform-sdk";
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

interface TestArgs {
  title: string;
  methodArgs: NewShipmentPOJO;
  config: any;
  testParams: CreateShipmentInternationalTestParams;
}

export class CreateShipmentInternational extends Suite {
  title = "createShipment_international";

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
    } else {
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

    let [shipFrom, shipTo] = useInternationalShipmentAddresses(
      this.app as CarrierApp,
    );
    // We need to know if the config defines 'shipFrom' so we can set the 'shipDateTime' with the correct timezone
    shipFrom = config.shipFrom ? config.shipFrom : shipFrom;
    
    if(!shipFrom) return undefined;
    const { tomorrow } = initializeTimeStamps(shipFrom!.timeZone);

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
    };

    const testParams = reduceDefaultsWithConfig<
      CreateShipmentInternationalTestParams
    >(defaults, config);

    const packagePOJO: NewPackagePOJO = {
      packaging: {
        id: this.deliveryService.packaging[0].id,
      },
      label: testParams.label,
      weight: testParams.weight,
    };

    if (this.deliveryConfirmation) {
      packagePOJO.deliveryConfirmation = {
        id: this.deliveryConfirmation.id,
      };
    }

    let newShipmentPOJO: NewShipmentPOJO = {
      deliveryService: {
        id: this.deliveryService.id,
      },
      shipFrom: testParams.shipFrom!,
      shipTo: testParams.shipTo!,
      shipDateTime: testParams.shipDateTime!,
      packages: [packagePOJO],
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a new international shipment with ${objectToTestTitle(
          testParams,
        )}`
      : `it creates a new international shipment with ${objectToTestTitle(
          testParams,
        )}`;

    return {
      title: title,
      methodArgs: newShipmentPOJO,
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
    } else {
      const config = this.config as CreateShipmentInternationalConfigOptions;

      return [this.buildTestArg(config)];
    }
  }

  tests() {
    const testArgs = this.buildTestArgs().filter((args) => args !== undefined);

    if (testArgs.length === 0) return [];

    return testArgs.map((testArg) => {
      return this.test(
        testArg!.title,
        testArg!.methodArgs,
        testArg!.config,
        async () => {
          const carrierApp = this.app as CarrierApp;

          const transaction = await this.transaction(testArg!.config);

          // This should never actually throw because we handle this case up stream.
          if (!carrierApp.createShipment)
            throw new Error("createShipment is not implemented");

          const shipmentConfirmation = await carrierApp.createShipment(
            transaction,
            testArg!.methodArgs,
          );

          // If DeliveryServiceDefinition.fulfillmentService is set, then the shipment’s fulfillmentService must match it
          if (this.deliveryService?.fulfillmentService) {
            expect(shipmentConfirmation.fulfillmentService).to.equal(
              this.deliveryService?.fulfillmentService,
              "The shipmentConfirmation.fulfillmentService returned from createShipment does not equal the given deliveryService.fulfillmentService"
            );
          }

          // If DeliveryServiceDefinition.isTrackable is true, then the shipment must have a trackingNumber set
          if (this.deliveryService?.isTrackable) {
            const customMsg = "The shipmentConfirmation.isTrackable returned from createShipment must be present when the given deliveryService.isTrackable is set to 'true'";

            expect(shipmentConfirmation.trackingNumber, customMsg).to.be.ok;
          }

          const customMsg = "The shipment confirmation packages array should have the same number of packages that were on the request";
          expect(shipmentConfirmation.packages.length).to.equal(testArg!.methodArgs.packages.length, customMsg);
        },
      );
    });
  }
}
