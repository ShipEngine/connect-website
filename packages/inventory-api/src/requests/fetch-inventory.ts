import { AuthenticatedRequest } from ".";

/**
 * The shape of request bodies when making a "full" inventory fetch. This
 * request takes no extra parameters beyond the common auth scheme, so
 * this definition is just a type alias.
 */
export type FetchInventoryRequestFull = AuthenticatedRequest

/**
 * The shape of request bodies when making a `partial` inventory fetch. A partial
 * fetch only expects to receive stock quantities for a specific set of SKUs.
 */
export type FetchInventoryRequestPartial = AuthenticatedRequest & {
  skus: string[];
};

/**
 * The shape of request bodies when making a 'delta' inventory fetch. A delta
 * fetch only expects to receive stock quantities which have changed since
 * the provided `sinceDate`.
 */
export type FetchInventoryRequestDelta = AuthenticatedRequest & {
  sinceDate: Date;
};
