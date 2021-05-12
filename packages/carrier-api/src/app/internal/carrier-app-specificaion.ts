import { ShippingProviderConnector } from "../metadata/shipping-provider-connector";
import { CarrierSpecification } from "./carrier-specificaion";

/** @description This represents a single integration which may contain multiple carrier sources */
export interface CarrierAppSpecification {
  /** @description The id for this integration */
  Id: string;
  /** @description The name of this integration */
  Name: string;
  /** @description Information about the connector */
  Connector: ShippingProviderConnector;
  /** @description A list of carrier sources associated with this integration */
  Carriers: CarrierSpecification[];
}
