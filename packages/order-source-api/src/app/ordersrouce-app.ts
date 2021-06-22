import { OrderSourceAppDefinition } from '.';
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

const handleRequest = (implementation?: Function): any => {
  if (implementation) {
    return (request: any) => {
      return implementation(request.body);
    };
  }
};

export class OrderSourceApp implements ConnectRuntimeApp {
  routes: Route[] = [];
  data: OrderSourceProviderSpecification;
  redoc: string;
  constructor(definition: OrderSourceAppDefinition) {
    this.routes.push({
      method: Method.POST,
      path: '/acknowledge_orders',
      handler: handleRequest(definition.AcknowledgeOrders),
    });
    this.routes.push({
      method: Method.POST,
      path: '/sales_orders_export',
      handler: handleRequest(definition.SalesOrdersExport),
    });
    this.routes.push({
      method: Method.POST,
      path: '/shipment_notification',
      handler: handleRequest(definition.ShipmentNotification),
    });
    this.routes.push({
      method: Method.POST,
      path: '/get_products',
      handler: handleRequest(definition.GetProducts),
    });
    this.data = new Metadata(definition);
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
