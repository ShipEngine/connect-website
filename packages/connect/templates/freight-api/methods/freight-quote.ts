import { FreightQuoteRequest, FreightQuoteResponse } from "@shipengine/connect-freight-api";
import { logger, NotImplementedError } from "@shipengine/connect-runtime";

const mapRequest = (request: FreightQuoteRequest): any => { throw new NotImplementedError(); };
const callApi = async (request: any): Promise<any> => { throw new NotImplementedError(); };
const mapResponse = (response: any): FreightQuoteResponse => { throw new NotImplementedError(); };

export const FreightQuote = async (request: FreightQuoteRequest): Promise<FreightQuoteResponse> => {
    logger.info("This is a log that I can find using the `connect logs` command after publishing.")
    const thirdPartyRequest = mapRequest(request);
    const response = await callApi(thirdPartyRequest);
    const mappedResponse = mapResponse(response);
    return mappedResponse;
}
