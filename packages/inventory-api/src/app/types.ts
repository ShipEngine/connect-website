import { Request } from 'express';
import { InventoryAppDefinition } from './inventory-app-definition';

/**
 * Union of all types / method signatures for all InventoryApp methods.
 */
export type InventoryHandler = InventoryAppDefinition[
  | 'startFetch'
  | 'getFetchResults'
  | 'startPush'
  | 'getPushResults'];

/**
 * Enumeration of all endpoints / routes for all InventoryApp methods.
 */
export enum Operation {
  START_FETCH = '/fetch',
  FETCH_RESULTS = '/fetch/:cursor',
  START_PUSH = '/push',
  PUSH_RESULTS = '/push/:cursor',
}

/**
 * Minimal interface derived from Express `Request`, adequate
 * to allow extraction of `Authorization` header.
 */
export type RequestWithAuth = {
  get(name: string): string | undefined;
};
