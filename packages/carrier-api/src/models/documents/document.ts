import { LabelFormats } from "../labels/label-formats";

/** @description Basic structure for a document */
export interface Document {
  type: DocumentType[];
  data: string;
  format: LabelFormats;
}
