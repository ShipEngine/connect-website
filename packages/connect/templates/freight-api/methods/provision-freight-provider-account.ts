import { ProvisionFreightProviderAccountRequest, ProvisionFreightProviderAccountResponse } from "@shipengine/connect-freight-api";
import { logger, NotImplementedError } from "@shipengine/connect-runtime";

const mapRequest = (request: ProvisionFreightProviderAccountRequest): any => { throw new NotImplementedError(); };
const callApi = async (request: any): Promise<any> => { throw new NotImplementedError(); };
const mapResponse = (response: any): ProvisionFreightProviderAccountResponse => { throw new NotImplementedError(); };

export const ProvisionFreightProviderAccount = async (request: ProvisionFreightProviderAccountRequest): Promise<ProvisionFreightProviderAccountResponse> => {
    logger.info("This is a log that I can find using the `connect logs` command after publishing.")
    const thirdPartyRequest = mapRequest(request);
    const response = await callApi(thirdPartyRequest);
    const mappedResponse = mapResponse(response);
    return mappedResponse;
}
