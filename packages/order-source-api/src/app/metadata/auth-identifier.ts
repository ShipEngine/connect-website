export enum AuthenticationType {
  OAuth = 'oauth',
  Basic = 'basic',
  ApiKey = 'apikey',
}

export interface AuthIdentifier {
  AuthenticationType: AuthenticationType;
  Version?: string;
  IsSandbox?: boolean;
}
