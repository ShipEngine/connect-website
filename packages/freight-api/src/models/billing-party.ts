import { Address } from "./address";
import { BillingPaymentTerms } from "./billing-payment-terms";
import { BillingPartyType } from "./billing-party-type";
import { Contact } from "./contact";

export interface BillingParty {
  type: BillingPartyType;
  payment_terms: BillingPaymentTerms;
  /**
   * The account number to use to determine the quote
   */
  account: string;
  address: Address;
  contact: Contact;
}
