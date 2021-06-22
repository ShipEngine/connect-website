import { CarrierAppDefinition } from '.';
import { ConnectRuntimeApp, Method, Route, BrandedImages } from './internal';

import { resolve } from 'path';
import { readFileSync } from 'fs';

import { Metadata } from './internal/metadata';
import { CarrierSpecification } from './internal/carrier-specificaion';

const handleRequest = (implementation?: Function): any => {
  if (implementation) {
    return (request: any) => {
      return implementation(request.body);
    };
  }
};

const registerRoutes = (routes: Route[], definition: CarrierAppDefinition) => {
  routes.push({
    method: Method.POST,
    path: '/Register',
    handler: handleRequest(definition.Register),
  });
  routes.push({
    method: Method.POST,
    path: '/CreateLabel',
    handler: handleRequest(definition.CreateLabel),
  });
  routes.push({
    method: Method.POST,
    path: '/VoidLabels',
    handler: handleRequest(definition.VoidLabels),
  });
  routes.push({
    method: Method.POST,
    path: '/GetRates',
    handler: handleRequest(definition.GetRates),
  });
  routes.push({
    method: Method.POST,
    path: '/CreateManifest',
    handler: handleRequest(definition.CreateManifest),
  });
  routes.push({
    method: Method.POST,
    path: '/SchedulePickup',
    handler: handleRequest(definition.SchedulePickup),
  });
  routes.push({
    method: Method.POST,
    path: '/CancelPickup',
    handler: handleRequest(definition.CancelPickup),
  });
  routes.push({
    method: Method.POST,
    path: '/Track',
    handler: handleRequest(definition.Track),
  });
};

export class CarrierApp implements ConnectRuntimeApp {
  routes: Route[] = [];
  data: Metadata;
  redoc: string;
  constructor(definition: CarrierAppDefinition) {
    registerRoutes(this.routes, definition);
    this.data = new Metadata(definition);
    this.redoc = readFileSync(resolve(__dirname, '../../spec.yaml')).toString();
  }
  getImages(): BrandedImages[] {
    const mapBrandedImages = (carrier: CarrierSpecification): BrandedImages => {
      return {
        id: carrier.Id,
        logo: carrier.Images.LogoUrl,
        icon: carrier.Images.IconUrl,
      };
    };
    return this.data.Carriers.map(mapBrandedImages);
  }
}
