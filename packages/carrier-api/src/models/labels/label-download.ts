import { ResourceDownload } from "../resource-download";

export interface LabelDownload extends ResourceDownload {
  label_data?: string;
}
