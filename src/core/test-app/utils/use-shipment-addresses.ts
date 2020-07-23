import {
  DeliveryService,
  AddressWithContactInfoPOJO,
} from "@shipengine/integration-platform-sdk";
import { buildAddressWithContactInfo } from '../factories/address';

/**
 * Return a tuple of shipFrom and shipTo addresses if available
 */
export default function useShipmentAddresses(deliveryService: DeliveryService): [AddressWithContactInfoPOJO | undefined, AddressWithContactInfoPOJO | undefined] {

  const shipFrom = buildAddressWithContactInfo(`${deliveryService.originCountries[0]}-from`);
  const shipTo = buildAddressWithContactInfo(`${deliveryService.destinationCountries[0]}-to`)

  return [shipFrom, shipTo];
}
