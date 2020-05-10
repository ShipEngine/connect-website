import { Currency, DocumentFormat, DocumentSize, LabelConfirmationPOJO, LabelSpec, ShippingChargeType, Transaction } from "@shipengine/integration-platform-sdk";
import { bag, box } from "../definitions/packaging/customer";
import { idToCode } from "../id-code-map";
import { apiClient } from "../mock-api/client";
import { GenerateLabelRequest, GenerateLabelResponse } from "../mock-api/generate-label";

/**
 * Requests a shipping label for a shipment
 */
export default async function createLabel(
  transaction: Transaction, { format, size, shipment }: LabelSpec): Promise<LabelConfirmationPOJO> {

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
    label_type: format,
    label_size: size,
    service_code: idToCode(shipment.deliveryService.id),
    confirmation_code: idToCode(shipment.deliveryConfirmation.id),
    ship_date: shipment.shipDateTime.toISOString(),
    from_zone: parseInt(shipment.shipFrom.postalCode, 10),
    to_zone: parseInt(shipment.shipTo.postalCode, 10),
    total_weight: shipment.packages.reduce((w, pkg) => w + pkg.weight.ounces, 0),
  };

  // STEP 3: Call the carrier's API
  const response = await apiClient.request<GenerateLabelResponse>({ data });

  // STEP 4: Create the output data that ShipEngine expects
  return formatLabel(response.data);
}

/**
 * Formats a label in the way ShipEngine expects
 */
function formatLabel(response: GenerateLabelResponse): LabelConfirmationPOJO {
  return {
    charges: [
      {
        type: ShippingChargeType.Shipping,
        amount: {
          value: response.shipment_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
      {
        type: ShippingChargeType.DeliveryConfirmation,
        amount: {
          value: response.confirmation_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
      {
        type: ShippingChargeType.LocationFee,
        amount: {
          value: response.location_cost,
          currency: Currency.UnitedStatesDollar,
        }
      },
    ],
    shipment: {
      trackingNumber: response.tracking_number,
      deliveryDateTime: response.delivery_date,
      packages: [{
        trackingNumber: response.tracking_number,
        label: {
          name: "Label",
          size: DocumentSize.Inches4x6,
          format: DocumentFormat.PDF,
          data: Buffer.from(response.image, "base64"),
        }
      }],
    },
  };
}
