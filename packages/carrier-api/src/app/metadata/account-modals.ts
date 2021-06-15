export interface AccountModals {
  /** @description Schema for the form to register with the carrier */
  RegistrationFormSchema: {
    jsonSchema: object;
    uiSchema: object;
  };
  /** @description  Schema for the form to update carrier settings */
  SettingsFormSchema: {
    jsonSchema: object;
    uiSchema: object;
  };
}
