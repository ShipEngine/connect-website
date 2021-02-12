import * as fs from "fs";
import * as path from "path";
import { HttpRequest } from "./client";

export interface GenerateManifestRequest {
  operation: "generate_manifest";
  session_id: string;
  manifest_range: {
    start: string;
    end: string;
  };
  shipment_tracking_numbers: string[];
}

export interface GenerateManifestResponse {
  manifest_label_image: string;
  manifested_shipments: {
    tracking_number: string;
  }[];

  failed_manifest_shipments: {
    tracking_number: string;
    error_message: string;
  }[];
}

/**
 * This is a mock implementation of a carrier's API that generates a manifest for shipment(s)
 */
export function generateManifest(request: HttpRequest & GenerateManifestRequest): GenerateManifestResponse {

  let response: GenerateManifestResponse = {
    manifest_label_image: fs.readFileSync(path.join(__dirname, "sample-label.pdf")).toString("base64"),
    manifested_shipments: [],
    failed_manifest_shipments: []
  }

  for (let trackingNumber of request.shipment_tracking_numbers) {
    response.manifested_shipments.push({
      tracking_number: trackingNumber
    });
  }

  return response;
}
