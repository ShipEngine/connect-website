import { WeightUnit, DeliveryService, FulfillmentService, RateCriteriaPOJO, PackageRateCriteriaPOJO, CarrierApp } from '@shipengine/integration-platform-sdk';
import { buildAddressWithContactInfo } from './address';

// TODO: Get various shipping addresses working, dependending on supported countries for the delivery services
// TODO: Get various shipping times working depending on the delivery service

export function createBaseRateCriteriaPOJOs(packageWeights: number[], packageUnits: WeightUnit[], app: CarrierApp, deliveryService?: DeliveryService, fulfillmentService?: FulfillmentService): RateCriteriaPOJO[] {
  const baseRateCriteria = [];
  for (let packageUnit of packageUnits) {
    for (let packageWeight of packageWeights) {
      const packageRateCriteriaPOJO: PackageRateCriteriaPOJO = {
        weight: {
          value: packageWeight,
          unit: packageUnit,
        },
      };


      // - Need to find the origin countries specified, and have tests to and from within that country,
      // - If destination countries exist then need to loop through the origin countries again and pair them with all the destination countries too.

      // @ts-ignore
      let rateCriteriaPOJO: PartialRateCriteriaPOJO = {
        shipDateTime: new Date(),
        deliveryDateTime: new Date(),
        packages: [packageRateCriteriaPOJO],
      }


      if (fulfillmentService) {
        rateCriteriaPOJO.fulfillmentServices = [fulfillmentService];
      }


      // TODO: if a delivery service isn't specified then get loop through all destination and origin countries???
      if (deliveryService) {

        let countryCombos = [];

        rateCriteriaPOJO.deliveryServices = [{ id: deliveryService.id }];

        for (let oCountry of deliveryService.originCountries) {
          rateCriteriaPOJO.shipFrom = buildAddressWithContactInfo(`${oCountry}-from`);
          rateCriteriaPOJO.shipTo = buildAddressWithContactInfo(`${oCountry}-to`);

          baseRateCriteria.push(Object.assign({}, rateCriteriaPOJO));

          countryCombos.push([oCountry, oCountry]);
        }

        for (let dCountry of deliveryService.destinationCountries) {
          for (let oCountry of deliveryService.originCountries) {

            const hasCountryCombo = countryCombos.some((combo) => {
              return combo[0] === oCountry && combo[1] === dCountry;
            });

            if(!hasCountryCombo) {
              rateCriteriaPOJO.shipFrom = buildAddressWithContactInfo(`${oCountry}-from`);
              rateCriteriaPOJO.shipTo = buildAddressWithContactInfo(`${dCountry}-to`);
              baseRateCriteria.push(Object.assign({}, rateCriteriaPOJO));
              countryCombos.push([oCountry, dCountry]);
            }
          }
        }
      }
      else {
        let countryCombos = [];
        for (let dCountry of app.destinationCountries) {

          for (let oCountry of app.originCountries) {

            const hasCountryCombo = countryCombos.some((combo) => {
              return combo[0] === oCountry && combo[1] === dCountry;
            });

            if(!hasCountryCombo) {
              rateCriteriaPOJO.shipFrom = buildAddressWithContactInfo(`${oCountry}-from`);
              rateCriteriaPOJO.shipTo = buildAddressWithContactInfo(`${dCountry}-to`);
              baseRateCriteria.push(Object.assign({}, rateCriteriaPOJO));
              countryCombos.push([oCountry, dCountry]);
            }
          }
        }
      }
    }
  }



  return baseRateCriteria;
}
