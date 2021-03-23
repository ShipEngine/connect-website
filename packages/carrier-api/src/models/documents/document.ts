import { LabelFormats } from "../labels/label-formats";

export interface Document {
  type: DocumentType[];
  data: string;
  format: LabelFormats;
}
