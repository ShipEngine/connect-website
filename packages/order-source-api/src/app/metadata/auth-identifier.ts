import Joi from 'joi';

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

export const AuthIdentifierSchema = Joi.object({
  AuthenticationType: Joi.string().required().valid('oauth', 'basic', 'apikey'),
  Version: Joi.string().optional(),
  IsSandbox: Joi.bool().optional(),
});
