import { DocumentType } from "../models";
import { BaseCarrierResponse } from "./base-carrier-response";

export interface FreightShipmentDocumentsResponse extends BaseCarrierResponse {
  documents: {
    type: DocumentType;
    /**
     * Base64-encoded image of the document
     */
    image: string;
    format: "pdf";
  }[];
}
