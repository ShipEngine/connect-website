import { BaseTestConfigOptions } from "./base-test-config-options";

export interface ConnectionFormTestParams {
  connectionFormData: {};
}

export interface ConnectionFormConfigOptions
  extends ConnectionFormTestParams,
    BaseTestConfigOptions {}