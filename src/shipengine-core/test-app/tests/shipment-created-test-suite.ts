// import { Suite, TestProp, expect } from "../tiny-test";
// import { OrderApp } from "@shipengine/integration-platform-sdk";

// type ShipmentCreatedProps = [];

// export class ShipmentCreatedTestSuite extends Suite {
//   title = "shipmentCreated";

//   tests() {
//     const orderApp = this.app as OrderApp;

//     return this.testProps().map((testProp) => {
//       return this.test(testProp.title, async function () {
//         let result, errorResult;
//         try {
//           orderApp.shipmentCreated &&
//             (result = await orderApp.shipmentCreated(...testProp.props));
//         } catch (error) {
//           errorResult = error;
//         } finally {
//           expect(errorResult).to.be.undefined;
//           expect(result).to.be.ok;
//         }
//       });
//     });
//   }

//   private testProps(): TestProp<ShipmentCreatedProps>[] {
//     const orderApp = this.app as OrderApp;
//     let props: TestProp<ShipmentCreatedProps>[] = [];

//     return props;
//   }
// }
