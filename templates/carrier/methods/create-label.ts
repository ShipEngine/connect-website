import {
  Currency,
  DocumentFormat,
  DocumentPOJO,
  DocumentSize,
  LabelConfirmation,
  LabelConfirmationPOJO,
  LabelSpec,
  ShippingChargeType,
  Transaction,
} from "@shipengine/integration-platform-sdk";

interface FakeApiResponse {
  format: DocumentFormat;
  size: DocumentSize;
}

/**
 * Requests a shipping label from the provider
 */
async function createLabel(
  transaction: Transaction,
  label: LabelSpec,
): Promise<LabelConfirmationPOJO> {
  // STEP 1: Do any necessary validation here

  // STEP 2: Create the data that the carrier's API expects

  // STEP 3: Call the carrier's API
  // const response = some async network call
  const response: FakeApiResponse = {
    format: label.format,
    size: label.size,
  };

  // STEP 4: Create the output data that ShipEngine expects
  // return await formatLabel(response);

  const labelConfirmation = formatLabel(response);
  return Promise.resolve(labelConfirmation);
}

/**
 * Formats a label in the way ShipEngine expects
 */
function formatLabel(label: FakeApiResponse): LabelConfirmationPOJO {
  return {
    charges: [
      {
        type: ShippingChargeType.Shipping,
        amount: {
          value: "",
          currency: Currency.UnitedStatesDollar,
        },
      },
    ],
    shipment: {
      trackingNumber: "",
      deliveryDateTime: "",
      packages: [
        {
          trackingNumber: "",
          label: {
            name: "Label",
            size: label.size,
            format: label.format,
            data: downloadLabel(),
          },
        },
      ],
    },
  };
}

/**
 * Downlaods a label image
 */
function downloadLabel() {
  return Buffer.from("", "utf-8");
}

export { createLabel };
