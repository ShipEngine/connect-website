import Joi from 'joi';

export enum ServiceAttributesEnum {
  Returns = 'Returns',
  MultiPackage = 'MultiPackage',
  Tracking = 'Tracking',
  ConsolidatorService = 'ConsolidatorService',
  AutomatedTrackingAllowed = 'AutomatedTrackingAllowed',
  ManifestDigital = 'ManifestDigital',
  ManifestPhysical = 'ManifestPhysical',
}

export const ServiceAttributesEnumSchema = Joi.string().valid(
  ...Object.values(ServiceAttributesEnum),
);
