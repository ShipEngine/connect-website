import { Identifier } from '../identifier';
import { FulfillmentPlanItems } from './fulfillment-plan-items';
import { RawExternalSource } from './raw-external-source';

export interface FulfillmentPlanDetails {
  external_sales_order_identifiers?: Identifier[];
  items?: FulfillmentPlanItems[];
  raw_external_source?: RawExternalSource;
  fulfillment_plan_items?: FulfillmentPlanItems;
}
