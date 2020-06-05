import { Suite, TestProp, expect } from "../tiny-test";
import { buildAddressWithContactInfo } from "../factories/address";
import {
  CarrierApp,
  RateCriteriaPOJO,
  TransactionPOJO,
  PackageRateCriteriaPOJO,
  WeightUnit,
} from "@shipengine/integration-platform-sdk";

type RateShipmentProps = [TransactionPOJO, RateCriteriaPOJO];

export class RateShipmentTestSuite extends Suite {
  title = "rateShipment";

  tests() {
    const carrierApp = this.app as CarrierApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let result, errorResult;
        try {
          carrierApp.rateShipment &&
            (result = await carrierApp.rateShipment(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<RateShipmentProps>[] {
    let props: TestProp<RateShipmentProps>[] = [];
    const packageWeights = [1.0, 10.0, 100.0];
    const packageUnits = [
      WeightUnit.Grams,
      WeightUnit.Kilograms,
      WeightUnit.Ounces,
      WeightUnit.Pounds,
    ];
    for (let packageUnit of packageUnits) {
      for (let packageWeight of packageWeights) {
        const packageRateCriteriaPOJO: PackageRateCriteriaPOJO = {
          weight: {
            value: packageWeight,
            unit: packageUnit,
          },
        };

        const rateCriteriaPOJO: RateCriteriaPOJO = {
          shipFrom: buildAddressWithContactInfo("US"),
          shipTo: buildAddressWithContactInfo("US"),
          shipDateTime: new Date(),
          packages: [packageRateCriteriaPOJO],
        };

        props.push({
          title: `rate a shipment with package unit: ${packageUnit}, and package weight: ${packageWeight}`,
          props: [this.transaction, rateCriteriaPOJO],
        });
      }
    }

    return props;
  }
}
