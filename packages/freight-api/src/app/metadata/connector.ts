import { DiagnosticRoutes } from "./diagnostic-routes";
import { FunctionSpecification } from "./function-specification";

export interface Connector {
  DiagnosticRoutes: DiagnosticRoutes;
  ApiVersion: string;
  Functions: FunctionSpecification[];
}
