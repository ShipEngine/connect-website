import { CreateManifestResponse } from '@shipengine/connect-carrier-api/lib/responses';
import {
	Manifest,
	ManifestConfirmation,
} from '@shipengine/connect-sdk/lib/internal';
import { Transaction } from '@shipengine/connect-sdk';
import { Manifest as CapiManifest } from '@shipengine/connect-carrier-api/lib/models';

export const mapManifest = (manifest: Manifest): CapiManifest => {
	return {
		manifest_id: manifest.id,
		document_download: {
			data: manifest.document?.data?.toString('base64') || '',
		},
	};
};

export const mapCreateManifestResponse = (
	response: ManifestConfirmation,
	transaction: Transaction,
): CreateManifestResponse => {
	return {
		transaction_id: transaction.id,
		manifests: response.manifests.map(mapManifest),
		metadata: {
			...transaction.session,
		},
	};
};
