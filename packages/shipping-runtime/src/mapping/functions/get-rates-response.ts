import { GetRatesResponse } from "@shipengine/connect-carrier-api/lib/responses";
import { Transaction } from "@shipengine/connect-sdk";
import { Rate } from "@shipengine/connect-sdk/lib/internal";

import { Rate as capiRate } from "@shipengine/connect-carrier-api/lib/models";
import { mapDateTime } from "./datetime";
import {
  confirmationChargeFilter,
  insuranceChargeFilter,
  otherChargeFilter,
  shippingChargeFilter,
  getTotalCosts,
} from ".";

export const mapRate = (rate: Rate): capiRate => {
  const shippingAmount = getTotalCosts(
    rate.charges.filter(shippingChargeFilter)
  );
  const confirmationAmount = getTotalCosts(
    rate.charges.filter(confirmationChargeFilter)
  );
  const insuranceAmount = getTotalCosts(
    rate.charges.filter(insuranceChargeFilter)
  );
  const otherAmount = getTotalCosts(rate.charges.filter(otherChargeFilter));

  const returnRate: capiRate = {
    service_code: rate.deliveryService?.code,
    shipping_amount: shippingAmount,
    confirmation_amount: confirmationAmount,
    insurance_amount: insuranceAmount,
    other_amount: otherAmount,
    error_messages: [], // There is nothing that maps to this
    negotiated_rate: rate.isNegotiatedRate,
  };
  returnRate.ship_datetime = mapDateTime(rate.shipDateTime);
  returnRate.estimated_delivery_datetime = mapDateTime(rate.deliveryDateTime);
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
