import * as fs from "fs";
import * as path from "path";
import { HttpRequest } from "./client";

export interface GenerateLabelRequest {
  operation: "generate_label";
  session_id: string;
  service_code: string;
  confirmation_code: string;
  ship_date: string;
  total_weight: number;
  packageNumber: number;
}

export interface GenerateLabelResponse 
{
  tracking_number: string;
  package_tracking_numbers: string[];
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


  const package_tracking_numbers = [];

  for (let i = 0; i < request.packageNumber; i++) {
    package_tracking_numbers.push(Buffer.from(new Date().toISOString()).toString("base64").toUpperCase());
  }

  return {
    tracking_number: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    package_tracking_numbers,
    delivery_date: new Date(shipDate.setDate(shipDate.getDate() + 4)).toISOString(),
    shipment_cost: .97 * weight,
    confirmation_cost: 1.26,
    location_cost: .000012 * Math.floor(Math.random() * (10)) + 1,
    image: fs.readFileSync(path.join(__dirname, "sample-label.pdf")).toString("base64"),
  }
}
