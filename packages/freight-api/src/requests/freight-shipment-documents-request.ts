import { DocumentType } from "../models";
import { BaseCarrierRequest } from "./base-carrier-request";

/**
 * Retrieve the freight documents associated with a PRO Number. By default this request will return all available document types. You can optionally specify a `document_type` value in order to download a particular kind of document.
 */
export interface FreightShipmentDocumentsRequest extends BaseCarrierRequest {
  pro_number: string;
  document_type?: DocumentType;
}
