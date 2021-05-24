import { FreightCarrierSpecification } from "./metadata";

export interface FreightAppMetadata {
  Id: string;
  ApiCode?: string;
  Name: string;
  FreightCarriers: FreightCarrierSpecification[];
}
