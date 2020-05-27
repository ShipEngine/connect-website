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
import {TrackRequest} from "@ipaas/capi/requests";
import {capiToDxTrack, dxToCapiTrack} from "./mapping/tracking";
import {capiRequestToDxTransaction} from "./mapping/transaction";
import {TrackResponse} from "@ipaas/capi/responses";

const handleTrackingRequest = async (app: CarrierApp, request: TrackRequest): Promise<TrackResponse> => {

    if(!app.trackShipment){
        throw new Error(`${app.name} does not implement trackShipment`);
    }

    const dxTracking = capiToDxTrack(request);
    const transaction = capiRequestToDxTransaction(request);
    const trackingInfo = await app.trackShipment(transaction, dxTracking);
    return dxToCapiTrack(trackingInfo);
}

export {handleTrackingRequest};