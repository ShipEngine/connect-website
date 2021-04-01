/** @description Contact information for the buyer of this sales order */
export interface Buyer {
  /** @description An ID for this buyer in the vendor API */
  buyer_id?: string;
  /** @description The full name of the buyer */
  name?: string;
  /** @description The primary email address of the buyer */
  email?: string;
  /** @description The primary phone number of the buyer */
  phone?: string;
}
