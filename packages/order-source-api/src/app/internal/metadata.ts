import { OrderSourceProviderSpecification, OrderSourceSpecification } from ".";
import {
  AuthSpecification,
  Connector,
  FunctionSpecification,
  OrderSourceAppDefinition,
} from "..";

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

export class Metadata implements OrderSourceProviderSpecification {
  Id: string;
  Name: string;
  Connector: Connector;
  AuthProcess: AuthSpecification;
  OrderSources: OrderSourceSpecification[];
  constructor(app: OrderSourceAppDefinition) {
    this.Id = app.Metadata.Id;
    this.Name = app.Metadata.Name;
    this.AuthProcess = app.Metadata.AuthProcess;
    this.AuthProcess.Identifier.Version = "2.0";
    this.OrderSources = app.Metadata.OrderSources.map(
      (orderSourceDefinition) =>
        new OrderSourceSpecification(orderSourceDefinition)
    );
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
