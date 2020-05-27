import { RateConfig, ShippingChargeType } from "@shipengine/ipaas";
import { Rate } from "../capi/get-rates-response";

export default (rate: RateConfig): Rate => {
  const shippingAmount = rate.charges.find(rate => rate.type === ShippingChargeType.Shipping);
  const confirmationAmount = rate.charges.find(rate => rate.type === ShippingChargeType.DeliveryConfirmation);
  const insuranceAmount = rate.charges.find(rate => rate.type === ShippingChargeType.Insurance);
  const otherAmount = rate.charges.find(rate => rate.type === ShippingChargeType.Other);
  return {
    service_code: rate.deliveryServiceID,
    ship_datetime: rate.shipDateTime?.toISOString(),
    estimated_delivery_datetime: rate.estimatedDeliveryDateTime?.toISOString(),
    shipping_amount: {
      currency: shippingAmount?.amount.currency,
      amount: shippingAmount?.amount.value.toString() || ''
    },
    confirmation_amount: {
      currency: confirmationAmount?.amount.currency,
      amount: confirmationAmount?.amount.value.toString() || ''
    },
    insurance_amount: {
      currency: insuranceAmount?.amount.currency,
      amount: insuranceAmount?.amount.value.toString() || ''
    },
    other_amount: {
      currency: otherAmount?.amount.currency,
      amount: otherAmount?.amount.value.toString() || ''
    },
    error_messages: [], // There is nothing that maps to this
    warning_messages: rate.notes ? [...rate.notes] : undefined,
    negotiated_rate: rate.isNegotiatedRate
  }
}
