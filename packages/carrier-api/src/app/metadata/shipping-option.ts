import Joi from 'joi';

export interface ShippingOption {
  Name: string;
  Type: ShippingOptionEnum;
}

export type ShippingOptionDictionary = { [Key in ShippingOptionEnum]?: string };

export const ShippingOptionDictionarySchema = Joi.object({
  alcohol: Joi.string().optional(),
  'b13a-canada': Joi.string().optional(),
  'bill-to-sender': Joi.string().optional(),
  'bill-to-third-party': Joi.string().optional(),
  'collect-on-delivery': Joi.string().optional(),
  'consequential-loss': Joi.string().optional(),
  'dangerous-goods': Joi.string().optional(),
  'delivery-message': Joi.string().optional(),
  'dont-prepay-postage': Joi.string().optional(),
  'dry-ice': Joi.string().optional(),
  'email-notification': Joi.string().optional(),
  'freight-class': Joi.string().optional(),
  'hold-for-pickup': Joi.string().optional(),
  'include-return-label': Joi.string().optional(),
  'local-collect': Joi.string().optional(),
  'non-machinable': Joi.string().optional(),
  'notification-type': Joi.string().optional(),
  'shipper-release': Joi.string().optional(),
  'additional-handling': Joi.string().optional(),
  safeplace: Joi.string().optional(),
  'saturday-delivery': Joi.string().optional(),
  'saturday-guarantee': Joi.string().optional(),
  'sms-notification': Joi.string().optional(),
  'special-handling': Joi.string().optional(),
  'third-party-consignee': Joi.string().optional(),
  'carrier-insurance': Joi.string().optional(),
});

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
