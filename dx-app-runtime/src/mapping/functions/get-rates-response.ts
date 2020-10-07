import { GetRatesResponse } from '@ipaas/capi/responses';
import {
  Transaction,
  ChargeType,
} from '@shipengine/connect-sdk';
import {
  Rate,
} from '@shipengine/connect-sdk/lib/internal';

import { Rate as capiRate } from '@ipaas/capi/responses';
import { mapDateTime } from './datetime';

export const mapRate = (rate: Rate): capiRate => {
  const shippingAmount = rate.charges.find(
    (rate) => rate.type === ChargeType.Shipping
  );
  const confirmationAmount = rate.charges.find(
    (rate) => rate.type === ChargeType.DeliveryConfirmation
  );
  const insuranceAmount = rate.charges.find(
    (rate) => rate.type === ChargeType.Insurance
  );
  const otherAmount = rate.charges.find(
    (rate) => rate.type === ChargeType.Uncategorized
  );
  const returnRate: capiRate = {
    service_code: rate?.deliveryService?.code || '',
    shipping_amount: {
      currency: shippingAmount?.amount?.currency || 'USD',
      amount: shippingAmount?.amount?.value?.toString() || '0.00',
    },
    confirmation_amount: {
      currency: confirmationAmount?.amount.currency || 'USD',
      amount: confirmationAmount?.amount.value.toString() || '0.00',
    },
    insurance_amount: {
      currency: insuranceAmount?.amount?.currency || 'USD',
      amount: insuranceAmount?.amount?.value?.toString() || '0.00',
    },
    other_amount: {
      currency: otherAmount?.amount?.currency || 'USD',
      amount: otherAmount?.amount?.value?.toString() || '0.00',
    },
    error_messages: [], // There is nothing that maps to this
    negotiated_rate: rate.isNegotiatedRate,
  };
  returnRate.ship_datetime = mapDateTime(rate.shipDateTime);
  returnRate.estimated_delivery_datetime =  mapDateTime(rate.deliveryDateTime);
  if (rate.notes) {
    if (Array.isArray(rate.notes)) {
      rate.notes.map((note) =>
        typeof note === 'string' ? note : `${note.type} ${note.text}`
      ); // It is either going to be an array of strings or an array of objects.
    } else {
      // It is a string
      returnRate.warning_messages = []; // TODO: Do we need Warnings?
    }
  }
  return returnRate;
};

export const mapGetRatesResponse = (
  transaction: Transaction,
  rateQuotes: Rate[]
): GetRatesResponse => {
  const rateResponse: GetRatesResponse = {
    rates: rateQuotes.map(mapRate),
    metadata: transaction.session,
  };
  return rateResponse;
};
