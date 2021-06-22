import { ApiContractMapping } from './api-contract-mapping';
import { JsonSchema } from './json-schema';
import { UiSchema } from './ui-schema';

/**
 * Form schemas are defined using react-jsonschema-form:
 * https://react-jsonschema-form.readthedocs.io
 */
export interface AccountConnectionSpecification {
  JsonSchema: JsonSchema;
  UiSchema?: UiSchema;
  ApiContractMapping?: ApiContractMapping[];
}
