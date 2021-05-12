import Logo from "./logo";

export interface AccountModals {
  /** @description List of logos for the carriers */
  Logos?: Logo[];
  /** @description Schema for the form to register with the carrier */
  RegistrationFormSchema?: any;
  /** @description  Schema for the form to update carrier settings */
  SettingsFormSchema?: any;
}
