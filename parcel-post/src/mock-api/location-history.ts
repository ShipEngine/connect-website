import { HttpRequest } from "./client";

const allStatusCodes = ["NY", "C", "IT"]
const allStatuses = {
  NY: "NOT YET IN SYSTEM",
  C: "COMPLETE",
  IT: "IN TRANSIT"
}

export interface LocationHistoryRequest {
  operation: "location_history";
  trackingNumber: string;
  isReturn: boolean;
}

export interface LocationHistoryResponse {
  deliveryDate: string;
  packages: {
    description: string;
    length: number;
    width: number;
    height: number;
    dimUnit: string;
    weight: number;
    weightUnit: string;
  }[];

  trackingEvents: {
    description: string;
    date: string;
    status: string,
    errors: string[],
    statusCode: string;
    addressLine1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    timeZone: string;
    addressType: string;
    latitude: number;
    longitude: number;
    companyName: string;
  }[];

  signedBy: {
    salutation: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
  };
  notes: {
    type: string;
    text: string;
  }[];
}


/**
 * This is a mock implementation of a carrier"s API that returns the location history of a shipment
 */
export function locationHistory(request: HttpRequest & LocationHistoryRequest): LocationHistoryResponse {
  const statusCode = allStatusCodes[Math.floor(Math.random() * allStatusCodes.length)];
  const status = allStatuses[statusCode];

  return {
    deliveryDate: "2020-06-08T19:40:42.522Z",
    packages: [
      {
        description: "Large square box",
        length: 4,
        width: 4,
        height: 4,
        dimUnit: "in",
        weight: 4,
        weightUnit: "lb"
      }
    ],
    trackingEvents: [
      {
        description: "Received at facility,",
        date: "2020-06-08T19:40:42.522Z",
        status: status,
        errors: [],
        statusCode: statusCode,
        addressLine1: "4009 Marathon Blvd.",
        city: "Austin",
        state: "TX",
        zip: "78756",
        country: "US",
        timeZone: "America/Chicago",
        addressType: "residential",
        latitude: 30.308740,
        longitude: -97.741750,
        companyName: "ShipEngine",
      }
    ],
    signedBy: {
      salutation: "Mr.",
      firstName: "Ship",
      middleName: "",
      lastName: "Engine",
      suffix: "",
    },
    notes: [
      {
        type: "message_to_buyer",
        text: "This package was tracked successfully"
      }
    ]
  }
}
