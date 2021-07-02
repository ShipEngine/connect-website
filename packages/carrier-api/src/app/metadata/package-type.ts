import Joi from 'joi';

export enum RequiredToShipEnum {
  Weight = 'Weight',
  Dimensions = 'Dimensions',
}

/** @description Package details */
export interface PackageType {
  Id: string;
  Name: string;
  CarrierPackageTypeCode: string;
  Description?: string;
  Abbreviation?: string;
  PackageAttributes: PackageAttribute[];
  RequiredToShip?: RequiredToShipEnum[];
}

export enum PackageAttribute {
  International = 'International',
  Domestic = 'Domestic',
  Consolidator = 'Consolidator',
}

export const PackageTypeSchema = Joi.object({
  Id: Joi.string()
    .uuid({ version: ['uuidv4'] })
    .required(),
  Name: Joi.string().required(),
  CarrierPackageTypeCode: Joi.string().required(),
  Description: Joi.string().optional(),
  Abbreviation: Joi.string().optional(),
  PackageAttributes: Joi.array()
    .required()
    .items(Joi.string().valid(...Object.values(PackageAttribute))),
  RequiredToShip: Joi.array()
    .optional()
    .items(Joi.string().valid(...Object.values(RequiredToShipEnum))),
});
