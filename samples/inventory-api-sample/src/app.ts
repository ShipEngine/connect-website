import {
  AnyFetchRequest,
  InventoryAppDefinition as App,
  OperationResults,
  OperationStarted,
  OperationStatus,
  PushInventoryRequest,
  RequestAuth,
} from "@shipengine/connect-inventory-api";
import {
  BadRequestError,
  logger,
  NotImplementedError,
} from "@shipengine/connect-runtime";

/**
 * A higher-order handler to figure out how a `startFetch` request should be "routed".
 * Determines which fetch is being requested based on incoming params, or throws an
 * error if the provided params cannot be resolved to a single type of fetch operation.
 */
export const startFetch: App["startFetch"] = async (
  request: AnyFetchRequest
) => {
  logger.info(JSON.stringify(request, null, 2));

  const hasSkusParam = "skus" in request;
  const hasDateParam = "sinceDate" in request;

  if (hasSkusParam && hasDateParam) {
    throw new BadRequestError(
      "Cannot include both `skus` and `sinceDate` – inventory fetch can either be `partial` or `delta`, but not both."
    );
  }

  switch (true) {
    // Full fetch – request only has Auth key
    case !hasSkusParam && !hasDateParam:
      return startFullFetch(request.auth);
    // Partial fetch
    case hasSkusParam:
      const skus = request["skus"] as string[];
      return startPartialFetch(request.auth, skus);
    // Delta fetch
    case hasDateParam:
      const date = new Date(request["sinceDate"]);
      return startDeltaFetch(request.auth, date);
  }
};

/**
 * Example function to initiate a full fetch.
 */
const startFullFetch = async (
  _auth: RequestAuth
): Promise<OperationStarted> => {
  const cursor = "full_fetch_cursor!";
  const poll_after_seconds = 10;

  return {
    status: OperationStatus.PROCESSING,
    message: `Poll for results at /fetch/${cursor} after ${poll_after_seconds} seconds`,
    cursor,
    poll_after_seconds,
  };
};

/**
 * Example function to initiate a partial (by SKU) fetch.
 */
const startPartialFetch = async (
  _auth: RequestAuth,
  _skus: string[]
): Promise<OperationStarted> => {
  const cursor = "partial_fetch_cursor!";
  const poll_after_seconds = 5;

  return {
    status: OperationStatus.PROCESSING,
    message: `Poll for results at /fetch/${cursor} after ${poll_after_seconds} seconds`,
    cursor,
    poll_after_seconds,
  };
};

/**
 * Example function to initiate a partial (by date) fetch.
 */
const startDeltaFetch = async (
  _auth: RequestAuth,
  _sinceDate: Date
): Promise<OperationStarted> => {
  throw new NotImplementedError();
};

/**
 * Example function to check the results of a fetch operation.
 */
export const fetchResults: App["getFetchResults"] = async (
  request: OperationResults
) => {
  logger.info(JSON.stringify(request, null, 2));

  const cursor = "fetch_results_cursor!";
  const poll_after_seconds = 15;

  return {
    status: OperationStatus.PROCESSING,
    message: `Poll for results at /fetch/${cursor} after ${poll_after_seconds} seconds`,
    cursor,
    poll_after_seconds,
  };
};

/**
 * Example function to initiate a push operation.
 */
export const startPush: App["startPush"] = async (
  request: PushInventoryRequest
) => {
  logger.info(JSON.stringify(request, null, 2));

  const cursor = "push_started_cursor!";
  const poll_after_seconds = 5;

  return {
    status: OperationStatus.PROCESSING,
    message: `Poll for results at /push/${cursor} after ${poll_after_seconds} seconds`,
    cursor,
    poll_after_seconds,
  };
};

/**
 * Example function to check the results of a push operation
 */
export const pushResults: App["getPushResults"] = async (
  request: OperationResults
) => {
  logger.info(JSON.stringify(request, null, 2));

  const cursor = "push_results_cursor!";
  const poll_after_seconds = 15;

  return {
    status: OperationStatus.PROCESSING,
    message: `Poll for results at /push/${cursor} after ${poll_after_seconds} seconds`,
    cursor,
    poll_after_seconds,
  };
};
