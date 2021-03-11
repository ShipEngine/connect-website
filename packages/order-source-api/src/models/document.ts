export interface Document {
  /**
   * Usually there will only be 1 type present, but sometimes multiple documents can be combined
   */
  type?: DocumentType[];
  /**
   * Base64 encoded string of the document in the specified format
   */
  data?: string;
  format: DocumentFormat;
}

export enum DocumentType {
  "Label" = "label",
  "CustomsForm" = "customs_form",
  "CommercialInvoice" = "commercial_invoice",
}

export enum DocumentFormat {
  "Pdf" = "PDF",
  "Zpl" = "ZPL",
  "Png" = "PNG",
}
