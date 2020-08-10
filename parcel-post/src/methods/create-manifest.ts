import { DocumentFormat, DocumentSize, DocumentType, Transaction, ManifestConfirmation, NewManifest } from "@shipengine/integration-platform-sdk";
import { apiClient } from "../mock-api/client";
import { Session } from "./session";
import { GenerateManifestRequest, GenerateManifestResponse } from "../mock-api/generate-manifest";

/**
 * Generates a shipping label and tracking number for a shipment
 */
export default async function createManifest(
  transaction: Transaction<Session>, shipment: NewManifest): Promise<ManifestConfirmation> {

  // STEP 1: Create the data that the carrier's API expects
  let data: GenerateManifestRequest = {
    operation: "generate_manifest",
    session_id: transaction.session.id,
    manifest_range: {
      start: shipment.openDateTime.toISOString(),
      end: shipment.closeDateTime.toString()
    },
    shipment_tracking_numbers: shipment.shipments.map((shipment) => shipment.trackingNumber)
  };

  // STEP 2: Call the carrier's API
  const response = await apiClient.request<GenerateManifestResponse>({ data });

  // STEP 3: Create the output data that ShipEngine expects
  return formatManifest(response.data);
}

/**
 * Formats a shipment in the way ShipEngine expects
 */
function formatManifest(response: GenerateManifestResponse): ManifestConfirmation {
  const returnValue = {
    manifests: [{
      shipments: response.manifested_shipments.map((shipment) => { return { trackingNumber: shipment.tracking_number } }),
      document: {
        type: DocumentType.ScanForm,
        size: DocumentSize.Inches4x6,
        format: DocumentFormat.PDF,
        data: Buffer.from(response.manifest_label_image, "base64")
      }
    }]
  }

  return returnValue;
}
