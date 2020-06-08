import { Suite, TestProp, expect } from "../tiny-test";
import { CarrierApp, TrackingCriteriaPOJO, TransactionPOJO } from "@shipengine/integration-platform-sdk";

type TrackShipmentProps = [TransactionPOJO, TrackingCriteriaPOJO];

export class TrackShipmentTestSuite extends Suite {
  title = "trackShipment";

  tests() {
    const carrierApp = this.app as CarrierApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let result, errorResult;
        try {
          carrierApp.trackShipment &&
            (result = await carrierApp.trackShipment(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<TrackShipmentProps>[] {
    let props: TestProp<TrackShipmentProps>[] = [];
    generateNonDynamicTests(props, this.transaction);

    return props;
  }
}

function generateNonDynamicTests(props: TestProp<TrackShipmentProps>[], transaction: TransactionPOJO): void {
  const trackingPOJO: TrackingCriteriaPOJO = {
    trackingNumber: "MJAYMC0WNI0WOFQXODOWMTOXNS41NJZA"
  }

  let title = "tracking a shipment";
  title = ` with ${trackingPOJO.trackingNumber}`;

  props.push({
    title,
    props: [transaction, trackingPOJO]
  });
}