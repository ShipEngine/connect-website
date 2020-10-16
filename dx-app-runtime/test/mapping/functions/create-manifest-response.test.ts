import { DocumentFormat, DocumentSize, DocumentType, Session } from '@shipengine/connect';
import { Manifest, ManifestConfirmation } from '@shipengine/connect/lib/internal/carriers';
import { mapCreateManifestResponse, mapManifest } from '../../../src/mapping/functions/create-manifest-response';

const manifest: Manifest = new Manifest({
    id: 'manifestId',
    document: {
        data: Buffer.from('test'),
        type: DocumentType.ScanForm,
        size: DocumentSize.Letter,
        format: DocumentFormat.PDF
    },
    shipments: [{
        trackingNumber: 'trackingNumber',
    }]
});

const manifestConfirmation = new ManifestConfirmation({
    manifests: [],
});

describe('Create Manifest Response', () => {
    describe('Map Manifest', () => {
        describe('when mapping a fully formed manifest', () => {
            const result = mapManifest(manifest);
            it('it maps the id to manifest_id', () => expect(result.manifest_id).toEqual(manifest.id));
            it('it maps the data to the document_download.data as a base64 string', () => expect(result.document_download.data.toString()).toEqual(manifest.document?.data?.toString('base64')));
        });
        describe('when mapping manifest without a document', () => {
            const result = mapManifest({ ...manifest, document: undefined });
            it('it maps the data to the document_download.data as an empty string', () => expect(result.document_download.data.toString()).toEqual(''));
        });
    });

    describe('Map Create Manifest Response', () => {
        const result = mapCreateManifestResponse(manifestConfirmation, { id: 'transactionId', session: { value: "1" } as Session<object>});
        it('it maps the transaction_id correctly', () => expect(result.transaction_id).toEqual('transactionId'));
        it('it maps the metadata correctly', () => expect(result.metadata).toEqual({value: '1'}));
    });
});
