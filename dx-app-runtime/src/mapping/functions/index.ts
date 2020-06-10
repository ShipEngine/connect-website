/*export * as registerRequest from './mapping/register-request';
export * as registerResponse from './mapping/register-response';
export * as getRatesRequest from './mapping/get-rates-request';
export * as getRatesResponse from './mapping/get-rates-response';
export * as createLabelRequest from './mapping/create-label-request';
export * as createLabelResponse from './mapping/create-label-response';
export * as schedulePickupRequest from './mapping/schedule-pickup-request';
export * as schedulePickupResponse from './mapping/schedule-pickup-response';
export * as cancelPickupRequest from './mapping/cancel-pickup-request';
export * as cancelPickupResponse from './mapping/cancel-pickup-response';*/

import {CarrierApp} from "@shipengine/integration-platform-sdk";
import {TrackRequest, RegisterRequest, GetRatesRequest, CreateLabelRequest, VoidLabelsRequest, SchedulePickupRequest} from "@ipaas/capi/requests";
import {capiToDxTrack, dxToCapiTrack} from "./tracking";
import capiRequestToDxTransaction from "./transaction";
import capiToDxTransaction from './register-request';
import { mapGetRatesRequestToRateCriteriaPOJO } from './get-rates-request';
import { mapRatePOJOToGetRatesResponse } from './get-rates-response';
import dxToCapiRegisterResponse from './register-response';
import {TrackResponse, RegisterResponse, GetRatesResponse, CreateLabelResponse, VoidLabelsResponse, SchedulePickupResponse} from "@ipaas/capi/responses";
import { BasicAuth } from "../../basic-auth";
import { mapCreateLabelRequestToNewShipmentPOJO } from "./create-label-request";
import { mapShipmentConfirmationPOJOToCreateLabelResponse } from "./create-label-response";
import { mapVoidLabelsRequestToCancelShipmentsPOJO } from "./void-labels-request";
import { mapShipmentCancellationOutcomeToVoidLabelsResponse } from "./void-labels-response";
import { mapSchedulePickupRequestToPickupRequestPOJO } from "./schedule-pickup-request";
import { mapPickupConfirmationPOJOToSchedulePickupResponse } from "./schedule-pickup-response";
import { EndpointNotSupportedError } from "../../errors";

export const handleTrackingRequest = async (app: CarrierApp, request: TrackRequest, auth: BasicAuth): Promise<TrackResponse> => {
    if(!app.trackShipment){
        throw new EndpointNotSupportedError('trackShipment');
    }

    const dxTracking = capiToDxTrack(request);
    const transaction = capiRequestToDxTransaction(request, auth);
    const trackingInfo = await app.trackShipment(transaction, dxTracking);
    return dxToCapiTrack(trackingInfo, transaction);
}

export const handleRegisterRequest = async (app: CarrierApp, request: RegisterRequest): Promise<RegisterResponse> => {
    if(!app.connect) {
        throw new EndpointNotSupportedError('connect');
    }
    const transaction = capiToDxTransaction(request);
    await app.connect(transaction, request.registration_info);
    return dxToCapiRegisterResponse(transaction);
}

export const handleGetRatesRequest = async (app: CarrierApp, request: GetRatesRequest, auth: BasicAuth): Promise<GetRatesResponse> => {
    if(!app.rateShipment) {
        throw new EndpointNotSupportedError('rateShipment');
    }
    const transaction = capiRequestToDxTransaction(request, auth);
    const dxRequest = mapGetRatesRequestToRateCriteriaPOJO(request);
    const dxResponse = await app.rateShipment(transaction, dxRequest);
    const response = mapRatePOJOToGetRatesResponse(transaction, dxResponse);
    return response;
}

export const handleCreateLabelRequest = async (app: CarrierApp, request: CreateLabelRequest, auth: BasicAuth): Promise<CreateLabelResponse> => {
    if(!app.createShipment) {
        throw new EndpointNotSupportedError('createShipment');
    }
    const transaction = capiRequestToDxTransaction(request, auth);
    const dxRequest = mapCreateLabelRequestToNewShipmentPOJO(request);
    const dxResponse = await app.createShipment(transaction, dxRequest);
    const response = mapShipmentConfirmationPOJOToCreateLabelResponse(transaction, dxResponse);
    return response;
}

export const handleVoidLabelsRequest = async (app: CarrierApp, request: VoidLabelsRequest, auth: BasicAuth): Promise<VoidLabelsResponse> => {
    if(!app.cancelShipments) {
        throw new EndpointNotSupportedError('cancelShipments');
    }
    const transaction = capiRequestToDxTransaction(request, auth);
    const dxRequest = mapVoidLabelsRequestToCancelShipmentsPOJO(request);
    const dxResponse = await app.cancelShipments(transaction, dxRequest);
    const response = mapShipmentCancellationOutcomeToVoidLabelsResponse(dxResponse, transaction);
    return response;
}

export const handleSchedulePickupRequest = async (app: CarrierApp, request: SchedulePickupRequest, auth: BasicAuth): Promise<SchedulePickupResponse> => {
    if(!app.schedulePickup) {
        throw new EndpointNotSupportedError('schedulePickup');
    }
    const transaction = capiRequestToDxTransaction(request, auth);
    const dxRequest = mapSchedulePickupRequestToPickupRequestPOJO(request);
    const dxResponse = await app.schedulePickup(transaction, dxRequest);
    const response = mapPickupConfirmationPOJOToSchedulePickupResponse(dxResponse, transaction);
    return response;
}
