import { BaseResponse } from './base-response';
import {
  LabelDownload,
  FormDownload,
  BillingLineItem,
  Currency,
} from '../models';

export interface CreateLabelResponse extends BaseResponse {
  transaction_id: string;
  label_download?: LabelDownload;
  form_download?: FormDownload;
  billing_line_items?: BillingLineItem[];
  tracking_number?: string;
  trackable?: boolean;
  carrier_transaction_id?: string;
  estimated_delivery_datetime?: string;
  shipping_amount?: Currency;
  insurance_amount?: Currency;
}
