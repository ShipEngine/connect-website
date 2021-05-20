import { FreightCarrierSpecification } from "./metadata";

export interface FreightAppMetadata {
  Id: string;
  Name: string;
  FreightCarriers: FreightCarrierSpecification[];
}
