import { ChargeType, DocumentFormat, DocumentSize, DocumentType, NewShipment, ShipmentConfirmation, Transaction } from "@shipengine/integration-platform-sdk";
import { bag, box } from "../definitions/packaging/customer";
import { apiClient } from "../mock-api/client";
import { GenerateLabelRequest, GenerateLabelResponse } from "../mock-api/generate-label";
import { Session } from "./session";

/**
 * Generates a shipping label and tracking number for a shipment
 */
export default async function createShipment(
  transaction: Transaction<Session>, shipment: NewShipment): Promise<ShipmentConfirmation> {

  // STEP 1: Validation
  for (let parcel of shipment.packages) {
    if (parcel.packaging.id === box.id && parcel.weight.ounces > (150 * 16)) {
      throw new Error(`${parcel.packaging.name} cannot weigh more than 150 pounds`);
    }
    else if (parcel.packaging.id === bag.id && parcel.weight.ounces > (45 * 16)) {
      throw new Error(`${parcel.packaging.name} cannot weigh more than 45 pounds`);
    }
  }

  // STEP 2: Create the data that the carrier's API expects
  let data: GenerateLabelRequest = {
    operation: "generate_label",
    session_id: transaction.session.id,
    service_code: shipment.deliveryService.code,
    confirmation_code: shipment.deliveryConfirmation?.code,
    ship_date: shipment.shipDateTime.toISOString(),
    total_weight: shipment.package.weight.ounces,
    packageNumber: shipment.packages.length
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<GenerateLabelResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatShipment(response.data);
}

/**
 * Formats a shipment in the way ShipEngine expects
 */
function formatShipment(response: GenerateLabelResponse): ShipmentConfirmation {
  return {
    trackingNumber: response.tracking_number,
    deliveryDateTime: response.delivery_date,
    charges: [
      {
        type: ChargeType.Shipping,
        amount: {
          value: response.shipment_cost,
          currency: "usd",
        }
      },
      {
        type: ChargeType.DeliveryConfirmation,
        amount: {
          value: response.confirmation_cost,
          currency: "usd",
        }
      },
      {
        type: ChargeType.LocationFee,
        amount: {
          value: response.location_cost,
          currency: "usd",
        }
      },
    ],
    packages: response.package_tracking_numbers.map((trackingNumber) => { return { trackingNumber: trackingNumber } }),
    label: {
      name: "Shipping Label",
      type: DocumentType.Label,
      size: DocumentSize.Inches4x6,
      format: DocumentFormat.PDF,
      data: Buffer.from(response.image, "base64"),
    }
  };
}
