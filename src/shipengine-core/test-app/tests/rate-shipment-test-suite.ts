import { Suite, TestProp, expect } from "../tiny-test";
import {
  CarrierApp,
  RateCriteriaPOJO,
  TransactionPOJO,
  WeightUnit,
} from "@shipengine/integration-platform-sdk";
import { createBaseRateCriteriaPOJOs, TimeStamps } from '../factories/create-base-rate-criteria';

type RateShipmentProps = [TransactionPOJO, RateCriteriaPOJO];

// TODO: How to validate "correctness" of tests where individual or ALL delivery/fulfillment services are specified? Is this a business logic 
// that is out of the scope of the test-harness?

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
    const carrierApp = this.app as CarrierApp;
    let props: TestProp<RateShipmentProps>[] = [];
    const packageWeights = [
      1.0,
      10.0,
      100.0
    ];
    const packageUnits = [
      WeightUnit.Grams,
      WeightUnit.Kilograms,
      WeightUnit.Ounces,
      WeightUnit.Pounds,
    ];

    /**
     * The test harness needs 
     */

    // Check and test for fulfillment services to use within that deliveryService

    // Check and test for return shipments
    // Test across various datetimes for shipment dates

    // This set of rateCriteria will satisfy the condition of no delivery service or fulfillment service being specified.
    let ratePOJOs = createBaseRateCriteriaPOJOs(packageWeights, packageUnits, carrierApp);

    // Check and test for delivery services specified.
    for (let deliveryService of carrierApp.deliveryServices) {

      const deliveryServiceRatePOJOs = createBaseRateCriteriaPOJOs(packageWeights, packageUnits, carrierApp, deliveryService);
      ratePOJOs = ratePOJOs.concat(deliveryServiceRatePOJOs);

      if (deliveryService.fulfillmentService) {
        const ratePOJOWithFulfillments = createBaseRateCriteriaPOJOs(packageWeights, packageUnits, carrierApp, deliveryService, deliveryService.fulfillmentService)
        ratePOJOs = ratePOJOs.concat(ratePOJOWithFulfillments);
      }
    }

    // Use this to store and verify that there are no duplicate titles.
    let titles = new Set();
    for (let [ratePOJO, metadata] of ratePOJOs) {
      const title = composeTitle(ratePOJO, metadata.timeStamps, carrierApp);

      if (titles.has(title)) {
        throw new Error("duplicate title");
      }

      titles.add(title);

      props.push({
        title,
        props: [this.transactionWithMockSession, ratePOJO],
      });
    }

    return props;
  }
}

function composeTitle(ratePOJO: RateCriteriaPOJO, timeStamps: TimeStamps, app: CarrierApp): string {

  let title = "rate a shipment ";

  if (ratePOJO.deliveryServices) {
    let names = [];
    for (let ds of ratePOJO.deliveryServices) {
      const name = getDeliveryServiceName(ds.id, app);
      names.push(name);
    }

    if (names.length > 1) {
      title += `with delivery services: ${names.join(", ")}`;
    }
    else if (names.length === 1) {
      title += `with delivery service: ${names[0]}`;
    }
  }
  else {
    // if no Delivery Service or Fulfillment Service is specified then the test becomes added for ALL of the services.
    const names = app.deliveryServices.map(ds => ds.name);
    title += `with delivery services: ${names.join(", ")}`;

    if (ratePOJO.fulfillmentServices) {
      // Currently there will only ever be one fulfillment service per delivery service
      title += `with fulfillment service: ${ratePOJO.fulfillmentServices[0]}, `;
    }
  }

  title += ` from address: ${ratePOJO.shipFrom.country}, to address: ${ratePOJO.shipTo.country}`;
  title += ` with package unit: ${ratePOJO.packages[0].weight?.unit}, and package weight: ${ratePOJO.packages[0].weight?.value}`;

  title += ` with ship date time: ${getTimeTitle(ratePOJO.shipDateTime as string, timeStamps)},`;
  title += ` with deliveryDateTime: ${getTimeTitle(ratePOJO.deliveryDateTime as string, timeStamps)}`;

  return title;
}


function getTimeTitle(date: string, timeStamps: TimeStamps): string {

  if (date === timeStamps.yesterday) {
    return "Yesterday";
  }
  else if (date === timeStamps.today) {
    return "Today";
  }
  else if (date === timeStamps.tomorrowEarly) {
    return "Tomorrow Early";
  }
  else if (date === timeStamps.tomorrowEarlyAM) {
    return "Tomorrow Early";
  }
  else if (date === timeStamps.tomorrow) {
    return "Tomorrow";
  }
  else if (date === timeStamps.twoDays) {
    return "Two Days";
  }
  else if (date === timeStamps.twoDaysEarly) {
    return "Two Days Early";
  }
  else {
    return "Three Days";
  }
}

function getDeliveryServiceName(id: string, app: CarrierApp): string {

  const ds = app.deliveryServices.find((ds) => {
    if (ds.id === id) {
      return true;
    }
    return false;
  })

  return ds!.name;
}
