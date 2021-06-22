import {
  TransactionPOJO,
  ShipmentConfirmation,
} from '@shipengine/connect-sdk/lib/internal';
import { CreateLabelResponse } from '@shipengine/connect-carrier-api/lib/responses';
import { mapDateTime, getLabelPackage } from '.';
import { mapBillingLineItems } from './get-rates-response';

export const mapCreateLabelResponse = (
  transaction: TransactionPOJO,
  response: ShipmentConfirmation,
): CreateLabelResponse => {
  const createLabelResponse: CreateLabelResponse = {
    transaction_id: transaction.id,
    tracking_number: response.trackingNumber,
    label_download: {
      data: response.label.data.toString('base64'),
    },
    billing_line_items: response.charges.map(mapBillingLineItems),
    estimated_delivery_datetime: mapDateTime(response.deliveryDateTime),
    alternative_identifiers: [
      {
        type: 'carrier_transaction_id',
        value: response.identifiers?.carrierTransactionId,
      },
    ],
    packages: response.packages?.map(getLabelPackage),
  };
  if (response.form?.data) {
    createLabelResponse.form_download = {
      data: response.form.data.toString('base64'),
    };
  }
  return createLabelResponse;
};
