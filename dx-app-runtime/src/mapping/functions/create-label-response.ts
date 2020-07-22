import {
  TransactionPOJO,
  ShipmentConfirmationPOJO,
  DocumentType,
  ChargeType,
} from '@shipengine/integration-platform-sdk';
import { CreateLabelResponse } from '@ipaas/capi/responses';
import { toCapiDateTimeString } from './datetime';

// TODO: we need to be able to support multiple labels coming back.
export const mapShipmentConfirmationPOJOToCreateLabelResponse = (
  transaction: TransactionPOJO,
  response: ShipmentConfirmationPOJO
): CreateLabelResponse => {
  // TODO: we need to update the CreateLabelResponse to better handle multiple documents being returned.
  const labelDocument = response.packages[0].documents.find(
    (doc) => doc.type === DocumentType.Label
  );
  const scanForm = response.packages[0].documents.find(
    (doc) => doc.type === DocumentType.ScanForm
  );
  const customsForm = response.packages[0].documents.find(
    (doc) => doc.type === DocumentType.CustomsForm
  );
  const shippingAmount = response.charges.find(
    (charge) => charge.type === ChargeType.Shipping
  );
  const insuranceAmount = response.charges.find(
    (charge) => charge.type === ChargeType.Insurance
  );
  // response.deliveryWindow TODO: Support deliveryWindow on CreateLabelResposne
  // response.fulfillmentService TODO: Work on fulfillmentService CreateLabelResponse
  // response.isGuaranteed TODO: Add isGuaranteed to CreateLabelResponse
  // response.isNegotiatedRate TODO: Add isNegotiatedRate to CreateLabelResponse
  // response.maximumDeliveryDays TODO: Add maximumDeliveryDays to CreateLabelResponse
  // response.metadata TODO: Add map for metadata (data about the label) to the CreateLabelResponse
  // response.zone TODO: Add zone to CreateLabelResponse
  // response.trackingURL TODO: Add trackingUrl to the CreateLabelResponse
  // response.minimumDeliveryDays TODO: Add minimumDeliveryDays to CreateLabelResponse6
  const createLabelResponse: CreateLabelResponse = {
    transaction_id: transaction.id,
    tracking_number: response.trackingNumber,
    label_download: {
      label_data: labelDocument?.data.toString('base64'),
    },
    form_download: undefined, // Quick TODO: Fix this in typescript library
    shipping_amount: shippingAmount
      ? {
          currency: shippingAmount.amount.currency,
          amount:
            shippingAmount.amount.value !== ''
              ? shippingAmount.amount.value.toString()
              : '0',
        }
      : undefined,
    insurance_amount: insuranceAmount
      ? {
          currency: insuranceAmount.amount.currency,
          amount:
            insuranceAmount.amount.value !== ''
              ? insuranceAmount.amount.value.toString()
              : '0',
        }
      : undefined,
    estimated_delivery_datetime: toCapiDateTimeString(
      response.deliveryDateTime
    ),
  };
  return createLabelResponse;
};
