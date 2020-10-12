import {
  Charge,
  ChargeType,
} from '@shipengine/connect-sdk';
import {
  TransactionPOJO,
  ShipmentConfirmation,
} from '@shipengine/connect-sdk/lib/internal';
import { CreateLabelResponse } from '@ipaas/capi/responses';
import { mapDateTime } from './datetime';
import { Currency } from '@ipaas/capi';

export const insuranceChargeFilter = (charge: Charge) => charge.type === ChargeType.Insurance;
export const shippingChargeFilter = (charge: Charge) => charge.type !== ChargeType.Insurance;

export const getTotalCosts = (charges: readonly Charge[] | undefined): Currency | undefined => {
  if(!charges || charges.length < 1) {
    return undefined;
  }
  const totalCost = charges.map(p=>p.amount).reduce((prev, current) => {
    return {
      currency: current.currency,
      value: prev.value + current.value
    }
  });
  return {
    amount: totalCost.value.toString(),
    currency: totalCost.currency
  }
}

export const mapCreateLabelResponse = (
  transaction: TransactionPOJO,
  response: ShipmentConfirmation
): CreateLabelResponse => {
  const shippingCost = getTotalCosts(response.charges.filter(shippingChargeFilter));
  const insuranceCost = getTotalCosts(response.charges.filter(insuranceChargeFilter));

  const createLabelResponse: CreateLabelResponse = {
    transaction_id: transaction.id,
    tracking_number: response.trackingNumber,
    label_download: {
      label_data: response.label.data.toString('base64'),
    },
    shipping_amount: shippingCost,
    insurance_amount: insuranceCost,
    estimated_delivery_datetime: mapDateTime(response.deliveryDateTime),
  };
  if(response.form?.data) {
    createLabelResponse.form_download = {
      label_data: response.form.data.toString('base64'),
    }
  }
  return createLabelResponse;
};
