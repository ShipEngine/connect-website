import Joi from 'joi';
import { Carrier, CarrierSchema } from './carrier';

export interface CarrierAppMetadata {
  /** @description Id of the carrier app */
  Id: string;
  /** @description Name of the carrier */
  Name: string;
  /** @description List of carriers for the app */
  Carriers: Carrier[];
}

export const CarrierAppMetadataSchema = Joi.object({
  Id: Joi.string()
    .uuid({ version: ['uuidv4'] })
    .required(),
  Name: Joi.string().required(),
  Carriers: Joi.array()
    .unique('Id')
    .required()
    .min(1)
    .message('There must be at least 1 Carrier defined')
    .items(CarrierSchema),
});
