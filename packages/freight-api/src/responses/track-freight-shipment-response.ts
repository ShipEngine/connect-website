import { TrackingStatusCode } from "../models";
import { BaseCarrierResponse } from "./base-carrier-response";

export interface TrackFreightShipmentResponse extends BaseCarrierResponse {
  pro_number: string;
  ship_from?: {
    address?: {
      postal_code?: string;
    };
  };
  ship_to?: {
    address?: {
      postal_code?: string;
    };
  };
  pickup?: {
    /**
     * Date Format: YYYY-MM-DD
     */
    date: string;
  };
  delivery?: {
    estimated?: {
      /**
       * Date Format: YYYY-MM-DD
       */
      date: string;
      /**
       * 24 Hour Format: HH:MM:SS, HH:MM:SSZ, HH:MM:SS+/-HH:MM
       */
      time?: string;
    };
    actual?: {
      /**
       * Date Format: YYYY-MM-DD
       */
      date: string;
      /**
       * 24 Hour Format: HH:MM:SS, HH:MM:SSZ, HH:MM:SS+/-HH:MM
       */
      time?: string;
    };
    signature?: {
      name: string;
    };
  };
  events: {
    /**
     * Valid values for tracking status codes include:
     * * `delivered` - The shipment has been delivered
     * * `exception` - Denotes that an exception occurred that is outside of the normal shipment lifecycle
     * * `in_transit` - The shipment is in transit
     * * `info` - Informational status about the shipment
     * * `out_for_delivery`: The shipment is out for delivery
     * * `picked_up`: The shipment has been picked up
     * * `unknown`: Used to indicate statuses that may be undocumented by a carrier.
     *
     */
    status: TrackingStatusCode;
    /**
     * Date Format: YYYY-MM-DD
     */
    date: string;
    /**
     * 24 Hour Format: HH:MM:SS, HH:MM:SSZ, HH:MM:SS+/-HH:MM
     */
    time?: string;
    location?: {
      city_locality?: string;
      state_province?: string;
    };
    carrier?: {
      /**
       * Optional carrier-supplied description of the tracking event
       */
      description?: string;
    };
  }[];
}
