import { HttpRequest } from "./client";

export const ONE_HOUR = 1000 * 60 * 60;
export const ONE_DAY = ONE_HOUR * 24;

export interface PickUpRequest {
  operation: "pick_up";
  session_id: string;
  service_code: string;
  date_time: string;
  zone: number;
  contact_phone: string;
  total_weight: number;
}

export interface PickUpResponse {
  id: string;
  date_time: string;
  pickup_cost: number;
  tax_cost: number;
  location_cost: number;
}

/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
export function pickUp(request: HttpRequest & PickUpRequest): PickUpResponse {
  let serviceCode = request.service_code;
  let dateTime = new Date(request.date_time);
  let weight = request.total_weight;
  let zone = request.zone;

  switch (serviceCode) {
    case "SAMEDAY":
      dateTime = new Date(Date.now() + (ONE_HOUR * 4));
      break;
    case "NEXTDAY":
      dateTime = new Date(Date.now() + ONE_DAY);
      break;
    case "FLEXPIK":
      dateTime = new Date(Date.now() + (ONE_DAY * 2));
      break;
  }

  return {
    id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
    date_time: dateTime.toISOString(),
    pickup_cost: .15 * weight,
    tax_cost: .03 * weight,
    location_cost: .000012 * zone,
  }
}
