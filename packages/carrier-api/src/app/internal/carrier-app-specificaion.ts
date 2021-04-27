import { ShippingProviderConnector } from "../metadata/shipping-provider-connector";
import { CarrierSpecification } from "./carrier-specificaion";

export interface CarrierAppSpecification {
  Id: string;
  Name: string;
  Connector: ShippingProviderConnector;
  Carriers: CarrierSpecification[];
}
