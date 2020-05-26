import { 
  Dimensions
} from "../models";


export interface TrackResponse {
  /**
   * This model represents tracking information for a shipment.
   */
  tracking_info: TrackingInfo;
}

/**
* This model represents tracking information for a shipment.
*/
export interface TrackingInfo {
  /**
   * When the package(s) in this shipment arrived at their destination. Formatted per
   * https://tools.ietf.org/html/rfc3339. Must be in UTC.
   */
  actual_delivery_datetime?: null | string;
  /**
   * The human readable name of the carrier tracking this shipment.
   */
  carrier_name?: null | string;
  /**
   * The carrier specific status code of this shipment's tracking status.
   */
  carrier_status_code?: null | string;
  /**
   * The human readable description of this shipment's tracking status.
   */
  carrier_status_description?: null | string;
  /**
   * This property has been deprecated. Please use carrier_name.
   */
  carrierEnum?: number | null;
  /**
   * This model represents the measurements for dimensions.
   */
  dimensions?: null | Dimensions;
  /**
   * The human readable explanation of the error encountered by this shipment.
   */
  error_description?: null | string;
  /**
   * When the package(s) in this shipment are expected to arrive at their destination.
   * Formatted per https://tools.ietf.org/html/rfc3339. Must be in UTC.
   */
  estimated_delivery_datetime?: null | string;
  /**
   * All recorded tracking events for this shipment.
   */
  events?: EventElement[] | null;
  /**
   * The last recorded tracking event for this shipment.
   */
  last_event?: EventElement;
  /**
   * The carrier observed count of packages in this shipment.
   */
  package_count?: number | null;
  packaging?:     null | string;
  /**
   * A shipping provider specific service.
   */
  service?: null | Service;
  /**
   * When the package(s) in this shipment were turned over to the carrier. Formatted per
   * https://tools.ietf.org/html/rfc3339. Must be in UTC.
   */
  shipped_datetime?: null | string;
  /**
   * Whether or not this shipment has entered an error state.
   */
  shipping_problem?: boolean | null;
  /**
   * The unique identifying code for the type of error encountered by this shipment.
   */
  shipping_problem_code?: null | string;
  /**
   * A human readable description of why the shipment is in an error state.
   */
  shipping_problem_description?: null | string;
  /**
   * This represents the ShipEngine supported status codes for a shipment.
   */
  standardized_status_code: StandardizedStatusCodes;
  /**
   * The carrier specific tracking identifier for this shipment.
   */
  tracking_number?: null | string;
  /**
   * The weight measured by the carrier of the package(s) in this shipment.
   */
  weight?: number | null;
}

/**
* This model represents a tracking event for a shipment.
*/
export interface EventElement {
  city?:        null | string;
  company?:     null | string;
  country?:     null | string;
  description?: null | string;
  event_code?:  null | string;
  /**
   * When this tracking event occurred. Formatted per https://tools.ietf.org/html/rfc3339.
   * Must be in UTC.
   */
  event_datetime?: null | string;
  /**
   * This model represents a geographic point.
   */
  geo?:         EventGeo;
  postal_code?: null | string;
  signer?:      null | string;
  state?:       null | string;
}
/**
* This model represents a geographic point.
*/
export interface EventGeo {
  /**
   * The latitude of the point. Represented as signed degrees.
   * http://www.geomidpoint.com/latlon.html
   */
  lat: number;
  /**
   * The longitude of the point. Represented as signed degrees
   * http://www.geomidpoint.com/latlon.html
   */
  long: number;
}

export interface Service {
  /**
   * The code specific to a shipping provider service.
   */
  code?: null | string;
  /**
   * The name of this shipping provider service.
   */
  name?: null | string;
}

/**
* This represents the ShipEngine supported status codes for a shipment.
*/
export enum StandardizedStatusCodes {
  AC = "AC",
  At = "AT",
  De = "DE",
  Ex = "EX",
  It = "IT",
  Ny = "NY",
  Un = "UN",
}
