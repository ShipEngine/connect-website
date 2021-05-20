import { AccessorialServiceSpecification } from "./accessorial-service-specification";

export interface AccessorialServiceGroupSpecification {
  Id: string;
  Name: string;
  SortOrder?: number;
  Services: AccessorialServiceSpecification[];
}
