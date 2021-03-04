import { Charge, ChargeType } from "@shipengine/connect-sdk";

export const everythingButInsuranceFilter = (charge: Charge) =>
  charge.type !== ChargeType.Insurance;
export const insuranceChargeFilter = (charge: Charge) =>
  charge.type === ChargeType.Insurance;
export const shippingChargeFilter = (charge: Charge) =>
  charge.type === ChargeType.Shipping;
export const confirmationChargeFilter = (charge: Charge) =>
  charge.type === ChargeType.DeliveryConfirmation;
export const otherChargeFilter = (charge: Charge) =>
  charge.type !== ChargeType.Shipping &&
  charge.type !== ChargeType.DeliveryConfirmation &&
  charge.type !== ChargeType.Insurance;
