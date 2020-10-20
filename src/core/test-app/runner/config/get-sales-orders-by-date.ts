import { SalesOrderTimeRangePOJO } from "@shipengine/connect-sdk/lib/internal";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface GetSalesOrdersByDateTestParams {
	timeRange: SalesOrderTimeRangePOJO;
}

export interface GetSalesOrdersByDateConfigOptions
  extends GetSalesOrdersByDateTestParams,
    BaseTestConfigOptions {}