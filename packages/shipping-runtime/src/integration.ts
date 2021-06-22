import {
  mapRegisterRequest,
  mapRegisterResponse,
  mapGetRatesRequest,
  mapGetRatesResponse,
  mapCreateLabelRequest,
  mapCreateLabelResponse,
  mapTrackingRequest,
  mapTrackingResponse,
  mapVoidLabelsRequest,
  mapVoidLabelsResponse,
  mapCreateManifestRequest,
  mapCreateManifestResponse,
  mapSchedulePickupRequest,
  mapSchedulePickupResponse,
  mapCancelPickupRequest,
  mapCancelPickupResponse,
  mapTransaction,
  HeaderArgs,
} from './mapping/functions';
import { CarrierApp } from '@shipengine/connect-sdk/lib/internal';
import logger from './util/logger';
import { NotSupported } from './errors';
import { configureScope } from '@sentry/node';

const setScope = (
  name: string,
  request: any,
  dxRequest: any,
  transaction: any,
) => {
  configureScope((scope) => {
    scope.setTransactionName(name);
    scope.setExtra('capi_request', JSON.stringify(request, null, 2));
    scope.setExtra('request', JSON.stringify(dxRequest, null, 2));
    scope.setExtra('transaction', JSON.stringify(transaction, null, 2));
  });
};

export const register = async (
  app: CarrierApp,
  request: any,
  headers: HeaderArgs,
) => {
  if (!app.connect) {
    throw new NotSupported('connect');
  }
  const transaction = mapTransaction(request, headers);
  const dxRequest = mapRegisterRequest(request);
  setScope('Register', request, dxRequest, transaction);
  await app.connect(transaction, dxRequest);
  return mapRegisterResponse(transaction);
};

export const getRates = async (
  app: CarrierApp,
  request: any,
  headers: HeaderArgs,
) => {
  if (!app.rateShipment) {
    throw new NotSupported('rateShipment');
  }
  const transaction = mapTransaction(request, headers);
  logger.debug(request);
  const dxRequest = mapGetRatesRequest(request);
  setScope('Get Rates', request, dxRequest, transaction);
  logger.debug(dxRequest);
  const dxResponse = await app.rateShipment(transaction, dxRequest);
  logger.debug(dxResponse);
  const response = mapGetRatesResponse(transaction, dxResponse);
  logger.debug(response);
  return response;
};

export const createLabel = async (
  app: CarrierApp,
  request: any,
  headers: HeaderArgs,
) => {
  if (!app.createShipment) {
    throw new NotSupported('createShipment');
  }
  const transaction = mapTransaction(request, headers);
  logger.debug(request);
  const dxRequest = mapCreateLabelRequest(request);
  setScope('Create Label', request, dxRequest, transaction);
  logger.debug(dxRequest);
  const dxResponse = await app.createShipment(transaction, dxRequest);
  logger.debug(dxResponse);
  const response = mapCreateLabelResponse(transaction, dxResponse);
  logger.debug(response);
  return response;
};

export const voidLabels = async (
  app: CarrierApp,
  request: any,
  headers: HeaderArgs,
) => {
  if (!app.cancelShipments) {
    throw new NotSupported('cancelShipment');
  }
  const transaction = mapTransaction(request, headers);
  logger.debug(request);
  const dxRequest = mapVoidLabelsRequest(request);
  setScope('Void Labels', request, dxRequest, transaction);
  logger.debug(dxRequest);
  const dxResponse = await app.cancelShipments(transaction, dxRequest);
  logger.debug(dxResponse);
  const response = mapVoidLabelsResponse(dxResponse, transaction);
  logger.debug(response);
  return response;
};

export const createManifest = async (
  app: CarrierApp,
  request: any,
  headers: HeaderArgs,
) => {
  if (!app.createManifest) {
    throw new NotSupported('createManifest');
  }
  const transaction = mapTransaction(request, headers);
  logger.debug(request);
  const dxRequest = mapCreateManifestRequest(request);
  setScope('Create Manifest', request, dxRequest, transaction);
  logger.debug(dxRequest);
  const dxResponse = await app.createManifest(transaction, dxRequest);
  logger.debug(dxResponse);
  const response = mapCreateManifestResponse(dxResponse, transaction);
  logger.debug(response);
  return response;
};

export const track = async (
  app: CarrierApp,
  request: any,
  headers: HeaderArgs,
) => {
  if (!app.trackShipment) {
    throw new NotSupported('track');
  }
  const transaction = mapTransaction(request, headers);
  logger.debug(request);
  const dxRequest = mapTrackingRequest(request);
  logger.debug(dxRequest);
  setScope('Track', request, dxRequest, transaction);
  const dxResponse = await app.trackShipment(transaction, dxRequest);
  logger.debug(dxResponse);
  const response = mapTrackingResponse(dxResponse, transaction);
  logger.debug(response);
  return response;
};

export const schedulePickup = async (
  app: CarrierApp,
  request: any,
  headers: HeaderArgs,
) => {
  if (!app.schedulePickup) {
    throw new NotSupported('schedulePickup');
  }
  const transaction = mapTransaction(request, headers);
  const dxRequest = mapSchedulePickupRequest(request);
  logger.debug(dxRequest);
  setScope('Schedule Pickup', request, dxRequest, transaction);
  const dxResponse = await app.schedulePickup(transaction, dxRequest);
  logger.debug(dxResponse);
  return mapSchedulePickupResponse(dxResponse, transaction);
};

export const cancelPickup = async (
  app: CarrierApp,
  request: any,
  headers: HeaderArgs,
) => {
  if (!app.cancelPickups) {
    throw new NotSupported('cancelPickups');
  }
  const transaction = mapTransaction(request, headers);
  logger.debug(request);
  const dxRequest = [mapCancelPickupRequest(request)];
  logger.debug(dxRequest);
  setScope('Cancel Pickup', request, dxRequest, transaction);
  const dxResponse = await app.cancelPickups(transaction, dxRequest);
  logger.debug(dxResponse);
  const response = mapCancelPickupResponse(dxResponse[0], transaction);
  logger.debug(response);
  return response;
};
