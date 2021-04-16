import { RequestBase } from "./request-base";
import { SalesOrderStatus } from "../index";

/** @description This represents the requested criteria for exporting order sources */
export interface SalesOrderExportCriteria {
  /** @description The (ISO 8601) datetime (UTC) associated with the beginning of the range we would like to pull orders from @example "2021-03-31T18:21:14.858Z" */
  from_date_time?: string;
  /** @description The (ISO 8601) datetime (UTC) associated with the end of the range we would like to pull orders from @example "2021-03-31T18:21:14.858Z" */
  to_date_time?: string;
}

/** @description Allows for mapping of custom 3rd party SalesOrder fields to properties on RequestedFulfillmentExtensions */
export interface SalesOrderCustomFieldMappings {
  /** @description custom field 1 */
  custom_field_1?: string;
  /** @description custom field 2 */
  custom_field_2?: string;
  /** @description custom field 3 */
  custom_field_3?: string;
}

/** @description Seller specified mappings for custom statuses coming from the 3rd parties api and the SalesOrderStatus they should map to. */
export interface SalesOrderCustomStatusMappings {
  [key: string]: SalesOrderStatus;
}

/** @description A request to export a range of sales orders */
export interface SalesOrdersExportRequest extends RequestBase {
  /** @description The criteria of which sales orders to retrieve */
  criteria?: SalesOrderExportCriteria;
  /** @description Information needed to get this current batch of orders if necessary, this will be set by the export sales order response if there are additional orders to be retrieved. @example "23", "65f3873f-8ece-4429-935d-e35cbeeab5d5" */
  cursor?: string;
  /** @description Allows for mapping of custom 3rd party SalesOrder fields to properties on RequestedFulfillmentExtensions */
  sales_order_field_mappings?: SalesOrderCustomFieldMappings;
  /** @description seller specified mappings for custom statuses coming from the 3rd parties api and the SalesOrderStatus they should map to. */
  sales_order_status_mappings?: SalesOrderCustomStatusMappings;
}
