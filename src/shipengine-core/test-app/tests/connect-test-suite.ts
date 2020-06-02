import { Suite, TestProp, expect } from "../tiny-test";
import { TransactionPOJO } from "@shipengine/integration-platform-sdk";

type ConnectProps = [TransactionPOJO, {}];

export class ConnectTestSuite extends Suite {
  title = "connect";

  tests() {
    const app = this.app;
    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let result, errorResult;
        try {
          app.connect && (result = await app.connect(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<ConnectProps>[] {
    return [
      {
        title: "saves session data",
        props: [this.transactionWithMockSession, {}],
      },
    ];
  }
}
