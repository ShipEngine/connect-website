import { AuthIdentifier } from "./auth-identifier";
import { OAuthDefinition } from "./monoauth";

/** @description Used to specify information about an integrations authentication */
export interface AuthSpecification {
  /** @description Identify the type of Auth being used by the integration */
  Identifier: AuthIdentifier;
  /** @description Information about the OAuth workflow */
  OAuth?: OAuthDefinition;
}
