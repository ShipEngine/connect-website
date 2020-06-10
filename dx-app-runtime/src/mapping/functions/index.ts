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
import {TrackRequest, RegisterRequest, GetRatesRequest, CreateLabelRequest, VoidLabelsRequest} from "@ipaas/capi/requests";
import {capiToDxTrack, dxToCapiTrack} from "./tracking";
import capiRequestToDxTransaction from "./transaction";
import capiToDxTransaction from './register-request';
import { mapGetRatesRequestToRateCriteriaPOJO } from './get-rates-request';
import { mapRatePOJOToGetRatesResponse } from './get-rates-response';
import dxToCapiRegisterResponse from './register-response';
import {TrackResponse, RegisterResponse, GetRatesResponse, CreateLabelResponse, VoidLabelsResponse} from "@ipaas/capi/responses";
import { BasicAuth } from "../../basic-auth";
import { mapCreateLabelRequestToNewShipmentPOJO } from "./create-label-request";
import { mapShipmentConfirmationPOJOToCreateLabelResponse } from "./create-label-response";
import { mapVoidLabelsRequestToCancelShipmentsPOJO } from "./void-labels-request";
import { mapShipmentCancellationOutcomeToVoidLabelsResponse } from "./void-labels-response";

export const handleTrackingRequest = async (app: CarrierApp, request: TrackRequest, auth: BasicAuth): Promise<TrackResponse> => {
    if(!app.trackShipment){
        throw new Error(`${app.name} does not implement trackShipment`);
    }

    const dxTracking = capiToDxTrack(request);
    const transaction = capiRequestToDxTransaction(request, auth);
    const trackingInfo = await app.trackShipment(transaction, dxTracking);
    return dxToCapiTrack(trackingInfo, transaction);
}

export const handleRegisterRequest = async (app: CarrierApp, request: RegisterRequest): Promise<RegisterResponse> => {
    if(!app.connect) {
        throw new Error(`${app.name} does not implement connect`)
    }
    const transaction = capiToDxTransaction(request);
    await app.connect(transaction, request.registration_info);
    return dxToCapiRegisterResponse(transaction);
}

export const handleGetRatesRequest = async (app: CarrierApp, request: GetRatesRequest, auth: BasicAuth): Promise<GetRatesResponse> => {
    if(!app.rateShipment) {
        throw new Error(`${app.name} does not implement rateShipment`)
    }
    const transaction = capiRequestToDxTransaction(request, auth);
    const dxRequest = mapGetRatesRequestToRateCriteriaPOJO(request);
    const dxResponse = await app.rateShipment(transaction, dxRequest);
    const response = mapRatePOJOToGetRatesResponse(transaction, dxResponse);
    return response;
}

export const handleCreateLabelRequest = async (app: CarrierApp, request: CreateLabelRequest, auth: BasicAuth): Promise<CreateLabelResponse> => {
    if(!app.createShipment) {
        throw new Error(`${app.name} does not implement createShipment`);
    }
    const transaction = capiRequestToDxTransaction(request, auth);
    const dxRequest = mapCreateLabelRequestToNewShipmentPOJO(request);
    const dxResponse = await app.createShipment(transaction, dxRequest);
    const response = mapShipmentConfirmationPOJOToCreateLabelResponse(transaction, dxResponse);
    return response;
}

export const handleVoidLabelsRequest = async (app: CarrierApp, request: VoidLabelsRequest, auth: BasicAuth): Promise<VoidLabelsResponse> => {
    if(!app.cancelShipments) {
        throw new Error(`${app.name} does not implement cancelShipments`);
    }
    const transaction = capiRequestToDxTransaction(request, auth);
    const dxRequest = mapVoidLabelsRequestToCancelShipmentsPOJO(request);
    const dxResponse = await app.cancelShipments(transaction, dxRequest); // This needs to return a known type.
    const response = mapShipmentCancellationOutcomeToVoidLabelsResponse(dxResponse, transaction);
    return response;
}
