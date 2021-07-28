import { OrderSourceAppDefinition, OrderSourceAppMetadataSchema } from '.';
import {
  ConnectRuntimeApp,
  BrandedImages,
  Metadata,
  Method,
  OrderSourceProviderSpecification,
  Route,
} from './internal';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const handleRequest = (implementation: Function): any => {
  return (request: any) => {
    return implementation(request.body);
  };
};

export class OrderSourceApp implements ConnectRuntimeApp {
  routes: Route[] = [];
  data: OrderSourceProviderSpecification;
  redoc: string;
  validate: () => string[] | undefined;
  constructor(definition: OrderSourceAppDefinition) {
    this.validate = () => {
      const results = OrderSourceAppMetadataSchema.validate(
        definition.Metadata,
        {
          allowUnknown: true,
          abortEarly: false,
        },
      );
      if (results.error) {
        return results.error.details.map((detail) => `${detail.message}`);
      }
    };
    new Array<[Method, string, any]>(
      [Method.POST, '/acknowledge_orders', definition.AcknowledgeOrders],
      [Method.POST, '/sales_orders_export', definition.SalesOrdersExport],
      [Method.POST, '/shipment_notification', definition.ShipmentNotification],
      [Method.POST, '/get_products', definition.GetProducts],
      [Method.POST, '/notification_status', definition.NotificationStatus],
      [
        Method.POST,
        '/register_delivery_options',
        definition.RegisterDeliveryOptions,
      ],
      [
        Method.POST,
        '/remove_delivery_options',
        definition.RemoveDeliveryOptions,
      ],
      [
        Method.POST,
        '/verify_delivery_options',
        definition.VerifyDeliveryOptions,
      ],
    ).forEach(([method, path, implementation]) => {
      if (implementation) {
        this.routes.push({
          method,
          path,
          handler: handleRequest(implementation as Function),
        });
      }
    });
    this.data = new Metadata(definition, this.routes);
    this.redoc = readFileSync(resolve(__dirname, '../../spec.yaml')).toString();
  }
  getImages(): BrandedImages[] {
    return this.data.OrderSources.map((ordersource) => {
      return {
        id: ordersource.Id,
        logo: ordersource.Images.LogoUrl,
        icon: ordersource.Images.IconUrl,
      };
    });
  }
}
