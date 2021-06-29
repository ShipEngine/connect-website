import { InventoryFetchItem } from '../models';

/**
 * Enumeration of possible states for fetch or push operations.
 * A representation of an 'error' state is omitted since an error
 * outcome results in throwing one of the predefined Connect-runtime
 * error objects.
 */
export enum OperationStatus {
  DONE = 'DONE',
  PROCESSING = 'PROCESSING',
  PAGING = 'PAGING',
  READY = 'READY',
}

/**
 * Union of possible return states, immediately after
 * initiating a fetch or push operation.
 */
export type OperationStarted = OperationReady | OperationProcessing;

/**
 * Return shape of a fetch or push operation that is done
 * processing and ready for the client to consume results.
 */
export type OperationReady = {
  status: OperationStatus.READY;
  cursor: string;
  message: string;
};

/**
 * Return shape of a fetch or push operation that is still
 * processing at the inventory source, not yet ready for the
 * client to consume results.
 */
export type OperationProcessing = {
  status: OperationStatus.PROCESSING;
  message: string;
  cursor: string;
  poll_after_seconds: number;
};

/** Return shape for a fetch operation that's still processing. */
export type FetchProcessing = OperationProcessing;

/** Return shape for a push operation that's still processing. */
export type PushProcessing = OperationProcessing;

/**
 * Union of possible return shapes when consuming the
 * results of a completed fetch operation.
 */
export type FetchResults = FetchDone | FetchPaging | FetchProcessing;

/**
 * Return shape for a completed fetch operation that has
 * no further result data for the client to consume.
 */
export type FetchDone = {
  status: OperationStatus.DONE;
  items: InventoryFetchItem[];
  message: string;
};

/**
 * Return shape for a completed fetch operation that still has
 * more result data for the client to page through & consume.
 */
export type FetchPaging = {
  status: OperationStatus.PAGING;
  items: InventoryFetchItem[];
  message: string;
  next_cursor: string;
};

/**
 * Union of possible return shapes when consuming the
 * results of a completed fetch operation.
 */
export type PushResults = PushDone | PushPaging | PushProcessing;

/**
 * Return shape for a completed push operation that has
 * no further result data for the client to consume.
 */
export type PushDone = {
  status: OperationStatus.DONE;
  skus_updated: string[];
  message: string;
};

/**
 * Return shape for a completed push operation that still has
 * more result data for the client to page through & consume.
 */
export type PushPaging = {
  status: OperationStatus.PAGING;
  skus_updated: string[];
  message: string;
  next_cursor: string;
};
