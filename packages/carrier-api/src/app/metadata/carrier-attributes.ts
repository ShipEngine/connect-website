import Joi from 'joi';

export enum CarrierAttributeEnum {
  ManifestDigital = 'ManifestDigital',
  ManifestPhysical = 'ManifestPhysical',
  Consolidator = 'Consolidator',
  Regional = 'Regional',
}

export const CarrierAttributeEnumSchema = Joi.string().valid(
  ...Object.values(CarrierAttributeEnum),
);
