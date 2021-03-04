import { RequestBase } from "./request-base";
import { SalesOrderStatus } from "../index"

export interface SalesOrderExportCriteria {
  from_date_time?: string;
  to_date_time?: string;
}

export interface SalesOrderCustomFieldMappings {
  custom_field_1?: string;
  custom_field_2?: string;
  custom_field_3?: string;
}

export interface SalesOrderCustomStatusMappings {
  [key: string]: SalesOrderStatus;
}

export interface SalesOrdersExportRequest extends RequestBase {
  criteria?: SalesOrderExportCriteria;
  cursor?: string;
  sales_order_field_mappings?: SalesOrderCustomFieldMappings;
  sales_order_status_mappings?: SalesOrderCustomStatusMappings;
}

