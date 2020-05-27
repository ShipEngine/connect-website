import Logo from './logo';

export default interface AccountModal {
  Logos?: Logo[] | null;
  RegistrationFormSchema?: any | null;
  SettingsFormSchema?: any | null;
}
