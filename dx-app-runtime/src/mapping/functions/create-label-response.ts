import {
  TransactionPOJO,
  ShipmentConfirmationPOJO,
  DocumentType,
  ChargeType,
} from '@shipengine/integration-platform-sdk';
import { CreateLabelResponse } from '@ipaas/capi/responses';
import { toCapiDateTimeString } from './datetime';

export const mapShipmentConfirmationPOJOToCreateLabelResponse = (
  transaction: TransactionPOJO,
  response: ShipmentConfirmationPOJO
): CreateLabelResponse => {
  const labelDocument = response.documents.find(
    (doc) => doc.type === DocumentType.Label
  );
  const scanForm = response.documents.find(
    (doc) => doc.type === DocumentType.ScanForm
  );
  const customsForm = response.documents.find(
    (doc) => doc.type === DocumentType.CustomsForm // TODO: Multiple Forms ?
  );
  const shippingAmount = response.charges.find(
    (charge) => charge.type === ChargeType.Shipping
  );
  const insuranceAmount = response.charges.find(
    (charge) => charge.type === ChargeType.Insurance
  );

  const createLabelResponse: CreateLabelResponse = {
    transaction_id: transaction.id,
    tracking_number: response.trackingNumber,
    label_download: {
      label_data: labelDocument?.data?.toString('base64'),
    },
    form_download: {
      label_data: scanForm ? scanForm?.data?.toString('base64') : customsForm?.data?.toString('base64')
    },
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
