import { AuthSpecification } from "./metadata/auth-specification";
import { OrderSourceDefinition } from "./metadata";
import {
  AcknowledgeOrdersRequest,
  AcknowledgeOrdersResponse,
  GetProductsRequest,
  GetProductsResponse,
  SalesOrdersExportRequest,
  SalesOrdersExportResponse,
  ShipmentNotificationRequest,
  ShipmentNotificationResponse,
} from "..";

/** @description This represents a single integration which may contain multiple branded order sources */
export interface OrderSourceAppMetadata {
  /** @description The id for this integration */
  Id: string;
  /** @description The name of this integration */
  Name: string;
  /** @description The specification for authorizing with this order source */
  AuthProcess: AuthSpecification;
  /** @description A list of branded order sources associated with this integration */
  OrderSources: OrderSourceDefinition[];
}

/**
 * @description This defines a connect order source app
 */
export interface OrderSourceAppDefinition {
  Metadata: OrderSourceAppMetadata;
  /**
   * @description This method gets sales orders based on filter criteria
   * @param request The criteria of which sales orders to retrieve
   */
  SalesOrdersExport?: (
    request: SalesOrdersExportRequest
  ) => SalesOrdersExportResponse | Promise<SalesOrdersExportResponse>;
  /**
   * @description This method notifies a marketplace of a shipment
   * @param request The information necessary to update the order source that this order has been shipped.
   */
  ShipmentNotification?: (
    request: ShipmentNotificationRequest
  ) => ShipmentNotificationResponse | Promise<ShipmentNotificationResponse>;
  /**
   * @description This method notifies a marketplace that an order has been imported
   * @param request The information necessary to acknowledge that the order has been imported
   */
  AcknowledgeOrders?: (
    request: AcknowledgeOrdersRequest
  ) => AcknowledgeOrdersResponse | Promise<AcknowledgeOrdersResponse>;
  /**
   * @description This method gets extra data for a product that was unavailable during export
   * @param request The list of product ids to get data for
   */
  GetProducts?: (
    request: GetProductsRequest
  ) => GetProductsResponse | Promise<GetProductsResponse>;
}
