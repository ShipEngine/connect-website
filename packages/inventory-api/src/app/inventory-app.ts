import { resolve } from "path";
import { readFileSync } from "fs";
import { InventoryAppDefinition } from "./inventory-app-definition";
import { FetchType, InventoryAppMetadata } from "./inventory-app-metadata";
import { InventoryHandler, Operation } from "./types";
import { BrandedImage, ConnectRuntimeApp, Method, Route } from "./internal";

export class InventoryApp implements ConnectRuntimeApp {
  routes: Route[];
  data: InventoryAppMetadata;
  redoc = readFileSync(resolve(__dirname, "../../spec.yaml")).toString();
  getImages = (): BrandedImage[] => [];

  constructor(def: InventoryAppDefinition) {
    // Validate app; throws if invalid
    validateAppDef(def);

    this.routes = [
      {
        method: Method.POST,
        path: Operation.FETCH_FULL,
        handler: handleRequest(def.fetchInventoryFull),
      },
      {
        method: Method.POST,
        path: Operation.FETCH_PARTIAL,
        handler: handleRequest(def.fetchInventoryPartial),
      },
      {
        method: Method.POST,
        path: Operation.FETCH_DELTA,
        handler: handleRequest(def.fetchInventoryDelta),
      },
      {
        method: Method.POST,
        path: Operation.FETCH_FULL,
        handler: handleRequest(def.fetchInventoryFull),
      },
      {
        method: Method.GET,
        path: Operation.FETCH_RESULTS,
        handler: handleRequest(def.getFetchResults),
      },
      {
        method: Method.POST,
        path: Operation.PUSH,
        handler: handleRequest(def.pushInventory),
      },
      {
        method: Method.GET,
        path: Operation.PUSH_RESULTS,
        handler: handleRequest(def.getPushResults),
      },
    ];
  }
}

/**
 * Simple wrapper for method implementations, which passes an incoming
 * request body to the method for further processing.
 * 
 * NOTE: It may turn out we need to have a bit of data handling, e.g.
 * coercing strings to dates or vice versa; will circle back to this.
 */
const handleRequest =
  (handler: InventoryHandler): any =>
  (request: any) =>
    handler(request.body);

/**
 * Runtime verification that an Inventory App Definition is implemented in a way
 * consistent with its metadata. Also verifies that fetch-inventory-full is
 * implemented, which is required for all Inventory Apps.
 */
const validateAppDef = (definition: InventoryAppDefinition) => {
  const meta = definition.metadata;

  // Support for 'full' inventory fetch
  if (typeof definition.fetchInventoryFull !== "function") {
    throw new Error("Handler for fetchInventoryFull must be implemented.");
  }

  // Support for 'partial' inventory fetch
  const partialShouldBeImplemented = meta.supportedFetchTypes.includes(
    FetchType.PARTIAL
  );
  const partialIsImplemented =
    typeof definition.fetchInventoryPartial === "function";
  if (partialShouldBeImplemented !== partialIsImplemented) {
    throw new Error(
      "App implementation does not match metadata for fetchInventoryPartial"
    );
  }

  // Support for 'delta' inventory fetch
  const deltaShouldBeImplemented = meta.supportedFetchTypes.includes(
    FetchType.DELTA
  );
  const deltaIsImplemented =
    typeof definition.fetchInventoryDelta === "function";
  if (deltaShouldBeImplemented !== deltaIsImplemented) {
    throw new Error(
      "App implementation does not match metadata for fetchInventorydelta"
    );
  }

  // Support for inventory push
  const pushShouldBeImplemented = meta.supportsInventoryPush;
  const pushIsImplemented =
    typeof definition.pushInventory === "function" &&
    typeof definition.getPushResults === "function";
  if (pushShouldBeImplemented !== pushIsImplemented) {
    throw new Error(
      "App implementation does not match metadata for pushInventory / getPushResults"
    );
  }
};
