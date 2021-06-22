import { resolve } from 'path';
import { readFileSync } from 'fs';
import { InventoryAppDefinition } from './inventory-app-definition';
import { FetchType, InventoryAppMetadata } from './inventory-app-metadata';
import { InventoryHandler, Operation } from './types';
import { BrandedImage, ConnectRuntimeApp, Method, Route } from './internal';
import { Request } from 'express';
import { RequestAuth, isRequestAuth } from '../models';
import {
  BadRequestError,
  NotImplementedError,
  UnauthorizedError,
} from '@shipengine/connect-runtime';

export class InventoryApp implements ConnectRuntimeApp {
  routes: Route[];
  data: InventoryAppMetadata;
  redoc = readFileSync(resolve(__dirname, '../../spec.yaml')).toString();
  getImages = (): BrandedImage[] => [];

  constructor(def: InventoryAppDefinition) {
    // Validate app; throws if invalid
    validateAppDef(def);

    this.data = def.metadata;

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
 * Simple middleware to wrap individual handlers. Extracts and decodes
 * Authorization header, passing the result along with the request.body
 * to the given handler.
 *
 * NOTE: It may turn out we need to have a bit of data handling, e.g.
 * coercing strings to dates or vice versa; will circle back to this.
 */
const handleRequest =
  (handler: InventoryHandler | undefined): any =>
  (request: Request) => {
    if (!handler) {
      throw new NotImplementedError();
    }

    const auth = extractAuth(request);
    const cursor = extractCursor(request);
    return handler({ auth, cursor, ...request.body });
  };

const extractCursor = (request: Request): string | undefined =>
  request.params.cursor;

/**
 * Extracts `Authorization` header from an incoming request, decodes and
 * parses it to a `RequestAuth` object. Throws Auth / BadRequest errors if
 * decoding / parsing fails.
 */
const extractAuth = (request: Request): RequestAuth => {
  const rawAuth = request.get('Authorization');
  if (!rawAuth) {
    throw new UnauthorizedError('Must provide Authorization');
  }

  const decoded = Buffer.from(rawAuth, 'base64').toString();

  try {
    const parsed = JSON.parse(decoded);
    if (isRequestAuth(parsed)) {
      return parsed;
    } else {
      throw new BadRequestError(
        'Auth header must match `RequestAuth` definition',
      );
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new UnauthorizedError(
        'Authorization header must decode to a valid JSON object',
      );
    } else {
      throw new BadRequestError('Authorization error:', error.message);
    }
  }
};

/**
 * Runtime verification that an Inventory App Definition is implemented in a way
 * consistent with its metadata. Also verifies that fetch-inventory-full is
 * implemented, which is required for all Inventory Apps.
 */
const validateAppDef = (definition: InventoryAppDefinition) => {
  const meta = definition.metadata;

  // Support for 'full' inventory fetch
  if (typeof definition.fetchInventoryFull !== 'function') {
    throw new Error('Handler for fetchInventoryFull must be implemented.');
  }

  // Support for 'partial' inventory fetch
  const partialShouldBeImplemented = meta.supportedFetchTypes.includes(
    FetchType.PARTIAL,
  );
  const partialIsImplemented =
    typeof definition.fetchInventoryPartial === 'function';
  if (partialShouldBeImplemented !== partialIsImplemented) {
    throw new Error(
      'App implementation does not match metadata for fetchInventoryPartial',
    );
  }

  // Support for 'delta' inventory fetch
  const deltaShouldBeImplemented = meta.supportedFetchTypes.includes(
    FetchType.DELTA,
  );
  const deltaIsImplemented =
    typeof definition.fetchInventoryDelta === 'function';
  if (deltaShouldBeImplemented !== deltaIsImplemented) {
    throw new Error(
      'App implementation does not match metadata for fetchInventorydelta',
    );
  }

  // Support for inventory push
  const pushShouldBeImplemented = meta.supportsInventoryPush;
  const pushIsImplemented =
    typeof definition.pushInventory === 'function' &&
    typeof definition.getPushResults === 'function';
  if (pushShouldBeImplemented !== pushIsImplemented) {
    throw new Error(
      'App implementation does not match metadata for pushInventory / getPushResults',
    );
  }
};
