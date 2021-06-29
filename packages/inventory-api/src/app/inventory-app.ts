import { resolve } from 'path';
import { readFileSync } from 'fs';
import { InventoryAppDefinition } from './inventory-app-definition';
import { InventoryAppMetadata } from './inventory-app-metadata';
import { Operation } from './types';
import { BrandedImage, ConnectRuntimeApp, Method, Route } from './internal';
import { handleRequest } from './middleware';

export class InventoryApp implements ConnectRuntimeApp {
  routes: Route[];
  data: InventoryAppMetadata;
  redoc = readFileSync(resolve(__dirname, '../../spec.yaml')).toString();
  getImages = (): BrandedImage[] => [];

  constructor(def: InventoryAppDefinition) {
    this.data = def.metadata;

    this.routes = [
      {
        method: Method.POST,
        path: Operation.START_FETCH,
        handler: handleRequest(def.startFetch),
      },
      {
        method: Method.GET,
        path: Operation.FETCH_RESULTS,
        handler: handleRequest(def.getFetchResults),
      },
      {
        method: Method.POST,
        path: Operation.START_PUSH,
        handler: handleRequest(def.startPush),
      },
      {
        method: Method.GET,
        path: Operation.PUSH_RESULTS,
        handler: handleRequest(def.getPushResults),
      },
    ];
  }
}
