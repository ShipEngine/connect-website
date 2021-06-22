import { PackingSlip } from './packing-slip';

/** @description The brand requested for a fulfillment */
export interface Branding {
  /** @description Packing slip associated with the brand */
  packing_slip?: PackingSlip;
  /** @description Company name associated with the brand */
  company_name?: string;
}
