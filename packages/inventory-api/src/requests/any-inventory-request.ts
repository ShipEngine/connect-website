import { AuthenticatedRequest } from "./authenticated-requests";
import {
  FetchInventoryRequestDelta,
  FetchInventoryRequestFull,
} from "./fetch-inventory";
import { OperationResults } from "./operation-results";
import { PushInventoryRequest } from "./push-inventory";

/**
 * Union of all possible request shapes to this API.
 */
export type AnyInventoryRequest =
  | AuthenticatedRequest
  | FetchInventoryRequestFull
  | FetchInventoryRequestDelta
  | FetchInventoryRequestDelta
  | PushInventoryRequest
  | OperationResults;
