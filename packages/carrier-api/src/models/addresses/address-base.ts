import { AddressResidentialIndicator } from "./address-residential-indicator";

export interface AddressBase {
  /** @description Name of the contact */
  name?: string;
  /** @description First or given name of the contact */
  first_name?: string;
  /** @description Last or family name of the contact  */
  last_name?: string;
  /** @description Email of the contact */
  email?: string;
  /** @description Phone number of the contact. Cannot include newline chars. */

  phone_number?: string;
  /** @description Company name, if applicable. Cannot include newline chars. */
  company_name?: string;
  /** @description Address fields separated by line. Up to 100 chars per line. Cannot include newline chars. */
  address_lines?: string[];
  /** @description City or locality. Cannot contain newline chars. */
  city_locality?: string;
  /** @description State or province. Cannot contain newline chars. */
  state_province?: string;
  /** @description Zip or postal code. Cannot include newline chars. */
  postal_code: string;
  /** @description ISO 3166-1 two-letter country code  */
  country_code: string;
  /** @description Whether the address is residential or commercial */
  address_residential_indicator?: AddressResidentialIndicator;
  /** @description Whether the country of the shipment address is a member of the EU */
  is_eu?: boolean;
  /** @description Metadata for this address */
  address_metadata?: { [key: string]: string };
}
