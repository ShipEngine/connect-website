import {
  AuthSpecification,
  AuthSpecificationSchema,
} from './metadata/auth-specification';
import { OrderSourceDefinition, OrderSourceDefinitionSchema } from './metadata';
import Joi from 'joi';
import {
  AcknowledgeOrdersRequest,
  AcknowledgeOrdersResponse,
  GetProductsRequest,
  GetProductsResponse,
  SalesOrdersExportRequest,
  SalesOrdersExportResponse,
  ShipmentNotificationRequest,
  ShipmentNotificationResponse,
} from '..';

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

export const OrderSourceAppMetadataSchema = Joi.object({
  Id: Joi.string()
    .uuid({ version: ['uuidv4'] })
    .required(),
  Name: Joi.string().required(),
  AuthProcess: AuthSpecificationSchema.required(),
  OrderSources: Joi.array()
    .unique('Id')
    .message(`Found duplicate OrderSource Id's in OrderSources[]`)
    .required()
    .min(1)
    .message('There must be at least 1 OrderSource defined')
    .items(OrderSourceDefinitionSchema),
});

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
    request: SalesOrdersExportRequest,
  ) => SalesOrdersExportResponse | Promise<SalesOrdersExportResponse>;
  /**
   * @description This method notifies a marketplace of a shipment
   * @param request The information necessary to update the order source that this order has been shipped.
   */
  ShipmentNotification?: (
    request: ShipmentNotificationRequest,
  ) => ShipmentNotificationResponse | Promise<ShipmentNotificationResponse>;
  /**
   * @description This method notifies a marketplace that an order has been imported
   * @param request The information necessary to acknowledge that the order has been imported
   */
  AcknowledgeOrders?: (
    request: AcknowledgeOrdersRequest,
  ) => AcknowledgeOrdersResponse | Promise<AcknowledgeOrdersResponse>;
  /**
   * @description This method gets extra data for a product that was unavailable during export
   * @param request The list of product ids to get data for
   */
  GetProducts?: (
    request: GetProductsRequest,
  ) => GetProductsResponse | Promise<GetProductsResponse>;
}
