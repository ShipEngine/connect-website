import { resolve } from "path";
import { readFileSync } from "fs";
import { FreightAppDefinition } from "./freight-app-definition";
import {
  BrandedImage,
  ConnectRuntimeApp,
  FreightProvider,
  Method,
  Route,
  validateRequest,
  validateResponse,
} from "./internal";
import { FreightProviderSpecification } from "./metadata";

const handleRequest = (operation: string, implementation?: Function): any => {
  if (implementation) {
    return (request: any) => {
      validateRequest(operation, request.body);

      const response = implementation(request.body);

      validateResponse(operation, response.body);

      return response;
    };
  }
};

const route = (
  method: Method,
  operation: string,
  handler?: Function
): Route => {
  return {
    method: method,
    path: `/${operation}`,
    handler: handleRequest(operation, handler),
  };
};

export class FreightApp implements ConnectRuntimeApp {
  routes: Route[] = [];
  data: FreightProviderSpecification;
  redoc: string;
  constructor(definition: FreightAppDefinition) {
    this.routes = [
      route(
        Method.POST,
        "connect-freight-carrier",
        definition.ConnectFreightCarrier
      ),
      route(Method.POST, "freight-quote", definition.FreightQuote),
      route(
        Method.POST,
        "freight-shipment-documents",
        definition.FreightShipmentDocuments
      ),
      route(Method.POST, "freight-spot-quote", definition.FreightSpotQuote),
      route(
        Method.POST,
        "provision-freight-provider-account",
        definition.ProvisionFreightProviderAccount
      ),
      route(
        Method.POST,
        "schedule-freight-pickup",
        definition.ScheduleFreightPickup
      ),
      route(
        Method.POST,
        "track-freight-shipment",
        definition.TrackFreightShipment
      ),
    ];
    this.data = new FreightProvider(definition);
    this.redoc = readFileSync(resolve(__dirname, "../../spec.yaml")).toString();
  }
  getImages(): BrandedImage[] {
    return this.data.FreightCarriers.map((carrier) => {
      return {
        id: carrier.Id,
        logo: carrier.Images.LogoUrl,
        icon: carrier.Images.IconUrl,
      };
    });
  }
}
