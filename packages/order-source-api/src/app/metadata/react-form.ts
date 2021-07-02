import Joi from 'joi';

export interface ReactForm {
  JsonSchema: any;
  UiSchema: any;
  ApiContractMapping?: any;
}

export const ReactFormSchema = Joi.object({
  JsonSchema: Joi.object().required(),
  UiSchema: Joi.object().required(),
  ApiContractMapping: Joi.object().optional(),
});
