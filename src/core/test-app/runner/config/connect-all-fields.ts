import { BaseTestConfigOptions } from "./base-test-config-options";

export interface ConnectionFormTestParams {
  connectionFormData: object;
}

export interface ConnectionFormConfigOptions
  extends ConnectionFormTestParams,
    BaseTestConfigOptions {}