import {
  Connector,
  FreightCarrierSpecification,
  FreightProviderSpecification,
  FunctionSpecification,
} from "../metadata";
import { FreightAppDefinition } from "../freight-app-definition";

const mapFunctions = (app: FreightAppDefinition): FunctionSpecification[] => {
  const functions: FunctionSpecification[] = [];

  if (app.ConnectFreightCarrier) {
    functions.push({
      Name: "ConnectFreightCarrier",
      IsSandboxed: false,
    });
  }

  if (app.FreightQuote) {
    functions.push({
      Name: "FreightQuote",
      IsSandboxed: false,
    });
  }

  if (app.FreightShipmentDocuments) {
    functions.push({
      Name: "FreightShipmentDocuments",
      IsSandboxed: false,
    });
  }

  if (app.FreightSpotQuote) {
    functions.push({
      Name: "FreightSpotQuote",
      IsSandboxed: false,
    });
  }

  if (app.ProvisionFreightProviderAccount) {
    functions.push({
      Name: "ProvisionFreightProviderAccount",
      IsSandboxed: false,
    });
  }

  if (app.ScheduleFreightPickup) {
    functions.push({
      Name: "ScheduleFreightPickup",
      IsSandboxed: false,
    });
  }

  if (app.TrackFreightShipment) {
    functions.push({
      Name: "TrackFreightShipment",
      IsSandboxed: false,
    });
  }

  return functions;
};

export class FreightProvider implements FreightProviderSpecification {
  Id: string;
  ApiCode?: string;
  Name: string;
  Connector: Connector;
  FreightCarriers: FreightCarrierSpecification[];
  constructor(app: FreightAppDefinition) {
    this.Id = app.Metadata.Id;
    this.ApiCode = app.Metadata.ApiCode;
    this.Name = app.Metadata.Name;
    this.FreightCarriers = app.Metadata.FreightCarriers;
    this.Connector = {
      DiagnosticRoutes: {
        Liveness: "/diagnostics/liveness",
        Readiness: "/diagnostics/readiness",
        Version: "/diagnostics/version",
      },
      ApiVersion: "1.0.0",
      Functions: mapFunctions(app),
    };
  }
}
