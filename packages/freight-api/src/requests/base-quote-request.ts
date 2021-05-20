import {
  AccessorialService,
  Address,
  BillingParty,
  Container,
  DimensionUnitType,
  RequestingParty,
  WeightUnitType,
} from "../models";
import { BaseCarrierRequest } from "./base-carrier-request";

export interface BaseQuoteRequest extends BaseCarrierRequest {
  pickup: {
    date: string;
  };
  containers: Container[];
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
    total_width: {
      value: number;
      unit: DimensionUnitType;
    };
    /**
     * The total height of the shipment configuration as it will be loaded into the trailer
     */
    total_height: {
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
    address: Address;
  };
  ship_to: {
    account?: string;
    address: Address;
  };
  bill_to: BillingParty;
  requested_by: RequestingParty;
}
