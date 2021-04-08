export enum AuthenticationType {
  OAuth = "oauth",
  Basic = "basic",
  ApiKey = "apikey",
}

export interface AuthIdentifier {
  AuthenticationType: AuthenticationType;
  IsSandbox?: boolean;
}
