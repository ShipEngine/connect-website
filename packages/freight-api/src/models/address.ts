export interface Address {
  /**
   * The name of the company associated with this address.
   */
  company_name: string;
  /**
   * The address lines of the shipment address.
   */
  address_lines: string[];
  /**
   * The city or locality of the shipment address, where applicable.
   */
  city_locality: string;
  /**
   * The state or province of the shipment address, where applicable.
   */
  state_province: string;
  /**
   * The postal code of the shipment address.
   */
  postal_code: string;
  /**
   * The two character country code of the shipment address. The codes are specified by ISO 3166-1 alpha-2.
   */
  country_code: string;
  residential: boolean;
}
