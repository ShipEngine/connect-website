import { RegisterRequest, RegisterResponse} from "@shipengine/connect-carrier-api";
import { logger, NotImplementedError } from "@shipengine/connect-runtime";


const mapRequest = (request: RegisterRequest): any => { throw new NotImplementedError(); };
const callApi = async (request: any): Promise<any> => { throw new NotImplementedError(); };
const mapResponse = (response: any): RegisterResponse => { throw new NotImplementedError(); };

export const Register = async (request: RegisterRequest): Promise<RegisterResponse> => {
    logger.info('This is a log that I can find using the `connect logs` command after publishing.')
    const thirdPartyRequest = mapRequest(request);
    const response = await callApi(thirdPartyRequest);
    const mappedResponse = mapResponse(response);
    return mappedResponse;
}
