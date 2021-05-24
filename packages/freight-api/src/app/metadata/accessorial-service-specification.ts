import { ApiContractMapping } from "./api-contract-mapping";
import { JsonSchema } from "./json-schema";
import { UiSchema } from "./ui-schema";

export interface AccessorialServiceSpecification {
  Id: string;
  ApiCode: string;
  Code: string;
  Name: string;
  Description?: string;
  SortOrder?: number;
  Attributes?: {
    JsonSchema: JsonSchema;
    UiSchema?: UiSchema;
    ApiContractMapping?: ApiContractMapping[];
  };
}
