import { ScheduleFreightPickupRequest, ScheduleFreightPickupResponse } from "@shipengine/connect-freight-api";
import { logger, NotImplementedError } from "@shipengine/connect-runtime";

const mapRequest = (request: ScheduleFreightPickupRequest): any => { throw new NotImplementedError(); };
const callApi = async (request: any): Promise<any> => { throw new NotImplementedError(); };
const mapResponse = (response: any): ScheduleFreightPickupResponse => { throw new NotImplementedError(); };

export const ScheduleFreightPickup = async (request: ScheduleFreightPickupRequest): Promise<ScheduleFreightPickupResponse> => {
    logger.info("This is a log that I can find using the `connect logs` command after publishing.")
    const thirdPartyRequest = mapRequest(request);
    const response = await callApi(thirdPartyRequest);
    const mappedResponse = mapResponse(response);
    return mappedResponse;
}
