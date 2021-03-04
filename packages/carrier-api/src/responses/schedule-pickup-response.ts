import { BaseResponse } from "./base-response";
import {
  PickupConfirmation,
  PickupWindow,
  BillingLineItem,
  Charge,
  Currency,
} from "../models";

export interface SchedulePickupResponse extends BaseResponse {
  confirmation?: PickupConfirmation;
  pickup_windows?: PickupWindow[];
  remarks?: string;
  custom_properties?: { [key: string]: string };
  billing_line_items?: BillingLineItem[];
  charges?: Charge[];
  charges_total?: Currency;
}
