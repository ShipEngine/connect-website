import {
  AccessorialService,
  Address,
  BillingPartyType,
  BillingPaymentTerms,
  Contact,
  Dimensions,
  RequestingParty,
  Time,
  Weight,
} from '../models';
import { BaseCarrierRequest } from './base-carrier-request';

/**
 * Schedule a freight pickup / dispatch.
 */
export interface ScheduleFreightPickupRequest extends BaseCarrierRequest {
  quote: {
    /**
     * Quote ID received from the carrier
     */
    id: string;
  };
  /**
   * Service level for the pickup request
   */
  service_level: {
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
  containers: {
    /**
     * The container/packaging code for this container
     */
    code: string;
    /**
     * NMFC freight class
     */
    freight_class:
      | 50
      | 55
      | 60
      | 65
      | 70
      | 77.5
      | 85
      | 92.5
      | 100
      | 110
      | 125
      | 150
      | 175
      | 200
      | 250
      | 300
      | 400
      | 500;
    /**
     * NMFC commodity code / item number
     */
    nmfc_code?: string;
    /**
     * The description of the item(s) in this container
     */
    description: string;
    dimensions: Dimensions;
    weight: Weight;
    quantity: number;
    stackable: boolean;
    hazardous_materials: boolean;
  }[];
  accessorials?: AccessorialService[];
  ship_from: {
    address: Address;
    contact: Contact;
  };
  ship_to: {
    address: Address;
    contact: Contact;
  };
  bill_to: {
    type: BillingPartyType;
    payment_terms: BillingPaymentTerms;
    /**
     * The account number to use to determine the quote
     */
    account?: string;
    address?: Address;
    contact?: Contact;
  };
  requested_by: RequestingParty;
  carrier?: {
    /**
     * Optional instructions for the carrier
     */
    instructions?: string;
    /**
     * By setting `test` to true a pickup will not be created with the carrier.
     */
    test?: boolean;
  };
}
