import { SalesOrdersExportRequest, SalesOrdersExportResponse } from "@shipengine/connect-order-source-api";
import { logger, NotImplementedError } from "@shipengine/connect-runtime";

const mapRequest = (request: any): any => { throw new NotImplementedError(); };
const callApi = async (request: any): Promise<any> => { throw new NotImplementedError(); };
const mapResponse = (response: any): SalesOrdersExportResponse => { throw new NotImplementedError(); };

export const SalesOrdersExport = async (request: SalesOrdersExportRequest): Promise<SalesOrdersExportResponse> => {
    logger.info('This is a log that I can find using the `connect logs` command after publishing.')
    const thirdPartyRequest = mapRequest(request);
    const response = await callApi(thirdPartyRequest);
    const mappedResponse = mapResponse(response);
    return mappedResponse;
}
