import { GetRatesResponse } from "@shipengine/connect-carrier-api/lib/responses";
import { Charge, ChargeType, Transaction } from "@shipengine/connect-sdk";
import { Rate } from "@shipengine/connect-sdk/lib/internal";

import {
  BillingCategories,
  BillingLineItem,
  Rate as capiRate,
} from "@shipengine/connect-carrier-api/lib/models";
import { mapDateTime } from "./datetime";
import {
  confirmationChargeFilter,
  insuranceChargeFilter,
  otherChargeFilter,
  shippingChargeFilter,
  getTotalCosts,
} from ".";

export const mapChargeType = (chargeType: ChargeType): BillingCategories => {
  switch (chargeType) {
    case ChargeType.Shipping:
      return BillingCategories.Shipping;
    case ChargeType.SpecialGoods:
      return BillingCategories.SpecialGoods;
    case ChargeType.Handling:
      return BillingCategories.Handling;
    case ChargeType.Oversize:
      return BillingCategories.Oversize;
    case ChargeType.Insurance:
      return BillingCategories.Insurance;
    case ChargeType.Fuel:
      return BillingCategories.FuelCharge;
    case ChargeType.LocationFee:
      return BillingCategories.LocationFee;
    case ChargeType.Fee:
      return BillingCategories.AdditionalFees;
    case ChargeType.Pickup:
      return BillingCategories.Pickup;
    case ChargeType.Return:
      return BillingCategories.Returns;
    case ChargeType.Notification:
      return BillingCategories.Notifications;
    case ChargeType.Duty:
      return BillingCategories.Tariff;
    case ChargeType.Tax:
      return BillingCategories.Tax;
    case ChargeType.Delivery:
      return BillingCategories.Delivery;
    case ChargeType.DeliveryConfirmation:
      return BillingCategories.Confirm;
    case ChargeType.Discount:
      return BillingCategories.Discount;
    case ChargeType.Uncategorized:
    case ChargeType.Refund:
    case ChargeType.Promotion:
    case ChargeType.GiftWrapping:
    case ChargeType.GiftCertificate:
    case ChargeType.Debit:
    case ChargeType.Credit:
    case ChargeType.Coupon:
    case ChargeType.Adjustment:
      return BillingCategories.Uncategorized;
  }
};

export const mapBillingLineItems = (charge: Charge): BillingLineItem => {
  return {
    billing_category: mapChargeType(charge.type),
    amount: {
      currency: charge.amount.currency,
      amount: String(charge.amount.value),
    },
  };
};

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
    billing_line_items: rate.charges.map(mapBillingLineItems),
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
