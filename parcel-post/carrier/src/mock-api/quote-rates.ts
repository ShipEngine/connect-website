import { customerPackaging } from "../definitions/packaging/customer";
import { HttpRequest } from "./client";

const allServices = {
  "DOMECO": { price: .20, days: 6 },
  "DOMSTD": { price: .28, days: 3 },
  "INTECO": { price: .42, days: 5 },
  "INTPRI": { price: .73, days: 3 },
  "SAMEDY": { price: .85, days: 0 },
};

const allConfirmations = {
  "SIG": { price: 1.25 },
  "ASIG": { price: 1.5 },
  "RSIG": { price: 1.5 },
  "PHOTO": { price: 2.5 },
  "RECPT": { price: 2.99 },
};


export interface QuoteRatesRequest {
  operation: "quote_rates";
  session_id: string;
  service_codes: string[];
  confirmation_codes: string[];
  parcel_codes: string[];
  ship_date: string;
  delivery_date: string;
  from_zone: number;
  to_zone: number;
  total_weight: number;
}

export type QuoteRatesResponse = Array<QuoteRateResponseItem>;

export interface QuoteRateResponseItem {
  service_code: string;
  confirmation_code: string;
  parcel_code: string;
  ship_date: string;
  delivery_date: string;
  delivery_days: number;
  shipment_cost: number;
  confirmation_cost: string;
  tax_cost: number;
}


/**
 * This is a mock implementation of a carrier's API that returns rate quotes for a shipment
 */
export function quoteRates(request: HttpRequest & QuoteRatesRequest): QuoteRatesResponse {
  let services = request.service_codes.length > 0 ? request.service_codes : Object.keys(allServices);
  let confirmations = request.confirmation_codes.length > 0 ? request.confirmation_codes : Object.keys(allConfirmations);
  let packaging = request.parcel_codes.length > 0 ? request.parcel_codes : customerPackaging.map((pack) => pack.id);
  let totalWeight = request.total_weight;
  let shipDate = new Date(request.ship_date);
  let rates: QuoteRateResponseItem[] = [];

  for (let service_code of services) {
    for (let confirmation_code of confirmations) {
      for (let parcel_code of packaging) {
        let service = allServices[service_code];
        let confirmation = allConfirmations[confirmation_code];

        rates.push({
          service_code,
          confirmation_code,
          parcel_code,
          ship_date: shipDate.toISOString(),
          delivery_date: new Date(shipDate.setDate(shipDate.getDate() + service.days)).toISOString(),
          delivery_days: service.days,
          shipment_cost: service.price * totalWeight,
          confirmation_cost: confirmation.price,
          tax_cost: service.price * totalWeight * 0.08,
        });
      }
    }
  }

  return rates;
}
