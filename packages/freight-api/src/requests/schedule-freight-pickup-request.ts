import {
  AccessorialService,
  Address,
  BillingParty,
  Contact,
  Container,
  RequestingParty,
  Time,
} from "../models";
import { BaseCarrierRequest } from "./base-carrier-request";

/**
 * Schedule a freight pickup / dispatch.
 */
export interface ScheduleFreightPickupRequest extends BaseCarrierRequest {
  service: {
    code: string;
  };
  pickup: {
    /**
     * Date Format: YYYY-MM-DD
     */
    date: string;
    /**
     * 24 Hour Format: HH:MM:SS, HH:MM:SSZ, HH:MM:SS+/-HH:MM
     */
    earliest_time: Time;
    /**
     * 24 Hour Format: HH:MM:SS, HH:MM:SSZ, HH:MM:SS+/-HH:MM
     */
    latest_time: Time;
    /**
     * 24 Hour Format: HH:MM:SS, HH:MM:SSZ, HH:MM:SS+/-HH:MM
     */
    closing_time: Time;
  };
  delivery?: {
    /**
     * Date Format: YYYY-MM-DD
     */
    date: string;
  };
  containers: Container[];
  accessorials?: AccessorialService[];
  ship_from: {
    address: Address;
    contact: Contact;
  };
  ship_to: {
    address: Address;
    contact: Contact;
  };
  bill_to?: BillingParty;
  requested_by: RequestingParty;
  carrier?: {
    /**
     * Optional shipment comments for the carrier
     */
    comments?: string;
  };
}
