import { Suite, TestProp, expect } from "../tiny-test";
import { OrderApp, TransactionPOJO, SellerIdentifierPOJO } from "@shipengine/integration-platform-sdk";

type GetSellerProps = [TransactionPOJO, SellerIdentifierPOJO];

export class GetSellerTestSuite extends Suite {
  title = "getSeller";

  tests() {
    const orderApp = this.app as OrderApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let result, errorResult;
        try {
          orderApp.getSeller &&
            (result = await orderApp.getSeller(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<GetSellerProps>[] {
    let props: TestProp<GetSellerProps>[] = [];

    if (this.staticConfig.getSeller) {
      for (let prop of this.staticConfig.getSeller) {
        const title = composeTitle(prop);
        props.push({
          title,
          props: [this.transaction, prop]
        });
      }
    }

    props.push({
      title: "Handles an unknown seller id",
      props: [this.transaction, {
        id: "947294"
      }]
    })

    return props;
  }
}

function composeTitle(prop: SellerIdentifierPOJO): string {
  let title = `Get Seller with an ID of ${prop.id}`;
  return title;
}
