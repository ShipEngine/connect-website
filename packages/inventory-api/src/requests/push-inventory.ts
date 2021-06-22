import { InventoryItemBase } from '../models';
import { AuthenticatedRequest } from '.';

/**
 * Incoming request shape when clients are pushing new stock quantities to
 * 3rd-party inventory providers.
 */
export type PushInventoryRequest = AuthenticatedRequest & {
  items: InventoryItemBase[];
};
