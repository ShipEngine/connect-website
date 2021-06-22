import { InventoryAppDefinition } from './inventory-app-definition';

export type InventoryHandler = InventoryAppDefinition[
  | 'fetchInventoryFull'
  | 'fetchInventoryPartial'
  | 'fetchInventoryDelta'
  | 'getFetchResults'
  | 'pushInventory'
  | 'getPushResults'];

export enum Operation {
  FETCH_FULL = '/fetch_inventory/full',
  FETCH_PARTIAL = '/fetch_inventory/partial',
  FETCH_DELTA = '/fetch_inventory/delta',
  FETCH_RESULTS = '/fetch_inventory/:cursor',
  PUSH = '/push_inventory',
  PUSH_RESULTS = '/push_inventory/:cursor',
}
