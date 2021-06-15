import {
  AuthenticatedRequest,
  FetchInventoryRequestDelta,
  FetchInventoryRequestPartial,
  InventoryAppDefinition as App,
  OperationResults,
  OperationStatus,
  PushInventoryRequest,
} from "@shipengine/connect-inventory-api";
import { logger } from "@shipengine/connect-runtime";

export const fetchFull: App["fetchInventoryFull"] = async (
  request: AuthenticatedRequest
) => {
  logger.info(JSON.stringify(request, null, 2));
  return {
    has_more_data: false,
    status: OperationStatus.SUCCESS,
    inventory_items: [],
  };
};

export const fetchPartial: App["fetchInventoryPartial"] = async (
  request: FetchInventoryRequestPartial
) => {
  logger.info(JSON.stringify(request, null, 2));
  return {
    has_more_data: false,
    status: OperationStatus.SUCCESS,
    inventory_items: [],
  };
};

export const fetchDelta: App["fetchInventoryDelta"] = async (
  request: FetchInventoryRequestDelta
) => {
  logger.info(JSON.stringify(request, null, 2));
  return {
    has_more_data: false,
    status: OperationStatus.SUCCESS,
    inventory_items: [],
  };
};

export const fetchResults: App["getFetchResults"] = async (
  request: OperationResults
) => {
  logger.info(JSON.stringify(request, null, 2));
  return {
    status: OperationStatus.PENDING,
    cursor: "abc123",
    poll_after_seconds: 10,
  };
};

export const push: App["pushInventory"] = async (
  request: PushInventoryRequest
) => {
  logger.info(JSON.stringify(request, null, 2));
  return {
    status: OperationStatus.SUCCESS,
    skus_updated: [],
    has_more_data: false,
  };
};

export const pushResults: App["getPushResults"] = async (
  request: OperationResults
) => {
  logger.info(JSON.stringify(request, null, 2));
  return {
    status: OperationStatus.PENDING,
    cursor: "abc123",
    poll_after_seconds: 10,
  };
};
