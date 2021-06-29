import {
  AnyFetchRequest,
  OperationResults,
  PushInventoryRequest,
} from '../requests/requests';
import { FetchResults, OperationStarted, PushResults } from '../responses';
import { InventoryAppMetadata } from './inventory-app-metadata';

/**
 * Definition for an Inventory App implementation
 */
export interface InventoryAppDefinition {
  metadata: InventoryAppMetadata;

  /**
   * Initiate an inventory fetch of any kind. The incoming req body for
   * this method has a varying shape which maps to different fetch types:
   * - No request body: `full` fetch
   * - Skus: `partial` fetch by sku
   * - SinceDate: `delta` fetch by date
   */
  startFetch: (request: AnyFetchRequest) => Promise<OperationStarted>;

  /**
   * Check for completion and results of a fetch operation.
   */
  getFetchResults: (request: OperationResults) => Promise<FetchResults>;

  /**
   * Initiate an inventory push.
   */
  startPush: (request: PushInventoryRequest) => Promise<OperationStarted>;

  /**
   * Check for completion and results of a push operation.
   */
  getPushResults: (request: OperationResults) => Promise<PushResults>;
}
