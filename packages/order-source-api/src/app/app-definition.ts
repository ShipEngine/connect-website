import {
  AcknowledgeOrdersRequest,
  AcknowledgeOrdersResponse,
  SalesOrdersExportRequest,
  SalesOrdersExportResponse,
  ShipmentNotificationRequest,
  ShipmentNotificationResponse,
} from "..";
import { AuthSpecification } from "./metadata/auth-specification";
import {
  Connector,
  FunctionSpecification,
  OrderSourceProviderSpecification,
  OrderSourceSpecification,
} from "./metadata";

export enum Method {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export interface Route {
  path: string;
  method: Method;
  handler?: Function;
}

export interface App {
  routes: Route[];
  data: any;
  logo: string;
  icon: string;
}

export interface OrderSourceAppMetadata {
  Id: string;
  Name: string;
  AuthProcess: AuthSpecification;
  OrderSources: OrderSourceSpecification[];
}

/**
 * @description This defines a connect order source app
 */
export interface OrderSourceAppDefinition {
  Metadata: OrderSourceAppMetadata;
  Logo: string;
  Icon: string;
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
}

const mapFunctions = (
  app: OrderSourceAppDefinition
): FunctionSpecification[] => {
  const functions: FunctionSpecification[] = [];
  if (app.SalesOrdersExport) {
    functions.push({
      Name: "SalesOrdersExport",
      IsSandboxed: false,
    });
  }

  if (app.ShipmentNotification) {
    functions.push({
      Name: "ShipmentNotification",
      IsSandboxed: false,
    });
  }

  if (app.AcknowledgeOrders) {
    functions.push({
      Name: "AcknowledgeOrders",
      IsSandboxed: false,
    });
  }
  return functions;
};

class Metadata implements OrderSourceProviderSpecification {
  Id: string;
  Name: string;
  Connector: Connector;
  AuthProcess: AuthSpecification;
  OrderSources: OrderSourceSpecification[];
  constructor(app: OrderSourceAppDefinition) {
    this.Id = app.Metadata.Id;
    this.Name = app.Metadata.Name;
    this.AuthProcess = app.Metadata.AuthProcess;
    this.OrderSources = app.Metadata.OrderSources;
    this.Connector = {
      DiagnosticRoutes: {
        Liveness: "/diagnostics/liveness",
        Readiness: "/diagnostics/readiness",
        Version: "/diagnostics/version",
      },
      ApiVersion: "2.0.0",
      Functions: mapFunctions(app),
    };
  }
}

export class OrderSourceApp implements App {
  routes: Route[] = [];
  data: any;
  logo: string;
  icon: string;
  constructor(app: OrderSourceAppDefinition) {
    this.routes.push({
      method: Method.POST,
      path: "/acknowledge_orders",
      handler: app.AcknowledgeOrders,
    });
    this.routes.push({
      method: Method.POST,
      path: "/sales_orders_export",
      handler: app.SalesOrdersExport,
    });
    this.routes.push({
      method: Method.POST,
      path: "/shipment_notification",
      handler: app.ShipmentNotification,
    });
    this.logo = app.Logo;
    this.icon = app.Icon;
    this.data = new Metadata(app);
  }
}
