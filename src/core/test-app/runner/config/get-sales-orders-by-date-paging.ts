import { DateTimeZonePOJO, SalesOrderPaging, SalesOrderPagingPOJO } from '@shipengine/connect-sdk';
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface GetSalesOrdersByDatePagingTestParams {
	startDateTime: DateTimeZonePOJO | Date | string;
  endDateTime: DateTimeZonePOJO | Date | string;
  paging: SalesOrderPaging;
}

export interface GetSalesOrdersByDatePagingConfigOptions
  extends GetSalesOrdersByDatePagingTestParams,
    BaseTestConfigOptions {}