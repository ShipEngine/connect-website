import { Charge } from "./charge";
import { LabelVoucher } from "./label-voucher";

/** @description The status of whether or not an order has been paid for */
export enum PaymentStatus {
  AwaitingPayment = "AwaitingPayment",
  PaymentCancelled = "PaymentCancelled",
  PaymentFailed = "PaymentFailed",
  PaymentInProcess = "PaymentInProcess",
  Paid = "Paid",
  Other = "Other",
}

/** @description This represents a payment made for an order */
export interface Payment {
  /** @description An ID for this payment in the vendor API */
  payment_id?: string;
  /** @description The status of whether or not an order has been paid for */
  payment_status?: PaymentStatus;
  /** @description A list of tax charges. The description can convey the jurisdiction */
  taxes?: Charge[];
  /** @description A list of shipping charges. */
  shipping_charges?: Charge[];
  /** @description A list of adjustments applied that influence the order total. For example, promotions/discounts/coupons. The amount should always be a quantity of currency, not a percentage. */
  adjustments?: Charge[];
  /** @description The amount of the currency */
  amount_paid?: number;
  /** @description Coupon codes applied to obtain a discount. The discount amounts should be included as one of the adjustments. */
  coupon_code?: string[];
  /** @description The payment method */
  payment_method?: string;
  /** @description Represents information needed to leverage a third party Carrier API implementation */
  label_voucher?: LabelVoucher;
}
