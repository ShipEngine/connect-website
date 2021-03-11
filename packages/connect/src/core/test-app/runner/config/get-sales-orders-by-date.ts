import { DateTimeZonePOJO } from '@shipengine/connect-sdk';
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface GetSalesOrdersByDateTestParams {
	startDateTime: DateTimeZonePOJO | Date | string;
	endDateTime: DateTimeZonePOJO | Date | string;
}

export interface GetSalesOrdersByDateConfigOptions
  extends GetSalesOrdersByDateTestParams,
    BaseTestConfigOptions {}