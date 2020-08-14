import {
  ChargeType,
} from '@shipengine/connect-sdk';
import {
  TransactionPOJO,
  ShipmentConfirmation,
} from '@shipengine/connect-sdk/lib/internal';
import { CreateLabelResponse } from '@ipaas/capi/responses';
import { toCapiDateTimeString } from './datetime';

export const mapCreateLabelResponse = (
  transaction: TransactionPOJO,
  response: ShipmentConfirmation
): CreateLabelResponse => {
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
      label_data: response.label.data.toString('base64'),
    },
    form_download: {
      label_data: response.form?.data?.toString('base64'),
    },
    shipping_amount: shippingAmount
      ? {
        currency: shippingAmount.amount.currency,
        amount: shippingAmount.amount.value.toString()
      }
      : undefined,
    insurance_amount: insuranceAmount
      ? {
        currency: insuranceAmount.amount.currency,
        amount: insuranceAmount.amount.value.toString()
      }
      : undefined,
    estimated_delivery_datetime: toCapiDateTimeString(
      response.deliveryDateTime
    ),
  };
  return createLabelResponse;
};
