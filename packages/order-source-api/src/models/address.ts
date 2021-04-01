/**
 * @description Describes information about a drop off / pickup location
 */
export interface PickupLocation {
  /** @description An id specific to the carrier about this drop off / pickup location */
  carrier_id: string;
  /** @description The id of a relay point used for the drop off / pickup location */
  relay_id: string;
}

/**
 * @description Used to indicate whether an address is in a residential or commercial area
 */
export enum ResidentialIndicator {
  Residential = "R",
  Commercial = "C",
}

/**
 * @description This defines the shape of an address
 */
export interface Address {
  /** @description The name of the individual associated with this address */
  name?: string;
  /** @description The name of the company associated with this address */
  company?: string;
  /** @description The phone number associated with this address */
  phone?: string;
  /** @description The first line of the address */
  address_line_1?: string;
  /** @description The second line of the address */
  address_line_2?: string;
  /** @description The third line of the address */
  address_line_3?: string;
  /** @description The city associated with this address */
  city?: string;
  /** @description The state, province, or municipality of the address */
  state_province?: string;
  /** @description The postal code associated with this address */
  postal_code?: string;
  /** @description The two character ISO 3166 country code of this address @example ("US","MX","CA") */
  country_code?: string;
  /** @description Indicates this is a residential or commercial address. Values: 'R', 'C', and null */
  residential_indicator?: string | ResidentialIndicator;
  /** @description Indicates whether or not this address has been verified using an Address Verification Service. Values: true, false, and null */
  is_verified?: boolean;
  /** @description Information details related to a pickup location if applicable */
  pickup_location?: PickupLocation;
}
