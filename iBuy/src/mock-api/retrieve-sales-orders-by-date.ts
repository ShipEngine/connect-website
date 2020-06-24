import { HttpRequest } from "./client";
import { orderStatus, paymentStatus, paymentMethod } from "../status-and-mappings";

export interface RetrieveSalesOrdersByDateRequest {
  operation: "retrieve_sales_orders_by_date";
  session_id: string;
  start_date: string;
  end_date: string;
}


export interface RetrieveSalesOrderResponse {
  id: string;
  created_at: string;
  status: string;
  payment: {
    status: string;
    method: string;
  },
  address: {
    business_name: string;
    lines: string[];
    city: string;
    state: string;
    postalCode: string;
    country: string;
    time_zone: string;
  },
  seller_id: string;
  buyer: {
    id: string;
    name: string;
  },
  shipping_info: {
    confirmation_type: string;
    delivery_date: string;
  },
  shipping_items: {
    id: string;
    name: string;
    quantity: number;
    price_per_unit: number,
    product_id: string
  }[],
  creditCardCharges?: {
    value: number;
    timeStamp: string;
  }[],
  shipping_notes: string;
}


export type RetrieveSalesOrdersByDateResponse = Array<RetrieveSalesOrderResponse>;

/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
export function retrieveSalesOrdersByDate(request: HttpRequest & RetrieveSalesOrdersByDateRequest): RetrieveSalesOrdersByDateResponse {

  return [
    {
      id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      created_at: new Date().toISOString(),
      status: orderStatus[Math.floor(Math.random() * orderStatus.length)],
      payment: {
        status: paymentStatus[Math.floor(Math.random() * paymentStatus.length)],
        method: paymentMethod[Math.floor(Math.random() * paymentMethod.length)]
      },
      address: {
        business_name: "John Doe Business Name",
        lines: ["4450 E Palm Valley Blvd", "Bldg B", "Ste100"],
        city: "Round Rock",
        state: "Texas",
        postalCode: "78665",
        country: "US",
        time_zone: "America/Chicago"
      },
      seller_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      buyer: {
        id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
        name: "John Doe"
      },
      shipping_info: {
        confirmation_type: "signature",
        delivery_date: new Date().toISOString(),
      },
      shipping_items: [
        {
          id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
          name: "Item 1",
          quantity: 2,
          price_per_unit: 10,
          product_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase()
        },
        {
          id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
          name: "Item 2",
          quantity: 4,
          price_per_unit: 2,
          product_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase()
        }
      ],
      shipping_notes: "Please ring doorbell during dropoff"
    },
    {
      id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      created_at: new Date().toISOString(),
      status: orderStatus[Math.floor(Math.random() * orderStatus.length)],
      payment: {
        status: paymentStatus[Math.floor(Math.random() * paymentStatus.length)],
        method: paymentMethod[Math.floor(Math.random() * paymentMethod.length)]
      },
      address: {
        business_name: "Jane Doe Business Name",
        lines: ["1 Letterman Dr", "Building C",],
        city: "San Francisco",
        state: "CA",
        postalCode: "94129",
        country: "US",
        time_zone: "America/Los_Angeles"
      },
      seller_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
      buyer: {
        id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
        name: "Jane Doe"
      },
      shipping_info: {
        confirmation_type: "signature",
        delivery_date: new Date().toISOString(),
      },
      shipping_items: [
        {
          id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
          name: "Item 1",
          quantity: 2,
          price_per_unit: 10,
          product_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase()
        },
        {
          id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase(),
          name: "Item 2",
          quantity: 4,
          price_per_unit: 2,
          product_id: Buffer.from(new Date().toISOString()).toString("base64").toUpperCase()
        }
      ],
      shipping_notes: "Please ring doorbell during dropoff"
    }
  ]
}
