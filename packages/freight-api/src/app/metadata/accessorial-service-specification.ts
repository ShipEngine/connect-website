import { JsonSchema } from "./json-schema";
import { UiSchema } from "./ui-schema";

export interface AccessorialServiceSpecification {
  Id: string;
  Code: string;
  Name: string;
  Description?: string;
  SortOrder?: number;
  Attributes?: {
    JsonSchema: JsonSchema;
    UiSchema?: UiSchema;
  };
}
