import { Suite, TestProp, expect } from "../tiny-test";
import { log, logObject } from "../../utils/log-helpers";
import {
  CarrierApp,
  RateCriteriaPOJO,
  TransactionPOJO,
  WeightUnit,
} from "@shipengine/integration-platform-sdk";
import { createRateCriteriaPOJOs } from '../factories/create-base-rate-criteria';
import { TimeStamps } from '../../utils/types';
import { getTimeTitle } from '../../utils/time-stamps';

type RateShipmentProps = [TransactionPOJO, RateCriteriaPOJO];

// TODO: How to validate "correctness" of tests where individual or ALL delivery/fulfillment services are specified? Is this a business logic 
// that is out of the scope of the test-harness?

export class RateShipmentTestSuite extends Suite {
  title = "rateShipment";

  tests() {
    const carrierApp = this.app as CarrierApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async () => {
        if (this.debug) {
          log("input:");
          logObject(testProp.props[0]);
          logObject(testProp.props[1]);
        }

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
    let ratePOJOs = createRateCriteriaPOJOs(packageWeights, packageUnits, carrierApp);

    // Check and test for delivery services specified.
    // TODO: test permutations of deliveryServices, currently only creates one or ALL (by leaving delivery service empty) at a time.
    for (let deliveryService of carrierApp.deliveryServices) {

      const deliveryServiceRatePOJOs = createRateCriteriaPOJOs(packageWeights, packageUnits, carrierApp, deliveryService);
      ratePOJOs = ratePOJOs.concat(deliveryServiceRatePOJOs);

      if (deliveryService.fulfillmentService) {
        const ratePOJOWithFulfillments = createRateCriteriaPOJOs(packageWeights, packageUnits, carrierApp, deliveryService, deliveryService.fulfillmentService)
        ratePOJOs = ratePOJOs.concat(ratePOJOWithFulfillments);
      }
    }

    // Use this to store and verify that there are no duplicate titles.
    let titles = new Set();
    for (let [ratePOJO, metadata] of ratePOJOs) {
      const title = composeTitle(ratePOJO, metadata.timeStamps, carrierApp);

      if (titles.has(title)) {
        // throw new Error("duplicate title");
        // TODO: skip duplicate titles for now, come back and clean up and add other title attributes like labelFormats and labelSizes
        continue;
      }

      titles.add(title);

      props.push({
        title,
        props: [this.transaction, ratePOJO]
      });
    }

    return props;
  }
}

function composeTitle(ratePOJO: RateCriteriaPOJO, timeStamps: TimeStamps, app: CarrierApp): string {

  let title = "rate a shipment";

  if (ratePOJO.deliveryServices && ratePOJO.deliveryServices.length > 0) {
    let names = [];
    for (let ds of ratePOJO.deliveryServices) {
      const name = getDeliveryServiceName(ds.id, app);
      names.push(name);
    }

    if (names.length > 1) {
      title += ` with delivery services: ${names.join(", ")}`;
    }
    else if (names.length === 1) {
      title += ` with delivery service: ${names[0]}`;
    }
  }
  else {
    // if no Delivery Service or Fulfillment Service is specified then the test becomes added for ALL of the services.
    const names = app.deliveryServices.map(ds => ds.name);
    title += ` with delivery services: ${names.join(", ")}`;

    if (ratePOJO.fulfillmentServices && ratePOJO.fulfillmentServices.length > 0) {
      // Currently there will only ever be one fulfillment service per delivery service
      title += ` with fulfillment service: ${ratePOJO.fulfillmentServices[0]}, `;
    }
  }

  title += ` from address: ${ratePOJO.shipFrom.country}, to address: ${ratePOJO.shipTo.country}`;
  title += ` with package weight: ${ratePOJO.packages[0].weight?.value}, and package unit: ${ratePOJO.packages[0].weight?.unit}`;

  title += ` with ship date time: ${getTimeTitle(ratePOJO.shipDateTime as string, timeStamps)},`;
  title += ` with deliveryDateTime: ${getTimeTitle(ratePOJO.deliveryDateTime as string, timeStamps)}`;

  return title;
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
