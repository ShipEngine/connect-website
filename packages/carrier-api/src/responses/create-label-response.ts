import { BaseResponse } from "./base-response";
import {
  LabelDownload,
  FormDownload,
  Document,
  BillingLineItem,
  LabelPackage,
  Identifier,
} from "../models";

/** @description Basic structure for a response to create a label */
export interface CreateLabelResponse extends BaseResponse {
  transaction_id: string;
  label_download?: LabelDownload;
  form_download?: FormDownload;
  documents?: Document[];
  packages?: LabelPackage[];
  billing_line_items?: BillingLineItem[];
  tracking_number?: string;
  trackable?: boolean;
  alternative_identifiers?: Identifier[];
  estimated_delivery_datetime?: string;
}
