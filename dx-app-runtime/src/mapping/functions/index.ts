import { CarrierApp } from '@shipengine/integration-platform-sdk';
import {
  TrackRequest,
  RegisterRequest,
  GetRatesRequest,
  CreateLabelRequest,
  VoidLabelsRequest,
  SchedulePickupRequest,
  CancelPickupRequest,
} from '@ipaas/capi/requests';
import { capiToDxTrack, dxToCapiTrack } from './tracking';
import capiRequestToDxTransaction from './transaction';
import capiToDxTransaction from './register-request';
import { mapGetRatesRequestToRateCriteriaPOJO } from './get-rates-request';
import { mapRatePOJOToGetRatesResponse } from './get-rates-response';
import dxToCapiRegisterResponse from './register-response';
import {
  TrackResponse,
  RegisterResponse,
  GetRatesResponse,
  CreateLabelResponse,
  VoidLabelsResponse,
  SchedulePickupResponse,
  CancelPickupResponse,
} from '@ipaas/capi/responses';
import { mapCreateLabelRequestToNewShipmentPOJO } from './create-label-request';
import { mapShipmentConfirmationPOJOToCreateLabelResponse } from './create-label-response';
import { mapVoidLabelsRequestToCancelShipmentsPOJO } from './void-labels-request';
import { mapShipmentCancellationOutcomeToVoidLabelsResponse } from './void-labels-response';
import { mapSchedulePickupRequestToPickupRequestPOJO } from './schedule-pickup-request';
import { mapPickupConfirmationPOJOToSchedulePickupResponse } from './schedule-pickup-response';
import { NotSupported } from '../../errors';
import { mapCancelPickupRequestToPickupCancellationPOJO } from './cancel-pickup-request';
import { mapPickupCancellationOutcomePOJOToCancelPickupResponse } from './cancel-pickup-response';

export const handleTrackingRequest = async (
  app: CarrierApp,
  request: TrackRequest
): Promise<TrackResponse> => {
  if (!app.trackShipment) {
    throw new NotSupported('trackShipment');
  }

  const dxTracking = capiToDxTrack(request);
  const transaction = capiRequestToDxTransaction(request);
  const trackingInfo = await app.trackShipment(transaction, dxTracking);
  return dxToCapiTrack(trackingInfo, transaction);
};

export const handleRegisterRequest = async (
  app: CarrierApp,
  request: RegisterRequest
): Promise<RegisterResponse> => {
  if (!app.connect) {
    throw new NotSupported('connect');
  }
  const transaction = capiToDxTransaction(request);
  await app.connect(transaction, request.registration_info);
  return dxToCapiRegisterResponse(transaction);
};

export const handleGetRatesRequest = async (
  app: CarrierApp,
  request: GetRatesRequest
): Promise<GetRatesResponse> => {
  if (!app.rateShipment) {
    throw new NotSupported('rateShipment');
  }
  const transaction = capiRequestToDxTransaction(request);
  const dxRequest = mapGetRatesRequestToRateCriteriaPOJO(request);
  const dxResponse = await app.rateShipment(transaction, dxRequest);
  const response = mapRatePOJOToGetRatesResponse(transaction, dxResponse);
  return response;
};

export const handleCreateLabelRequest = async (
  app: CarrierApp,
  request: CreateLabelRequest
): Promise<CreateLabelResponse> => {
  if (!app.createShipment) {
    throw new NotSupported('createShipment');
  }
  try {
    const transaction = capiRequestToDxTransaction(request);
    const dxRequest = mapCreateLabelRequestToNewShipmentPOJO(request);
    const dxResponse = await app.createShipment(transaction, dxRequest);
    const response = mapShipmentConfirmationPOJOToCreateLabelResponse(
      transaction,
      dxResponse
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const handleVoidLabelsRequest = async (
  app: CarrierApp,
  request: VoidLabelsRequest
): Promise<VoidLabelsResponse> => {
  if (!app.cancelShipments) {
    throw new NotSupported('cancelShipments');
  }
  const transaction = capiRequestToDxTransaction(request);
  const dxRequest = mapVoidLabelsRequestToCancelShipmentsPOJO(request);
  const dxResponse = await app.cancelShipments(transaction, dxRequest);
  const response = mapShipmentCancellationOutcomeToVoidLabelsResponse(
    dxResponse,
    transaction
  );
  return response;
};

export const handleSchedulePickupRequest = async (
  app: CarrierApp,
  request: SchedulePickupRequest
): Promise<SchedulePickupResponse> => {
  if (!app.schedulePickup) {
    throw new NotSupported('schedulePickup');
  }
  const transaction = capiRequestToDxTransaction(request);
  const dxRequest = mapSchedulePickupRequestToPickupRequestPOJO(request);
  const dxResponse = await app.schedulePickup(transaction, dxRequest);
  const response = mapPickupConfirmationPOJOToSchedulePickupResponse(
    dxResponse,
    transaction
  );
  return response;
};

export const handleCancelPickupRequest = async (
  app: CarrierApp,
  request: CancelPickupRequest
): Promise<CancelPickupResponse> => {
  if (!app.cancelPickups) {
    throw new NotSupported('cancelPickup');
  }
  const transaction = capiRequestToDxTransaction(request);
  const dxRequest = mapCancelPickupRequestToPickupCancellationPOJO(request);
  const dxResponse = await app.cancelPickups(transaction, [dxRequest]);
  const response = mapPickupCancellationOutcomePOJOToCancelPickupResponse(
    dxResponse[0],
    transaction
  );
  return response;
};
