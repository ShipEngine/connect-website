// import { Suite, TestProp, expect } from "../tiny-test";
// import { CarrierApp } from "@shipengine/integration-platform-sdk";

// type TrackShipmentProps = [];

// export class TrackShipmentTestSuite extends Suite {
//   title = "trackShipment";

//   tests() {
//     const carrierApp = this.app as CarrierApp;

//     return this.testProps().map((testProp) => {
//       return this.test(testProp.title, async function () {
//         let result, errorResult;
//         try {
//           carrierApp.trackShipment &&
//             (result = await carrierApp.trackShipment(...testProp.props));
//         } catch (error) {
//           errorResult = error;
//         } finally {
//           expect(errorResult).to.be.undefined;
//           expect(result).to.be.ok;
//         }
//       });
//     });
//   }

//   private testProps(): TestProp<TrackShipmentProps>[] {
//     const carrierApp = this.app as CarrierApp;
//     let props: TestProp<TrackShipmentProps>[] = [];

//     return props;
//   }
// }
