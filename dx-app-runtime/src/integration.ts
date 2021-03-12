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
  mapTransaction
} from './mapping/functions';
import { CarrierApp } from '@shipengine/connect-sdk/lib/internal';
import logger from './util/logger';
import { NotSupported } from './errors';

export const register = async (app: CarrierApp, request: any) =>
{
  if (!app.connect) {
    throw new NotSupported('connect');
  }
  const transaction = mapTransaction(request);
  const dxRequest = mapRegisterRequest(request);
  await app.connect(transaction, dxRequest);
  return mapRegisterResponse(transaction);
};

export const getRates = async (app: CarrierApp, request: any) =>
{
  if (!app.rateShipment) {
    throw new NotSupported('rateShipment');
  }
  const transaction = mapTransaction(request);
  const dxRequest = mapGetRatesRequest(request);
  logger.info(dxRequest);
  const dxResponse = await app.rateShipment(transaction, dxRequest);
  logger.info(dxResponse);
  return mapGetRatesResponse(transaction, dxResponse);
};

export const createLabel = async (app: CarrierApp, request: any) =>
{
  if (!app.createShipment) {
    throw new NotSupported('createShipment');
  }
  const transaction = mapTransaction(request);
  const dxRequest = mapCreateLabelRequest(request);
  logger.info(dxRequest);
  const dxResponse = await app.createShipment(transaction, dxRequest);
  logger.info(dxResponse);
  return mapCreateLabelResponse(transaction, dxResponse);
};

export const voidLabels = async (app: CarrierApp, request: any) =>
{
  if (!app.cancelShipments) {
    throw new NotSupported('cancelShipment');
  }
  const transaction = mapTransaction(request);
  const dxRequest = mapVoidLabelsRequest(request);
  logger.info(dxRequest);
  const dxResponse = await app.cancelShipments(transaction, dxRequest);
  logger.info(dxResponse);
  return mapVoidLabelsResponse(dxResponse, transaction);
};

export const createManifest = async (app: CarrierApp, request: any) =>
{
  if (!app.createManifest) {
    throw new NotSupported('createManifest');
  }
  const transaction = mapTransaction(request);
  const dxRequest = mapCreateManifestRequest(request);
  logger.info(dxRequest);
  const dxResponse = await app.createManifest(transaction, dxRequest);
  logger.info(dxResponse);
  return mapCreateManifestResponse(dxResponse, transaction);
};

export const track = async (app: CarrierApp, request: any) =>
{
  if (!app.trackShipment) {
    throw new NotSupported('track');
  }
  const transaction = mapTransaction(request);
  const dxRequest = mapTrackingRequest(request);
  logger.info(dxRequest);
  const dxResponse = await app.trackShipment(transaction, dxRequest);
  logger.info(dxResponse);
  return mapTrackingResponse(dxResponse, transaction);
};


export const schedulePickup = async (app: CarrierApp, request: any) =>
{
  if (!app.schedulePickup) {
    throw new NotSupported('schedulePickup');
  }
  const transaction = mapTransaction(request);
  const dxRequest = mapSchedulePickupRequest(request);
  logger.info(dxRequest);
  const dxResponse = await app.schedulePickup(transaction, dxRequest);
  logger.info(dxResponse);
  return mapSchedulePickupResponse(dxResponse, transaction);
};

export const cancelPickup = async (app: CarrierApp, request: any) =>
{
  if (!app.cancelPickups) {
    throw new NotSupported('cancelPickups');
  }
  const transaction = mapTransaction(request);
  const dxRequest = [mapCancelPickupRequest(request)];
  logger.info(dxRequest);
  const dxResponse = await app.cancelPickups(transaction, dxRequest);
  logger.info(dxResponse);
  return mapCancelPickupResponse(dxResponse[0], transaction);
};


