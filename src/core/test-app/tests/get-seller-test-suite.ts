// import { Suite, TestProp, expect } from "../tiny-test";
// import { OrderApp } from "@shipengine/integration-platform-sdk";

// type GetSellerProps = [];

// export class GetSellerTestSuite extends Suite {
//   title = "getSeller";

//   tests() {
//     const orderApp = this.app as OrderApp;

//     return this.testProps().map((testProp) => {
//       return this.test(testProp.title, async function () {
//         let result, errorResult;
//         try {
//           orderApp.getSeller &&
//             (result = await orderApp.getSeller(...testProp.props));
//         } catch (error) {
//           errorResult = error;
//         } finally {
//           expect(errorResult).to.be.undefined;
//           expect(result).to.be.ok;
//         }
//       });
//     });
//   }

//   private testProps(): TestProp<GetSellerProps>[] {
//     const orderApp = this.app as OrderApp;
//     let props: TestProp<GetSellerProps>[] = [];

//     return props;
//   }
// }
