import type { AddressWithContactInfo, AddressWithContactInfoPOJO } from "./address-with-contact-info";
import type { PickupLocation, PickupLocationPOJO } from "./pickup-location";

/**
 * A mailing address with a person's contact info and a pickup location
 */
export interface AddressWithContactInfoAndPickupLocationPOJO extends AddressWithContactInfoPOJO {
    pickupLocation?: PickupLocationPOJO;
}


/**
 * A mailing address with a person's contact info and a pickup location
 */
export interface AddressWithContactInfoAndPickupLocation extends AddressWithContactInfo {
    pickupLocation?: PickupLocation;
}
