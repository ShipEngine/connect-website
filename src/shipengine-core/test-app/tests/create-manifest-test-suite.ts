import { Suite, TestProp, expect } from "../tiny-test";
import { buildAddress } from "../factories/address";
import { v4 } from "uuid";
import {
  CarrierApp,
  NewManifestPOJO,
  TransactionPOJO,
} from "@shipengine/integration-platform-sdk";

type CreateManifestProps = [TransactionPOJO, NewManifestPOJO];

export class CreateManifestTestSuite extends Suite {
  title = "createManifest";

  tests() {
    const carrierApp = this.app as CarrierApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let result, errorResult;
        try {
          carrierApp.createManifest &&
            (result = await carrierApp.createManifest(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<CreateManifestProps>[] {
    const transactionPOJO: TransactionPOJO = {
      id: v4(),
      isRetry: false,
      useSandbox: false,
      session: {},
    };

    const newManifestPOJO: NewManifestPOJO = {
      shipFrom: buildAddress("US"),
      openDateTime: new Date(),
      closeDateTime: new Date(),
      shipments: [{ trackingNumber: "test" }],
    };

    return [
      {
        title: "creates a new manifest",
        props: [transactionPOJO, newManifestPOJO],
      },
    ];
  }
}
