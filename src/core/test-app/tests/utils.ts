import { DeliveryService, CarrierApp, Country, PickupService, DeliveryConfirmation } from '@shipengine/integration-platform-sdk';

export function getPickupServiceByName(name: string, app: CarrierApp): PickupService | undefined {
  return app.pickupServices.find((pickupService) => pickupService.name === name);
}

export function getDeliveryConfirmationByName(name: string, app: CarrierApp): DeliveryConfirmation | undefined {
  return app.deliveryConfirmations.find((dc) => dc.name === name);
}

export function findMatchingDeliveryServiceCountries(deliveryServices: DeliveryService[])
  : { originCountries: Country[]; destinationCountries: Country[] } {

  const sharedOriginCountries = deliveryServices.reduce((acc, currentDS) => {

    const filteredArray = [];

    for (let country of acc) {
      if (currentDS.originCountries.includes(country)) {
        filteredArray.push(country);
      }
    }

    return filteredArray;

  }, deliveryServices[0].originCountries);

  const sharedDestinationCountries = deliveryServices.reduce((acc, currentDS) => {

    const filteredArray = [];

    for (let country of acc) {
      if (currentDS.destinationCountries.includes(country)) {
        filteredArray.push(country);
      }
    }

    return filteredArray;

  }, deliveryServices[0].destinationCountries);

  if (sharedOriginCountries.length > 0 && sharedDestinationCountries.length > 0) {

    return { originCountries: Object.assign([], sharedOriginCountries), destinationCountries: Object.assign([], sharedDestinationCountries) };
  }

  throw new Error("Specified delivery services do not share origin and destination countries");
}

