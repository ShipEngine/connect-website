import {
  DeliveryService,
  AddressWithContactInfoPOJO,
} from "@shipengine/connect-sdk";
import { buildAddressWithContactInfo } from "../factories/address";

/**
 * Return a tuple of shipFrom and shipTo addresses if available
 */
export default function useShipmentAddresses(deliveryService: DeliveryService): [AddressWithContactInfoPOJO | undefined, AddressWithContactInfoPOJO | undefined] {

  for (const oc of deliveryService.originCountries) {
    const shipFrom = buildAddressWithContactInfo(`${oc}-from`);

    for (const dc of deliveryService.destinationCountries) {
      const shipTo = buildAddressWithContactInfo(`${dc}-to`);

      if (shipFrom && shipTo) {
        return [shipFrom, shipTo];
      }
    }
  }

  return [undefined, undefined];
}
