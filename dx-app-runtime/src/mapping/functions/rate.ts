import {
  Rate,
  ChargeType,
  RatePOJO
} from "@shipengine/integration-platform-sdk";
import { Rate as capiRate } from "@ipaas/capi/responses";
import {toCapiDateTimeString} from "./datetime";



export default (rate: RatePOJO): capiRate => {
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
    service_code: rate.deliveryService.id,
    shipping_amount: {
      currency: shippingAmount?.amount.currency,
      amount: shippingAmount?.amount.value.toString() || "0",
    },
    confirmation_amount: {
      currency: confirmationAmount?.amount.currency,
      amount: confirmationAmount?.amount.value.toString() || "0",
    },
    insurance_amount: {
      currency: insuranceAmount?.amount.currency,
      amount: insuranceAmount?.amount.value.toString() || "0",
    },
    other_amount: {
      currency: otherAmount?.amount.currency,
      amount: otherAmount?.amount.value.toString() || "0",
    },
    error_messages: [], // There is nothing that maps to this
    negotiated_rate: rate.isNegotiatedRate,
  };
  returnRate.ship_datetime = rate.shipDateTime
    ? toCapiDateTimeString(rate.shipDateTime)
    : null;
  returnRate.estimated_delivery_datetime = rate.deliveryDateTime
    ? toCapiDateTimeString(rate.deliveryDateTime)
    : null;
  if (rate.notes) {
    if (Array.isArray(rate.notes)) {
      rate.notes.map((note) =>
        typeof note === "string" ? note : `${note.type} ${note.text}`
      ); // It is either going to be an array of strings or an array of objects.
    } else {
      // It is a string
      returnRate.warning_messages = [rate.notes.toString()];
    }
  }
  return returnRate;
};
