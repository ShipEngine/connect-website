import { WeightUnit, DeliveryService, FulfillmentService, RateCriteriaPOJO, PackageRateCriteriaPOJO, CarrierApp, AddressWithContactInfoPOJO, DeliveryServiceIdentifierPOJO, DeliveryServiceClass, Country } from '@shipengine/integration-platform-sdk';
import { buildAddressWithContactInfo } from './address';
import { DateTime } from "luxon";

interface RateOpts {
  deliveryServices: DeliveryServiceIdentifierPOJO[];
  fulfillmentServices: FulfillmentService[];
  shipDateTime: string;
  deliveryDateTime: string;
  shipFrom: AddressWithContactInfoPOJO;
  shipTo: AddressWithContactInfoPOJO;
  packages: PackageRateCriteriaPOJO[];
}

export interface TimeStamps {
  yesterday: string;
  today: string;
  tomorrowEarly: string;
  tomorrowEarlyAM: string;
  tomorrow: string;
  twoDays: string;
  twoDaysEarly: string;
  threeDays: string;
}

type RateCriteriaWithMetdata = Array<[RateCriteriaPOJO, { timeStamps: TimeStamps }]>;

export function createRateCriteriaPOJOs(packageWeights: number[], packageUnits: WeightUnit[], app: CarrierApp, deliveryService?: DeliveryService, fulfillmentService?: FulfillmentService): RateCriteriaWithMetdata {
  const baseRateCriteria: RateCriteriaWithMetdata = [];
  for (let packageUnit of packageUnits) {
    for (let packageWeight of packageWeights) {
      const packageRateCriteriaPOJO: PackageRateCriteriaPOJO = {
        weight: {
          value: packageWeight,
          unit: packageUnit,
        },
      };

      let rateCriteriaOpts: RateOpts = {
        deliveryServices: [],
        fulfillmentServices: [],
        shipDateTime: "",
        deliveryDateTime: "",
        packages: [packageRateCriteriaPOJO],
        shipFrom: buildAddressWithContactInfo(`US-from`)!,
        shipTo: buildAddressWithContactInfo(`US-to`)!
      }

      if (fulfillmentService) {
        rateCriteriaOpts.fulfillmentServices = [fulfillmentService];
      }

      if (deliveryService) {
        rateCriteriaOpts.deliveryServices.push({ id: deliveryService.id });

        // Handle combinations of packages within the
        countryAndTimePermutations(deliveryService.originCountries.slice(), deliveryService.originCountries.slice(), baseRateCriteria, rateCriteriaOpts, deliveryService);
      }
      //If a delivery service isn't specified then get loop through all destination and origin countries
      else {
        countryAndTimePermutations(app.originCountries.slice(), app.destinationCountries.slice(), baseRateCriteria, rateCriteriaOpts);
      }
    }
  }

  return baseRateCriteria;
}


function countryAndTimePermutations(originCountries: Country[], destinationCountries: Country[], baseRateCriteria: RateCriteriaWithMetdata, rateCriteriaOpts: RateOpts, deliveryService?: DeliveryService): void {

  let countryCombos: Array<[string, string]> = [];
  for (let dCountry of destinationCountries) {
    for (let oCountry of originCountries) {

      const hasCountryCombo = countryCombos.some((combo) => {
        return combo[0] === oCountry && combo[1] === dCountry;
      });

      if (!hasCountryCombo && buildAddressWithContactInfo(`${oCountry}-from`) && buildAddressWithContactInfo(`${dCountry}-from`)) {
        rateCriteriaOpts.shipFrom = buildAddressWithContactInfo(`${oCountry}-from`)!;
        rateCriteriaOpts.shipTo = buildAddressWithContactInfo(`${dCountry}-to`)!;

        let timeStamps;
        if (!deliveryService) {
          timeStamps = initializeTimeStamps(rateCriteriaOpts.shipFrom.timeZone);

          rateCriteriaOpts.shipDateTime = timeStamps.today;
          rateCriteriaOpts.deliveryDateTime = timeStamps.twoDays;
        }
        else {
          timeStamps = initializeTimeStamps(rateCriteriaOpts.shipFrom.timeZone);

          const results = parseDeliveryService(deliveryService, timeStamps);
          rateCriteriaOpts.shipDateTime = results[0];
          rateCriteriaOpts.deliveryDateTime = results[1];
        }

        let rateCriteriaPOJO: RateCriteriaPOJO = rateCriteriaOpts;

        baseRateCriteria.push([Object.assign({}, rateCriteriaPOJO), { timeStamps }]);
        countryCombos.push([oCountry, dCountry]);
      }
    }
  }
}

function parseDeliveryService(deliveryService: DeliveryService, timeStamps: TimeStamps): [string, string] {
  switch (deliveryService.class) {
    // Two day gap?
    case DeliveryServiceClass.Ground:
      return [timeStamps.today, timeStamps.twoDays];

    case DeliveryServiceClass.OneDay:
      return [timeStamps.today, timeStamps.tomorrow];

    case DeliveryServiceClass.OneDayEarly:
      return [timeStamps.today, timeStamps.tomorrowEarly];

    case DeliveryServiceClass.OneDayEarlyAm:
      return [timeStamps.today, timeStamps.tomorrowEarlyAM];

    case DeliveryServiceClass.TwoDay:
      return [timeStamps.today, timeStamps.twoDays];

    case DeliveryServiceClass.TwoDayEarly:
      return [timeStamps.today, timeStamps.twoDaysEarly];

    case DeliveryServiceClass.ThreeDay:
      return [timeStamps.today, timeStamps.threeDays];
  }
}

// TODO: currently all the timestamps are based off of the origin addresses' timezone, research whether that is common for most carriers?
function initializeTimeStamps(timeZone: string): TimeStamps {

  let date = new Date();

  let yesterday = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ hours: 12 }).minus({ days: 1 }).toISO();
  let today = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ hours: 12 }).toISO();
  let tomorrowEarly = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 1, hours: 9 }).toISO();
  let tomorrowEarlyAM = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 1, hours: 6 }).toISO();
  let tomorrow = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 1, hours: 12 }).toISO();
  let twoDays = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 2, hours: 12 }).toISO();
  let twoDaysEarly = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 2, hours: 9 }).toISO();
  let threeDays = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 3 }).toISO();

  const timeStamps: TimeStamps = {
    yesterday,
    today,
    tomorrowEarly,
    tomorrowEarlyAM,
    tomorrow,
    twoDays,
    twoDaysEarly,
    threeDays
  }

  return timeStamps;
}