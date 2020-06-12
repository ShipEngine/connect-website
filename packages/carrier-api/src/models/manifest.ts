import { ResourceDownload } from './resource-download';

export interface Manifest {
    manifest_id: string;
    document_download: ResourceDownload;
    document_href: string;
    document_data: string;
}