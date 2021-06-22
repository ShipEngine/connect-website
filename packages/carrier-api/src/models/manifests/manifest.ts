import { ResourceDownload } from '../resource-download';

/** @description Basic structure of a manifest */
export interface Manifest {
  manifest_id?: string;
  document_download?: ResourceDownload;
  document_href?: string;
  document_data?: string;
}
