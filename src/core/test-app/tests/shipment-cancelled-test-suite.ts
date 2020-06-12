// import { Suite, TestProp, expect } from "../tiny-test";
// import { OrderApp } from "@shipengine/integration-platform-sdk";

// type ShipmentCancelledProps = [];

// export class ShipmentCancelledTestSuite extends Suite {
//   title = "shipmentCancelled";

//   tests() {
//     const orderApp = this.app as OrderApp;

//     return this.testProps().map((testProp) => {
//       return this.test(testProp.title, async function () {
//         let result, errorResult;
//         try {
//           orderApp.shipmentCancelled &&
//             (result = await orderApp.shipmentCancelled(...testProp.props));
//         } catch (error) {
//           errorResult = error;
//         } finally {
//           expect(errorResult).to.be.undefined;
//           expect(result).to.be.ok;
//         }
//       });
//     });
//   }

//   private testProps(): TestProp<ShipmentCancelledProps>[] {
//     const orderApp = this.app as OrderApp;
//     let props: TestProp<ShipmentCancelledProps>[] = [];

//     return props;
//   }
// }
