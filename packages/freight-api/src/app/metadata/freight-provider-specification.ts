import { Connector } from "./connector";
import { FreightCarrierSpecification } from "./freight-carrier-specification";

export interface FreightProviderSpecification {
  Id: string;
  /**
   * If this app is to serve as a Freight Provider in addition to one or more Freight Carriers
   * you must specify a unique API code to use when calling the Freight Provider - otherwise
   * you can leave this undefined.
   */
  ApiCode?: string;
  Name: string;
  Connector: Connector;
  FreightCarriers: FreightCarrierSpecification[];
}
