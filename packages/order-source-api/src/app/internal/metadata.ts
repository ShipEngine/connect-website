import { OrderSourceProviderSpecification, OrderSourceSpecification } from '.';
import {
  AuthSpecification,
  Connector,
  FunctionSpecification,
  OrderSourceAppDefinition,
} from '..';
import { Route } from './route';

const mapRoutes = (route: Route): FunctionSpecification => {
  return {
    Name: route.path.replace('/', ''),
    IsSandboxed: false,
  };
};

export class Metadata implements OrderSourceProviderSpecification {
  Id: string;
  Name: string;
  Connector: Connector;
  AuthProcess: AuthSpecification;
  OrderSources: OrderSourceSpecification[];
  constructor(app: OrderSourceAppDefinition, routes: Route[]) {
    this.Id = app.Metadata.Id;
    this.Name = app.Metadata.Name;
    this.AuthProcess = app.Metadata.AuthProcess;
    this.AuthProcess.Identifier.Version = '2.0';
    this.OrderSources = app.Metadata.OrderSources.map(
      (orderSourceDefinition) =>
        new OrderSourceSpecification(orderSourceDefinition),
    );
    this.Connector = {
      DiagnosticRoutes: {
        Liveness: '/diagnostics/liveness',
        Readiness: '/diagnostics/readiness',
        Version: '/diagnostics/version',
      },
      ApiVersion: '2.0.0',
      Functions: routes.map(mapRoutes),
    };
  }
}
