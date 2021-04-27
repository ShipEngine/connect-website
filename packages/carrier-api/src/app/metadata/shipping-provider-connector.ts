import { FunctionSpecification } from "./function";
import DiagnosticRoutes from "./diagnostic-routes";

export interface ShippingProviderConnector {
  Functions: FunctionSpecification[];
  ApiVersion: string;
  DiagnosticRoutes?: DiagnosticRoutes;
}
