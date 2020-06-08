import { Suite, TestProp, expect } from "../tiny-test";
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

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async () => {
        if (this.debug) {
          log("input:");
          logObject(testProp.props[0]);
          logObject(testProp.props[1]);
        }
        let result, errorResult;
        try {
          carrierApp.cancelShipments &&
            (result = await carrierApp.cancelShipments(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<CancelShipmentsProps>[] {
    const shipmentCancellationPOJOs: ShipmentCancellationPOJO[] = [
      {
        cancellationID: v4(),
      },
    ];

    return [
      {
        title: "cancels shipments",
        props: [this.transaction, shipmentCancellationPOJOs],
      },
    ];
  }
}
