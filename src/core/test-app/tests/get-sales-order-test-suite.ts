// import { Suite, TestProp, expect } from "../tiny-test";
// import { OrderApp } from "@shipengine/integration-platform-sdk";

// type GetSalesOrderProps = [];

// export class GetSalesOrderTestSuite extends Suite {
//   title = "getSalesOrder";

//   tests() {
//     const orderApp = this.app as OrderApp;

//     return this.testProps().map((testProp) => {
//       return this.test(testProp.title, async function () {
//         let result, errorResult;
//         try {
//           orderApp.getSalesOrder &&
//             (result = await orderApp.getSalesOrder(...testProp.props));
//         } catch (error) {
//           errorResult = error;
//         } finally {
//           expect(errorResult).to.be.undefined;
//           expect(result).to.be.ok;
//         }
//       });
//     });
//   }

//   private testProps(): TestProp<GetSalesOrderProps>[] {
//     const carrierApp = this.app as OrderApp;
//     let props: TestProp<GetSalesOrderProps>[] = [];

//     return props;
//   }
// }
