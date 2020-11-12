import {
  DeliveryService,
  AddressWithContactInfoPOJO,
  ServiceArea,
} from "@shipengine/connect-sdk";
import useDomesticShippingAddress from './use-domestic-shipment-addresses';
import useInternationalShipmentAddresses from './use-international-shipment-addresses';

/**
 * Return a tuple of shipFrom and shipTo addresses if available
 */
export default function useShipmentAddresses(deliveryService: DeliveryService): [AddressWithContactInfoPOJO | undefined, AddressWithContactInfoPOJO | undefined] {
  if(deliveryService.serviceArea === ServiceArea.Global || deliveryService.serviceArea === ServiceArea.International) {
    const internationalAddress = useInternationalShipmentAddresses(deliveryService);
    return internationalAddress;
  } else {
    const domesticAddress =  useDomesticShippingAddress(deliveryService);
    return domesticAddress;
  }
}
