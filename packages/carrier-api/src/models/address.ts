export enum AddressResidentialIndicator {
  Commercial = "commercial",
  Residential = "residential",
  No = "no",
  Yes = "yes",
  Unknown = "unknown",
}

export interface Address {
  /**
   * The address lines of the shipment address.
   */
  address_lines?: Array<null | string> | null;
  /**
   * Whether the shipment address is residential.
   */
  address_residential_indicator?: AddressResidentialIndicator | null;
  /**
   * The city or locality of the shipment address, where applicable.
   */
  city_locality?: null | string;
  /**
   * The name of the company associated with this address.
   */
  company_name?: null | string;
  /**
   * The two character country code of the shipment address. The codes are specified by ISO
   * 3166-1 alpha-2.
   */
  country_code: string;
  /**
   * The email of the shipment address.
   */
  email?: null | string;
  /**
   * The first name of the shipment address.
   */
  first_name?: null | string;
  /**
   * Whether the country of the shipment address is a member of the EU. Specified by
   * https://www.gov.uk/eu-eea.
   */
  is_eu?: boolean | null;
  /**
   * The last name of the shipment address.
   */
  last_name?: null | string;
  /**
   * The full unparsed name of the shipment address.
   */
  name?: null | string;
  /**
   * The phone number of the shipment address.
   */
  phone_number?: null | string;
  /**
   * The postal code of the shipment address.
   */
  postal_code: string;
  /**
   * The state or province of the shipment address, where applicable.
   */
  state_province?: null | string;
}
