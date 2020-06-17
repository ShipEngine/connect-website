import { Suite, TestProp, expect } from "../tiny-test";
import { OrderApp, TransactionPOJO, SalesOrderIdentifierPOJO } from "@shipengine/integration-platform-sdk";

type GetSalesOrderProps = [TransactionPOJO, SalesOrderIdentifierPOJO];

export class GetSalesOrderTestSuite extends Suite {
  title = "getSalesOrder";

  tests() {
    const orderApp = this.app as OrderApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let result, errorResult;
        try {
          orderApp.getSalesOrder &&
            (result = await orderApp.getSalesOrder(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<GetSalesOrderProps>[] {
    let props: TestProp<GetSalesOrderProps>[] = [];

    // Check shipengine.config.js for props to add to the test module
    if (this.staticConfig.methods && this.staticConfig.methods.getSalesOrder) {
      for (let prop of this.staticConfig.methods.getSalesOrder) {
        const title = composeTitle(prop);
        props.push({
          title,
          props: [this.transaction, prop]
        });
      }
    }

    props.push({
      title: "Get Sales Order: handles an unknown sales order id",
      props: [this.transaction, {
        id: "947294"
      }]
    })

    return props;
  }
}

function composeTitle(prop: SalesOrderIdentifierPOJO): string {
  let title = `Get Sales Order: with an ID of ${prop.id}`;
  return title;
}
