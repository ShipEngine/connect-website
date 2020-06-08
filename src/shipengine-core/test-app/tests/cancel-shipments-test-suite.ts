import { Suite, expect } from "../tiny-test";
import { v4 } from "uuid";
import { log, logObject } from "../../utils/log-helpers";
import {
  CarrierApp,
  ShipmentCancellationPOJO,
  TransactionPOJO,
} from "@shipengine/integration-platform-sdk";

type CancelShipmentsProps = [TransactionPOJO, ShipmentCancellationPOJO[]];

export class CancelShipmentsTestSuite extends Suite {
  title = "cancelShipments";

  tests() {
    const carrierApp = this.app as CarrierApp;
    return [
      this.test("handles an unknown cancellationID", async () => {
        const shipmentCancellationPOJOs: ShipmentCancellationPOJO[] = [
          {
            cancellationID: v4(),
          },
        ];

        if (this.debug) {
          log("input:");
          logObject(this.transaction);
          logObject(shipmentCancellationPOJOs);
        }

        let result, errorResult;
        try {
          carrierApp.cancelShipments &&
            (result = await carrierApp.cancelShipments(
              this.transaction,
              shipmentCancellationPOJOs,
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
}
