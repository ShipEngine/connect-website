import { FreightShipmentDocumentsRequest, FreightShipmentDocumentsResponse } from "@shipengine/connect-freight-api";
import { logger, NotImplementedError } from "@shipengine/connect-runtime";

const mapRequest = (request: FreightShipmentDocumentsRequest): any => { throw new NotImplementedError(); };
const callApi = async (request: any): Promise<any> => { throw new NotImplementedError(); };
const mapResponse = (response: any): FreightShipmentDocumentsResponse => { throw new NotImplementedError(); };

export const FreightShipmentDocuments = async (request: FreightShipmentDocumentsRequest): Promise<FreightShipmentDocumentsResponse> => {
    logger.info('This is a log that I can find using the `connect logs` command after publishing.')
    const thirdPartyRequest = mapRequest(request);
    const response = await callApi(thirdPartyRequest);
    const mappedResponse = mapResponse(response);
    return mappedResponse;
}
