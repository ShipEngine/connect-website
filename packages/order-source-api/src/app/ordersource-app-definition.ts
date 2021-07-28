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
  RegisterDeliveryOptionsRequest,
  RegisterDeliveryOptionsResponse,
  RemoveDeliveryOptionsRequest,
  RemoveDeliveryOptionsResponse,
  SalesOrdersExportRequest,
  SalesOrdersExportResponse,
  ShipmentNotificationRequest,
  ShipmentNotificationResponse,
  VerifyDeliveryOptionsRequest,
  VerifyDeliveryOptionsResponse,
} from '..';
import { NotificationStatusRequest } from '../requests/notification-status-request';
import { NotificationStatusResponse } from '../responses';

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
  /**
   * @description This method takes a list of previously pending notifications and tries to resolve their status with the third party
   * @param request A list of notifications that have been submitted to the third party but not confirmed as being successful or failed.
   */
  NotificationStatus?: (
    request: NotificationStatusRequest,
  ) => NotificationStatusResponse | Promise<NotificationStatusResponse>;
  /**
   * @description This method configures the order source to use an external service for in-cart rates also known as delivery options
   * @param request The information required to register delivery options with an order source
   */
  RegisterDeliveryOptions?: (
    request: RegisterDeliveryOptionsRequest,
  ) =>
    | RegisterDeliveryOptionsResponse
    | Promise<RegisterDeliveryOptionsResponse>;
  /**
   * @description This method removes a delivery options configuration from an order source
   * @param request The information required to register delivery options with an order source
   */
  RemoveDeliveryOptions?: (
    request: RemoveDeliveryOptionsRequest,
  ) => RemoveDeliveryOptionsResponse | Promise<RemoveDeliveryOptionsResponse>;
  /**
   * @description This method checks if delivery options are supported by the order source
   * @param request The information needed to verify delivery options are available within the user's order source
   */
  VerifyDeliveryOptions?: (
    request: VerifyDeliveryOptionsRequest,
  ) => VerifyDeliveryOptionsResponse | Promise<VerifyDeliveryOptionsResponse>;
}
