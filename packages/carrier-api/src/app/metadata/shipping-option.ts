import Joi from 'joi';

export interface ShippingOption {
  Name: string;
  Type: ShippingOptionEnum;
  Description: string;
}

export type ShippingOptionDescription = { Name: string; Description: string };
export type ShippingOptionDictionary = {
  [Key in ShippingOptionEnum]?: ShippingOptionDescription;
};
export const ShippingOptionDescriptionSchema = Joi.object({
  Name: Joi.string().required(),
  Description: Joi.string().required(),
}).optional();

export enum ShippingOptionEnum {
  ContainsAlcohol = 'alcohol',
  B13ACanada = 'b13a-canada',
  BillToSender = 'bill-to-sender',
  BillToThirdParty = 'bill-to-third-party',
  CollectOnDelivery = 'collect-on-delivery',
  ConsequentialLoss = 'consequential-loss',
  DangerousGoods = 'dangerous-goods',
  DeliveryMessage = 'delivery-message',
  DontPrepayPostage = 'dont-prepay-postage',
  DryIce = 'dry-ice',
  EmailNotification = 'email-notification',
  FreightClass = 'freight-class',
  HoldForPickup = 'hold-for-pickup',
  IncludeReturnLabel = 'include-return-label',
  LocalCollect = 'local-collect',
  NonMachinable = 'non-machinable',
  NotificationType = 'notification-type',
  ReleaseNoSignature = 'shipper-release',
  RequiresAdditionalHandling = 'additional-handling',
  Safeplace = 'safeplace',
  SaturdayDelivery = 'saturday-delivery',
  SaturdayGuarantee = 'saturday-guarantee',
  SmsNotification = 'sms-notification',
  SpecialHandling = 'special-handling',
  ThirdPartyConsignee = 'third-party-consignee',
  CarrierInsurance = 'carrier-insurance',
}

export const ShippingOptionDictionarySchema = Joi.object(
  Object.values(ShippingOptionEnum).reduce((accumulator: any, option) => {
    accumulator[option] = ShippingOptionDescriptionSchema;
    return accumulator;
  }, {}),
);
