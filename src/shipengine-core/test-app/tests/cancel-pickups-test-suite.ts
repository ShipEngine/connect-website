import { Suite, TestProp, expect } from "../tiny-test";
import { v4 } from "uuid";
import { buildAddress } from "../factories/address";
import {
  CarrierApp,
  PickupPackagePOJO,
  PickupCancellationPOJO,
  PickupCancellationReason,
  TransactionPOJO,
  WeightUnit,
} from "@shipengine/integration-platform-sdk";

type CancelPickupsProps = [TransactionPOJO, PickupCancellationPOJO[]];

export class CancelPickupsTestSuite extends Suite {
  title = "cancelPickups";

  tests() {
    const carrierApp = this.app as CarrierApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let result, errorResult;
        try {
          carrierApp.cancelPickups &&
            (result = await carrierApp.cancelPickups(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<CancelPickupsProps>[] {
    const carrierApp = this.app as CarrierApp;
    let props: TestProp<CancelPickupsProps>[] = [];

    const cancellationReasons = [
      PickupCancellationReason.CarrierFailedPickup,
      PickupCancellationReason.NotReady,
      PickupCancellationReason.Other,
      PickupCancellationReason.Price,
      PickupCancellationReason.Schedule,
    ];
    const packageWeights = [1.0, 10.0, 100.0];
    const packageUnits = [
      WeightUnit.Grams,
      WeightUnit.Kilograms,
      WeightUnit.Ounces,
      WeightUnit.Pounds,
    ];

    // const dateTimes = {
    //   now: "",
    //   tomorrow: "",
    //   yesterday: "",
    // };

    for (let pickupService of carrierApp.pickupServices) {
      for (let reason of cancellationReasons) {
        for (let deliveryService of carrierApp.deliveryServices) {
          for (let packageUnit of packageUnits) {
            for (let packageWeight of packageWeights) {
              const packagePOJO: PickupPackagePOJO = {
                packaging: {
                  id: deliveryService.packaging[0].id,
                },
                weight: {
                  value: packageWeight,
                  unit: packageUnit,
                },
              };

              let pickupCancellations: PickupCancellationPOJO[] = [
                {
                  id: v4(),
                  pickupService: pickupService,
                  cancellationID: v4(),
                  reason: reason,
                  address: buildAddress("US"),
                  contact: {
                    name: "John Smith",
                  },
                  timeWindows: [
                    {
                      startDateTime: new Date(),
                      endDateTime: new Date(),
                    },
                  ],
                  shipments: [
                    {
                      packages: [packagePOJO],
                      deliveryService: deliveryService,
                    },
                  ],
                },
              ];

              const title = `cancels a pickup with delivery service: ${deliveryService.name}, package unit: ${packageUnit}, package weight: ${packageWeight}, and reason ${reason}`;

              props.push({
                title: title,
                props: [this.transactionWithMockSession, pickupCancellations],
              });
            }
          }
        }
      }
    }

    return props;
  }
}
