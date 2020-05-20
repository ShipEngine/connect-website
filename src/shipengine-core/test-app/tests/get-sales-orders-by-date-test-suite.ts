// import { Suite, TestProp, expect } from "../tiny-test";
// import { OrderApp } from "@shipengine/integration-platform-sdk";

// type GetSalesOrdersByDateProps = [];

// export class GetSalesOrdersByDateTestSuite extends Suite {
//   title = "getSalesOrdersByDate";

//   tests() {
//     const orderApp = this.app as OrderApp;

//     return this.testProps().map((testProp) => {
//       return this.test(testProp.title, async function () {
//         let result, errorResult;
//         try {
//           orderApp.getSalesOrdersByDate &&
//             (result = await orderApp.getSalesOrdersByDate(...testProp.props));
//         } catch (error) {
//           errorResult = error;
//         } finally {
//           expect(errorResult).to.be.undefined;
//           expect(result).to.be.ok;
//         }
//       });
//     });
//   }

//   private testProps(): TestProp<GetSalesOrdersByDateProps>[] {
//     const orderApp = this.app as OrderApp;
//     let props: TestProp<GetSalesOrdersByDateProps>[] = [];

//     return props;
//   }
// }
