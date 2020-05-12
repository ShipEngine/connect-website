import * as fs from "fs";
import * as path from "path";
import { HttpRequest } from "./client";

export interface GenerateLabelRequest {
  operation: "generate_label";
  session_id: string;
  label_type: string;
  label_size: string;
  service_code: string;
  confirmation_code: string;
  ship_date: string;
  from_zone: number;
  to_zone: number;
  total_weight: number;
}

export interface GenerateLabelResponse {
  tracking_number: string;
  delivery_date: string;
  shipment_cost: number;
  confirmation_cost: number;
  location_cost: number;
  image: string;
}

/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
export function generateLabel(request: HttpRequest & GenerateLabelRequest): GenerateLabelResponse {
  let shipDate = new Date(request.ship_date);
  let weight = request.total_weight;
  let zone = request.to_zone;

  return {
    tracking_number: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    delivery_date: new Date(shipDate.setDate(shipDate.getDate() + 4)).toISOString(),
    shipment_cost: .97 * weight,
    confirmation_cost: 1.26,
    location_cost: .000012 * zone,
    image: fs.readFileSync(path.join(__dirname, "sample-label.pdf")).toString("base64"),
  }
}
