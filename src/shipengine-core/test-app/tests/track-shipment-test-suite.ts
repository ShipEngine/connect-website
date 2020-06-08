import { Suite, expect } from "../tiny-test";
import { CarrierApp, TrackingCriteriaPOJO, TransactionPOJO } from "@shipengine/integration-platform-sdk";
import { logObject } from '../../utils/log-helpers';

type TrackShipmentProps = [TransactionPOJO, TrackingCriteriaPOJO];

export class TrackShipmentTestSuite extends Suite {
  title = "trackShipment";

  tests() {
    const carrierApp = this.app as CarrierApp;

    return [
      this.test("handles an unknown tracking number", async () => {
        const trackingPOJO: TrackingCriteriaPOJO = {
          trackingNumber: "MJAYMC0WNI0WOFQXODOWMTOXNS41NJZA"
        }

        if(this.debug) {
          logObject(this.transaction);
          logObject(trackingPOJO);
        }        

        let result, errorResult;
        try {
          carrierApp.trackShipment &&
            (result = await carrierApp.trackShipment(this.transaction, trackingPOJO));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      })
    ]
  }
}
