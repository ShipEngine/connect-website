import { DeliveryService, WeightUnit, LengthUnit } from "@shipengine/connect-sdk";
import { CarrierApp, NewShipmentPOJO, NewPackagePOJO } from "@shipengine/connect-sdk/lib/internal";
import Suite from "../runner/suite";
import { initializeTimeStamps } from "../../utils/time-stamps";
import { CreateShipmentMultiPackageConfigOptions, CreateShipmentMultiPackageTestParams } from "../runner/config/create-shipment-multipackage";
import objectToTestTitle from "../utils/object-to-test-title";
import reduceDefaultsWithConfig from "../utils/reduce-defaults-with-config";
import { expect } from "chai";
import findDeliveryServiceByName from "../utils/find-delivery-service-by-name";
import findPackagingByName from "../utils/find-packaging-by-name";
import findMultiPackageDeliveryService from "../utils/find-multi-package-delivery-service";
import useShipmentAddresses from "../utils/use-shipment-addresses";
import Test from '../runner/test';

interface TestArgs {
  title: string;
  methodArgs: NewShipmentPOJO;
  config: unknown;
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

    const { tomorrow } = initializeTimeStamps();

    // Make a best guess at the defaults, need to resolve the default vs config based delivery service early
    // on since that determines what address and associated timezones get generated.
    const defaults: CreateShipmentMultiPackageTestParams = {
      deliveryServiceName: this.deliveryService.name,
      shipDateTime: tomorrow,
      shipFrom: shipFrom,
      shipTo: shipTo,
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
          },
          dimensions: {
            length: 12,
            width: 12,
            height: 12,
            unit: LengthUnit.Inches
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
          },
          dimensions: {
            length: 12,
            width: 12,
            height: 12,
            unit: LengthUnit.Inches
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

      const newPackage: NewPackagePOJO = {
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

      if (pkgParams.dimensions) {
        newPackage.dimensions = {
          length: pkgParams.dimensions.length,
          width: pkgParams.dimensions.width,
          height: pkgParams.dimensions.height,
          unit: pkgParams.dimensions.unit
        }
      }

      return newPackage;
    });

    const newShipmentPOJO: NewShipmentPOJO = {
      deliveryService: {
        id: this.deliveryService.id,
      },
      shipFrom: testParams.shipFrom,
      shipTo: testParams.shipTo,
      shipDateTime: testParams.shipDateTime,
      packages
    };

    if (testParams.deliveryConfirmationName) {
      const deliveryConfirmation = findDeliveryServiceByName(testParams.deliveryConfirmationName, carrierApp);

      if (!deliveryConfirmation) {
        throw new Error(`Unable to find a delivery confirmation definition for ${testParams.deliveryConfirmationName}`);
      }

      newShipmentPOJO.deliveryConfirmation = deliveryConfirmation;
    }

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
      testParams
    };
  }

  buildTestArgs(): Array<TestArgs | undefined> {
    if (Array.isArray(this.config)) {
      return this.config.map((config: CreateShipmentMultiPackageConfigOptions) => {
        return this.buildTestArg(config);
      });
    }

    const config = this.config as CreateShipmentMultiPackageConfigOptions;
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
