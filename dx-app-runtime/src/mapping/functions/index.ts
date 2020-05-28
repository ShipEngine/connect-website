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
import {TrackRequest, RegisterRequest} from "@ipaas/capi/requests";
import {capiToDxTrack, dxToCapiTrack} from "./tracking";
import {capiRequestToDxTransaction} from "./transaction";
import capiToDxTransaction from './register-request';
import dxToCapiRegisterResponse from './register-response';
import {TrackResponse, RegisterResponse} from "@ipaas/capi/responses";
import { BasicAuth } from "../../basic-auth";

const handleTrackingRequest = async (app: CarrierApp, request: TrackRequest, auth: BasicAuth): Promise<TrackResponse> => {
    if(!app.trackShipment){
        throw new Error(`${app.name} does not implement trackShipment`);
    }

    const dxTracking = capiToDxTrack(request);
    const transaction = capiRequestToDxTransaction(request, auth);
    const trackingInfo = await app.trackShipment(transaction, dxTracking);
    return dxToCapiTrack(trackingInfo, transaction);
}

const handleRegisterRequest = async (app: CarrierApp, request: RegisterRequest): Promise<RegisterResponse> => {
    if(!app.connect) {
        throw new Error(`${app.name} does not implement connect`)
    }
    const transaction = capiToDxTransaction(request);
    await app.connect(transaction, request.registration_info);
    return dxToCapiRegisterResponse(transaction);
}

export {
    handleTrackingRequest,
    handleRegisterRequest
};
