import Joi from 'joi';
import { ReactForm, ReactFormSchema } from './react-form';

export interface AccountConnectionSpecification {
  Name: string;
  ConnectionFormSchema: ReactForm;
}

export const AccountConnectionSpecificationSchema = Joi.object({
  Name: Joi.string().required(),
  ConnectionFormSchema: ReactFormSchema.required(),
});
