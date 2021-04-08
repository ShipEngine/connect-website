import { Connector } from "./connector";
import { AuthSpecification } from "./auth-specification";
import { OrderSourceSpecification } from "./order-source-specification";

export interface OrderSourceProviderSpecification {
  Id: string;
  Name: string;
  Connector: Connector;
  AuthProcess: AuthSpecification;
  OrderSources: OrderSourceSpecification[];
}
