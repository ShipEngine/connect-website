import {
  AccessorialService,
  Address,
  BillingPartyType,
  BillingPaymentTerms,
  Contact,
  Dimensions,
  DimensionUnitType,
  QuoteAddress,
  RequestingParty,
  Weight,
  WeightUnitType,
} from '../models';
import { BaseCarrierRequest } from './base-carrier-request';

/**
 * Obtain a spot price quote for a freight shipment. Spot quotes are typically discounted rates based on excess carrier capacity vs contractual rates. The carrier will return the service level they are able to offer as opposed to specifying the desired service level in the request.
 *
 * Note: in terms of user workflow for spot quotes, the expectation is that the quote ID coming back from the carrier is included on the BOL they provide the carrier at the time of pickup, allowing the carrier to match the shipment to the original quote and invoice it correctly. Additionally, as spot quotes can expire, if the quote has expired at the time of pickup a new spot quote should be created to include in the BOL.
 */
export interface FreightSpotQuoteRequest extends BaseCarrierRequest {
  pickup: {
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
  /**
   * The dimensions and weight consumed by the shipment once loaded in the trailer
   */
  shipment_measurements: {
    /**
     * The total linear length of the shipment as it will be loaded into the trailer, calculated based on the length of an individual container, factoring in whether containers can be stacked and/or fit widthwise in the trailer
     */
    total_linear_length: {
      value: number;
      unit: DimensionUnitType;
    };
    /**
     * The total width of the shipment configuration as it will be loaded into the trailer
     */
    total_width?: {
      value: number;
      unit: DimensionUnitType;
    };
    /**
     * The total height of the shipment configuration as it will be loaded into the trailer
     */
    total_height?: {
      value: number;
      unit: DimensionUnitType;
    };
    /**
     * The total weight of the shipment configuration as it will be loaded into the trailer
     */
    total_weight: {
      value: number;
      unit: WeightUnitType;
    };
  };
  accessorials?: AccessorialService[];
  ship_from: {
    account?: string;
    address: QuoteAddress;
  };
  ship_to: {
    account?: string;
    address: QuoteAddress;
  };
  bill_to: {
    type: BillingPartyType;
    payment_terms: BillingPaymentTerms;
    /**
     * The account number to use to determine the quote
     */
    account?: string;
    address?: Address;
    contact: Contact;
  };
  requested_by: RequestingParty;
}
