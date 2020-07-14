import {
  CarrierApp,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
  ServiceArea,
} from "@shipengine/integration-platform-sdk";
import Suite from "../runner/suite";
import { buildAddressWithContactInfo } from "../factories/address";
import { MethodArgs } from "../runner/method-args";
import { CreateShipmentDomesticOptions } from "../runner/config";

interface TestArgs {
  methodArgs: MethodArgs<NewShipmentPOJO>;
  config: any;
}

export class CreateShipmentDomestic extends Suite {
  title = "createShipment_domestic";

  buildTestArg(config: CreateShipmentDomesticOptions): TestArgs {
    const carrierApp = this.app as CarrierApp;

    const deliveryService = carrierApp.deliveryServices.find(
      (deliveryService) => deliveryService.serviceArea === ServiceArea.Domestic,
    );

    const weightValue = config.weight?.value ? config.weight.value : 50.0;
    const weightUnit = WeightUnit.Pounds;
    const shipDateTime = new Date();
    const shipFrom = buildAddressWithContactInfo("US-from");
    const shipTo = buildAddressWithContactInfo("US-to");
    const labelFormat = deliveryService.labelFormats[0];
    const labelSize = deliveryService.labelSizes[0];

    const packagePOJO: NewPackagePOJO = {
      deliveryConfirmation: {
        id: deliveryService.deliveryConfirmations[0].id,
      },
      packaging: {
        id: deliveryService.packaging[0].id,
      },
      label: {
        size: labelSize,
        format: labelFormat,
      },
      weight: {
        value: weightValue,
        unit: weightUnit,
      },
    };

    let newShipmentPOJO: NewShipmentPOJO = {
      deliveryService: {
        id: deliveryService.id,
      },
      shipFrom: shipFrom!,
      shipTo: shipTo!,
      shipDateTime: shipDateTime,
      packages: [packagePOJO],
    };

    return {
      methodArgs: [this.transaction, newShipmentPOJO],
      config: this.config,
    };
  }

  buildTestArgs(): TestArgs[] {
    if (Array.isArray(this.config)) {
      return this.config.map((config: CreateShipmentDomesticOptions) => {
        return this.buildTestArg(config);
      });
    } else {
      const config = this.config as CreateShipmentDomesticOptions;

      return [];
    }
  }

  tests() {
    return this.buildTestArgs().map((testArg) => {
      return this.test(
        "it creates a new domestic shipment",
        testArg.methodArgs,
        testArg.config,
        async () => {
          const carrierApp = this.app as CarrierApp;

          carrierApp.createShipment &&
            (await carrierApp.createShipment(...testArg.methodArgs));
        },
      );
    });
  }
}
