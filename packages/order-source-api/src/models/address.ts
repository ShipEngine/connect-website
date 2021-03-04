export interface Address {
  name?: string;
  company?: string;
  phone?: string;
  address_line_1: string;
  address_line_2?: string;
  address_line_3?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country_code?: string;
  residential_indicator?: string;
  is_verified?: boolean;
}
