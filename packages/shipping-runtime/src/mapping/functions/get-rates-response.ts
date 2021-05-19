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
  const returnRate: capiRate = {
    service_code: rate.deliveryService?.code,
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
