import { CreateManifestResponse } from "@ipaas/capi";
import { ManifestConfirmationPOJO, ManifestPOJO } from "@shipengine/integration-platform-sdk";
import { Manifest } from "@ipaas/capi/models/manifest";

const mapManifest = (manifest: ManifestPOJO): Manifest => {
  return {
    manifest_id: manifest.id || '',
    document_download: {
      data: manifest.document?.data?.toString('base64') || '',
      href: '' // TODO CAPI: Make this Optional
    },
    document_data: '', // TODO CAPI: Make this Optional
    document_href: '' // TODO CAPI: Make this Optional
  }
}

export const mapCreateManifestResponse = (response: ManifestConfirmationPOJO, transactionId: string) : CreateManifestResponse => {
  return {
    transaction_id: transactionId,
    manifests: response.manifests.map(mapManifest)
  }
}
