import { InventoryItemBase, RequestAuth } from '../models';

/**
 * All requests from clients to Inventory Apps must include an `Authorization`
 * header, which should deserialize into a blob conforming to the `RequestAuth`
 * definition. This type acts as a mixin for other request definitions, indicating
 * they should include a deserialized `auth` blob after
 */
export type AuthenticatedRequest = {
  auth: RequestAuth;
};

/*****************************/
/****** Fetch Requests *******/
/*****************************/

/**
 * The shape of request bodies when making a "full" inventory fetch. This
 * request takes no extra parameters beyond the common auth scheme, so
 * this definition is just a type alias.
 */
export type StartFullFetch = AuthenticatedRequest;

/**
 * The shape of request bodies when making a `partial` inventory fetch. A partial
 * fetch only expects to receive stock quantities for a specific set of SKUs.
 */
export type StartPartialFetch = AuthenticatedRequest & {
  skus: string[];
};

/**
 * The shape of request bodies when making a 'delta' inventory fetch. A delta
 * fetch only expects to receive stock quantities which have changed since
 * the provided `sinceDate`.
 */
export type StartDeltaFetch = AuthenticatedRequest & {
  sinceDate: Date;
};

/**
 * The shape of any valid request body for the `POST /fetch` route.
 */
export type AnyFetchRequest =
  | StartFullFetch
  | StartPartialFetch
  | StartDeltaFetch;

/*****************************/
/*#***** Push Requests *******/
/*****************************/

/**
 * Incoming request shape when clients are pushing new stock quantities to
 * 3rd-party inventory providers.
 */
export type PushInventoryRequest = AuthenticatedRequest & {
  items: InventoryItemBase[];
};

/*****************************/
/**** Operation Results ******/
/*****************************/

/**
 * Clients can check the status of long-running Inventory operations,
 * or page through the results of completed operations, via GET to either
 * the `/push` or `/fetch` endpoints. All that's required from the client
 * in this case is a cursor.
 */
export type OperationResults = AuthenticatedRequest & {
  cursor: string;
};
