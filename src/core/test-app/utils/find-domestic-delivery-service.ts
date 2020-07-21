import { DeliveryService, Country } from '@shipengine/integration-platform-sdk';

/**
 * Find a Domestic delivery service and returns a list of countries that you can use to
 * test domestic routes.
 */
export function findDomesticDeliveryService(
  deliveryServices: DeliveryService[],
): DomesticDeliveryService {
  const domesticDS: DomesticDeliveryService = [];

  for (let ds of deliveryServices) {
    const domesticCountries = [];
    for (let country of ds.originCountries) {
      if (ds.destinationCountries.includes(country)) {
        domesticCountries.push(country);
      }
    }

    if (domesticCountries.length > 0) {
      domesticDS.push({ deliveryService: ds, domesticCountries });
    }
  }

  return domesticDS;
}

export type DomesticDeliveryService = Array<{
  deliveryService: DeliveryService;
  domesticCountries: Country[];
}>;
