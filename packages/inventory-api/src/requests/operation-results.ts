import { AuthenticatedRequest } from ".";

/**
 * Clients can check the status of long-running Inventory operations,
 * or page through the results of completed operations, via GET to either
 * the `/push` or `/fetch` endpoints. All that's required from the client
 * in this case is a cursor.
 */
export type OperationResults = AuthenticatedRequest & {
  cursor: string;
};
