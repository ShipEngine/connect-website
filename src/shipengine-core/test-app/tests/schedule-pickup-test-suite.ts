import { Suite, TestProp, expect } from "../tiny-test";
import { CarrierApp, TransactionPOJO, PickupRequestPOJO, PickupPackagePOJO, PickupShipmentPOJO, WeightUnit } from "@shipengine/integration-platform-sdk";
import { initializeTimeStamps, getTimeTitle } from '../../utils/time-stamps';
import { buildAddress } from '../factories/address';
import { buildContactInfo } from '../factories/contact-info';
import { TimeStamps } from '../../utils/types';

type SchedulePickupProps = [TransactionPOJO, PickupRequestPOJO];

export class SchedulePickupTestSuite extends Suite {
  title = "schedulePickup";

  tests() {
    const carrierApp = this.app as CarrierApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let result, errorResult;
        try {
          carrierApp.schedulePickup &&
            (result = await carrierApp.schedulePickup(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<SchedulePickupProps>[] {
    const carrierApp = this.app as CarrierApp;
    let props: TestProp<SchedulePickupProps>[] = [];

    const deliveryService = carrierApp.deliveryServices[0];
    const address = buildAddress(`US-from`);
    const timestamps = initializeTimeStamps(address.timeZone);
    const packageWeights = [1.0, 10.0, 100.0];
    const packageUnits = [
      WeightUnit.Grams,
      WeightUnit.Kilograms,
      WeightUnit.Ounces,
      WeightUnit.Pounds,
    ];

    for (let value of packageWeights) {
      for (let unit of packageUnits) {

        const dsPackaging = deliveryService.packaging[0];
        const pickupPackage: PickupPackagePOJO = {
          packaging: {
            id: dsPackaging.id
          },
          weight: {
            value,
            unit
          }
        };

        const pickupShipment: PickupShipmentPOJO = {
          // TODO: How do I know if the delivery service supports pickup?
          deliveryService: { id: deliveryService.id },
          packages: [pickupPackage]
        };

        let pickupRequestPOJO: PickupRequestPOJO = {
          pickupService: { id: carrierApp.pickupServices[0].id },
          timeWindow: {
            startDateTime: timestamps.today,
            endDateTime: timestamps.tomorrow
          },
          contact: buildContactInfo("US-from"),
          shipments: [pickupShipment],
          address
        };

        const title = composeTitle(pickupRequestPOJO, timestamps, carrierApp);
        
        props.push({
          title,
          props: [this.transaction, pickupRequestPOJO]
        })
      }
    }

    return props;
  }
}


function composeTitle(pickupRequest: PickupRequestPOJO, timestamps: TimeStamps, app: CarrierApp): string {
  let title = `schedule a pickup`;
  title += ` with Pickup Service: ${getPickupRequestName(pickupRequest.pickupService.id, app)}`;

  const startTime = getTimeTitle(pickupRequest.timeWindow.startDateTime as string, timestamps);
  const endTime = getTimeTitle(pickupRequest.timeWindow.endDateTime as string, timestamps);

  title += ` with a time window of ${startTime} - ${endTime}`;
  title += ` with a pickup address: ${pickupRequest.address.country}`;

  const pickupPackagee = pickupRequest.shipments[0].packages[0];
  title += ` with package weight: ${pickupPackagee.weight?.value}, and package unit: ${pickupPackagee.weight?.unit}`;

  return title;
}

function getPickupRequestName(id: string, app: CarrierApp): string {

  const ps = app.pickupServices.find((ps) => {
    if (ps.id === id) {
      return true;
    }
    return false;
  })

  return ps!.name;
}
