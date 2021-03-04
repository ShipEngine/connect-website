import { AddressResidentialIndicator } from "./address-residential-indicator";

export interface AddressBase {
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  company_name?: string;
  address_lines?: string[];
  city_locality?: string;
  state_province?: string;
  postal_code: string;
  country_code: string;
  address_residential_indicator?: AddressResidentialIndicator;
  is_eu?: boolean;
  address_metadata?: { [key: string]: string };
}
