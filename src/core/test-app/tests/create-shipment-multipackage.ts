import {
  CarrierApp,
  DeliveryService,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
} from "@shipengine/integration-platform-sdk";
import Suite from "../runner/suite";
import { initializeTimeStamps } from '../../utils/time-stamps';
import { CreateShipmentMultiPackageConfigOptions, CreateShipmentMultiPackageTestParams } from '../runner/config/create-shipment-multipackage';
import objectToTestTitle from '../utils/object-to-test-title';
import reduceDefaultsWithConfig from '../utils/reduce-defaults-with-config';
import { expect } from 'chai';
import findDeliveryServiceByName from '../utils/find-delivery-service-by-name';
import findPackagingByName from '../utils/find-packaging-by-name';
import findMultiPackageDeliveryService from '../utils/find-multi-package-delivery-service';
import useShipmentAddresses from '../utils/use-shipment-addresses';

interface TestArgs {
  title: string;
  methodArgs: NewShipmentPOJO;
  config: any;
  testParams: CreateShipmentMultiPackageTestParams;
}

export class CreateShipmentMultiPackage extends Suite {
  title = "createShipment_multi_package";

  private deliveryService?: DeliveryService | undefined;

  private setDeliveryService(config: CreateShipmentMultiPackageConfigOptions): void {
    const carrierApp = this.app as CarrierApp;

    if (config.deliveryServiceName) {
      this.deliveryService = findDeliveryServiceByName(config.deliveryServiceName, carrierApp);
      if (!this.deliveryService.allowsMultiplePackages) {
        throw new Error(`deliveryServiceName: '${config.deliveryServiceName}' does not support multi-package shipments`);
      }
    }

    else {
      try {
        const deliveryService = findMultiPackageDeliveryService(carrierApp);
        this.deliveryService = deliveryService;
      } catch {
        this.deliveryService = undefined;
      }
    }
  }


  buildTestArg(config: CreateShipmentMultiPackageConfigOptions): TestArgs | undefined {
    const carrierApp = this.app as CarrierApp;

    this.setDeliveryService(config);

    if (!this.deliveryService) return undefined;

    const [shipFrom, shipTo] = useShipmentAddresses(this.deliveryService);

    if (!shipFrom || !shipTo) return undefined;

    const { tomorrow } = initializeTimeStamps(shipFrom!.timeZone);

    // Make a best guess at the defaults, need to resolve the default vs config based delivery service early
    // on since that determines what address and associated timezones get generated.
    const defaults: CreateShipmentMultiPackageTestParams = {
      deliveryServiceName: this.deliveryService.name,
      shipDateTime: tomorrow,
      shipFrom: shipFrom!,
      shipTo: shipTo!,
      packages: [
        {
          packagingName: this.deliveryService.packaging[0].name,
          label: {
            format: this.deliveryService.labelFormats[0],
            size: this.deliveryService.labelSizes[0],
          },
          weight: {
            unit: WeightUnit.Pounds,
            value: 50.0
          }
        },
        {
          packagingName: this.deliveryService.packaging[0].name,
          label: {
            format: this.deliveryService.labelFormats[0],
            size: this.deliveryService.labelSizes[0],
          },
          weight: {
            unit: WeightUnit.Pounds,
            value: 25.0
          }
        }
      ]
    };

    const testParams = reduceDefaultsWithConfig<
      CreateShipmentMultiPackageTestParams
    >(defaults, config);

    // Hydrate create shipment packages
    const packages = testParams.packages.map((pkgParams) => {
      const packaging = findPackagingByName(pkgParams.packagingName, carrierApp)

      let newPackage: NewPackagePOJO = {
        packaging: {
          id: packaging.id,
        },
        label: {
          size: pkgParams.label.size,
          format: pkgParams.label.format,
        },
        weight: {
          value: pkgParams.weight.value,
          unit: pkgParams.weight.unit
        }
      }

      if (pkgParams.deliveryConfirmationName) {
        const deliveryConfirmation = findDeliveryServiceByName(pkgParams.deliveryConfirmationName, carrierApp);

        if (!deliveryConfirmation) {
          throw new Error(`Unable to find a delivery confirmation definition for ${pkgParams.deliveryConfirmationName}`);
        }

        newPackage.deliveryConfirmation = deliveryConfirmation;
      }

      return newPackage;
    });

    let newShipmentPOJO: NewShipmentPOJO = {
      deliveryService: {
        id: this.deliveryService.id,
      },
      shipFrom: testParams.shipFrom!,
      shipTo: testParams.shipTo!,
      shipDateTime: testParams.shipDateTime,
      packages
    };

    const title = config.expectedErrorMessage
      ? `it raises an error when creating a new multi-package shipment with ${objectToTestTitle(
        testParams,
      )}`
      : `it creates a new multi-package shipment with ${objectToTestTitle(
        testParams,
      )}`;

    return {
      title,
      methodArgs: newShipmentPOJO,
      config,
      testParams: testParams
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: CreateShipmentMultiPackageConfigOptions) => {
        return this.buildTestArg(config);
      });
    } else {
      const config = this.config as CreateShipmentMultiPackageConfigOptions;

      return [this.buildTestArg(config)];
    }
  }

  tests() {
    const testArgs = this.buildTestArgs().filter(args => args !== undefined);

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
