// import { Suite, TestProp, expect } from "../tiny-test";
// import { CarrierApp } from "@shipengine/integration-platform-sdk";

// type SchedulePickupProps = [];

// export class SchedulePickupTestSuite extends Suite {
//   title = "schedulePickup";

//   tests() {
//     const carrierApp = this.app as CarrierApp;

//     return this.testProps().map((testProp) => {
//       return this.test(testProp.title, async function () {
//         let result, errorResult;
//         try {
//           carrierApp.schedulePickup &&
//             (result = await carrierApp.schedulePickup(...testProp.props));
//         } catch (error) {
//           errorResult = error;
//         } finally {
//           expect(errorResult).to.be.undefined;
//           expect(result).to.be.ok;
//         }
//       });
//     });
//   }

//   private testProps(): TestProp<SchedulePickupProps>[] {
//     const carrierApp = this.app as CarrierApp;
//     let props: TestProp<SchedulePickupProps>[] = [];

//     return props;
//   }
// }
