import { Charge } from "./charge";

export enum PaymentStatus {
  AwaitingPayment = "AwaitingPayment",
  PaymentCancelled = "PaymentCancelled",
  PaymentFailed = "PaymentFailed",
  PaymentInProcess = "PaymentInProcess",
  Paid = "Paid",
  Other = "Other",
}

export interface Payment {
  payment_id?: string;
  payment_status?: PaymentStatus;
  taxes?: Charge[];
  shipping_charges?: Charge[];
  adjustments?: Charge[];
  amount_paid?: number;
  coupon_code?: string[];
  payment_method?: string;
}
