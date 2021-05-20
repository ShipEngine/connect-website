import { Connector } from "./connector";
import { FreightCarrierSpecification } from "./freight-carrier-specification";

export interface FreightProviderSpecification {
  Id: string;
  Name: string;
  Connector: Connector;
  FreightCarriers: FreightCarrierSpecification[];
}
