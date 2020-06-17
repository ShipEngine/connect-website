import { Suite, TestProp, expect } from "../tiny-test";
import { buildAddressWithContactInfo } from "../factories/address";
import { log, logObject } from "../../utils/log-helpers";
import {
  CarrierApp,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
  TransactionPOJO,
  ShipmentCancellationPOJO,
} from "@shipengine/integration-platform-sdk";
import { v4 } from "uuid";

type CreateShipmentsProps = [TransactionPOJO, NewShipmentPOJO];

export class CancelShipmentsTestSuite extends Suite {
  title = "cancelShipments";

  tests() {
    const carrierApp = this.app as CarrierApp;
    // Integrations team provided feedback that testing all the permuations
    // for cancel shipment isnt really helpful. We are just testing the first permutation here.
    const testProp = this.testProps()[0];

    return [
      this.test(testProp.title, async () => {
        let newShipment, result, errorResult;
        try {
          carrierApp.createShipment &&
            (newShipment = await carrierApp.createShipment(...testProp.props));

          const shipmentCancellations = [
            {
              cancellationID: v4(),
              identifiers: newShipment?.identifiers,
              metadata: newShipment?.metadata,
              trackingNumber: newShipment?.trackingNumber,
            },
          ] as ShipmentCancellationPOJO[];

          if (this.debug) {
            log("input:");
            logObject(testProp.props[0]);
            logObject(shipmentCancellations);
          }

          carrierApp.cancelShipments &&
            (result = await carrierApp.cancelShipments(
              testProp.props[0],
              shipmentCancellations,
            ));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      }),
    ];
  }

  private testProps(): TestProp<CreateShipmentsProps>[] {
    const carrierApp = this.app as CarrierApp;
    let props: TestProp<CreateShipmentsProps>[] = [];

    const packageWeights = [1.0, 10.0, 100.0];
    const packageUnits = [
      WeightUnit.Grams,
      WeightUnit.Kilograms,
      WeightUnit.Ounces,
      WeightUnit.Pounds,
    ];

    for (let deliveryService of carrierApp.deliveryServices) {
      for (let labelFormat of deliveryService.labelFormats) {
        for (let labelSize of deliveryService.labelSizes) {
          for (let deliveryConfirmation of deliveryService.deliveryConfirmations) {
            for (let packageUnit of packageUnits) {
              for (let packageWeight of packageWeights) {
                const packagePOJO: NewPackagePOJO = {
                  deliveryConfirmation: {
                    id: deliveryConfirmation.id,
                  },
                  packaging: {
                    id: deliveryService.packaging[0].id,
                  },
                  label: {
                    size: labelSize,
                    format: labelFormat,
                  },
                  weight: {
                    value: packageWeight,
                    unit: packageUnit,
                  },
                };

                let newShipmentPOJO: NewShipmentPOJO = {
                  deliveryService: {
                    id: deliveryService.id,
                  },
                  shipFrom: buildAddressWithContactInfo("US-from")!,
                  shipTo: buildAddressWithContactInfo("US-to")!,
                  shipDateTime: new Date(),
                  packages: [packagePOJO],
                };

                const title = `cancels shipment with delivery service: ${deliveryService.name}, label format: ${labelFormat}, label size: ${labelSize}, delivery confirmation: ${deliveryConfirmation.name}, package unit: ${packageUnit}, and package weight: ${packageWeight}`;

                props.push({
                  title: title,
                  props: [this.transaction, newShipmentPOJO],
                });
              }
            }
          }
        }
      }
    }

    return props;
  }
}
