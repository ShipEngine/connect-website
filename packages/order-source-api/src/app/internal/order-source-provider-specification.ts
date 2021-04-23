import { Connector } from "../metadata/connector";
import { AuthSpecification } from "../metadata/auth-specification";
import { OrderSourceSpecification } from ".";

/** @description This represents a single integration which may contain multiple branded order sources */
export interface OrderSourceProviderSpecification {
  /** @description The id for this integration */
  Id: string;
  /** @description The name of this integration */
  Name: string;
  /** @description Information about the connector */
  Connector: Connector;
  /** @description The specification for authorizing with this order source */
  AuthProcess: AuthSpecification;
  /** @description A list of branded order sources associated with this integration */
  OrderSources: OrderSourceSpecification[];
}
