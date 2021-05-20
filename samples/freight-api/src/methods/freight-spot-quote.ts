import { FreightSpotQuoteRequest, FreightSpotQuoteResponse } from "@shipengine/connect-freight-api";
import { logger, NotImplementedError } from "@shipengine/connect-runtime";

const mapRequest = (request: FreightSpotQuoteRequest): any => { throw new NotImplementedError(); };
const callApi = async (request: any): Promise<any> => { throw new NotImplementedError(); };
const mapResponse = (response: any): FreightSpotQuoteResponse => { throw new NotImplementedError(); };

export const FreightSpotQuote = async (request: FreightSpotQuoteRequest): Promise<FreightSpotQuoteResponse> => {
    logger.info('This is a log that I can find using the `connect logs` command after publishing.')
    const thirdPartyRequest = mapRequest(request);
    const response = await callApi(thirdPartyRequest);
    const mappedResponse = mapResponse(response);
    return mappedResponse;
}
