import Joi from 'joi';

export interface AccountModals {
  /** @description Schema for the form to register with the carrier */
  RegistrationFormSchema: {
    formSchema: {
      jsonSchema: object;
      uiSchema: object;
    };
  };
  /** @description  Schema for the form to update carrier settings */
  SettingsFormSchema: {
    formSchema: {
      jsonSchema: object;
      uiSchema: object;
    };
  };
}

const FormSchema = Joi.object({
  formSchema: Joi.object({
    jsonSchema: Joi.object().required(),
    uiSchema: Joi.object().required(),
  }),
});

export const AccountModalsSchema = Joi.object({
  RegistrationFormSchema: FormSchema.required(),
  SettingsFormSchema: FormSchema.required(),
});
