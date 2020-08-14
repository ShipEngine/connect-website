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

const handleFunctionCall = async (
  name: string,
  request: any,
  implementation: any,
  requestMapper: any,
  responseMapper: any,
  log: boolean = true
  ) => {
  if (!implementation) {
    throw new NotSupported(name);
  }
  const transaction = mapTransaction(request);
  const dxRequest = requestMapper(request);
  if (log) {
    logger.info(dxRequest);
  }
  const dxResponse = implementation(transaction, dxRequest);
  if (log) {
    logger.info(dxResponse);
  }
  return responseMapper(dxResponse, transaction);
}

export const register = async (app: CarrierApp, request: any) =>
  handleFunctionCall(
    'connect',
    request,
    app.connect,
    mapRegisterRequest,
    mapRegisterResponse,
    false // Setting log to false so we don't log secrets
  );

export const getRates = async (app: CarrierApp, request: any) =>
  handleFunctionCall(
    'rateShipment',
    request,
    app.rateShipment,
    mapGetRatesRequest,
    mapGetRatesResponse
  );

export const createLabel = async (app: CarrierApp, request: any) =>
  handleFunctionCall(
    'createShipment',
    request,
    app.createShipment,
    mapCreateLabelRequest,
    mapCreateLabelResponse
  );

export const voidLabels = async (app: CarrierApp, request: any) =>
  handleFunctionCall(
    'cancelShipments',
    request,
    app.cancelShipments,
    mapVoidLabelsRequest,
    mapVoidLabelsResponse
  );

export const createManifest = async (app: CarrierApp, request: any) =>
  handleFunctionCall(
    'createManifest',
    request,
    app.createManifest,
    mapCreateManifestRequest,
    mapCreateManifestResponse
  );

export const track = async (app: CarrierApp, request: any) =>
  handleFunctionCall(
    'trackShipment',
    request,
    app.trackShipment,
    mapTrackingRequest,
    mapTrackingResponse
  );


export const schedulePickup = async (app: CarrierApp, request: any) =>
  handleFunctionCall(
    'schedulePickup',
    request,
    app.schedulePickup,
    mapSchedulePickupRequest,
    mapSchedulePickupResponse
  );

export const cancelPickup = async (app: CarrierApp, request: any) =>
handleFunctionCall(
  'cancelPickup',
  request,
  app.cancelPickups,
  mapCancelPickupRequest,
  mapCancelPickupResponse
);


