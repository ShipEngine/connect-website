import { AccessorialServiceGroupSpecification } from "./accessorial-service-group-specification";
import { ContainerTypeSpecification } from "./container-type-specification";
import { FreightProviderAccountType } from "./freight-provider-account-type";
import { AccountConnectionSpecification } from "./account-connection-specification";
import { ServiceLevelSpecification } from "./service-level-specification";

export interface FreightCarrierSpecification {
  Id: string;
  Codes: {
    SCAC: string;
    ApiCode: string;
  }[];
  Name: string;
  Description?: string;
  ServiceLevels: ServiceLevelSpecification[];
  ContainerTypes: ContainerTypeSpecification[];
  AccessorialServiceGroups?: AccessorialServiceGroupSpecification[];
  SupportedCountries: string[];
  ProviderAccountTypeRequired?: FreightProviderAccountType;
  AccountConnection: AccountConnectionSpecification;
  Images: {
    LogoUrl: string;
    IconUrl: string;
  };
}
