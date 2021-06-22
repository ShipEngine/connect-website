import { ResourceDownload } from '../resource-download';

export interface FormDownload extends ResourceDownload {
  form_data?: string;
}
