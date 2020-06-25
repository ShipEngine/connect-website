import ShippingProviderConnector from "./shipping-provider-connector";
import Carrier from "./carrier";

export default interface ExternalSpec {
  Connector?: ShippingProviderConnector | null;
  Carriers: Carrier[];
  Name: string;
  Id: string;
}
