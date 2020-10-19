import Function from './function';
import DiagnosticRoutes from './diagnostic-routes';

export default interface ShippingProviderConnector {
	Functions: Function[];
	ApiVersion: string;
	DiagnosticRoutes?: DiagnosticRoutes | null;
	SandboxUrl?: string | null;
	ConnectorUrl: string;
}
