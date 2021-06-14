import { DocumentType } from "./document-type";
import { DocumentFormat } from "../labels/document-formats";

/** @description Basic structure for a document */
export interface Document {
  type: DocumentType[];
  data: string;
  format: DocumentFormat;
}
