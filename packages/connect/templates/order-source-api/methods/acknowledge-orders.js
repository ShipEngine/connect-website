const { logger, NotImplementedError } = require("@shipengine/connect-runtime");

const mapRequest = (request) => { throw new NotImplementedError(); };
const callApi = async (request) => { throw new NotImplementedError(); };
const mapResponse = (response) => { throw new NotImplementedError(); };

module.exports.AcknowledgeOrders = async (request) => {
    logger.info('This is a log that I can find using the `connect logs` command after publishing.')
    const thirdPartyRequest = mapRequest(request);
    const response = await callApi(thirdPartyRequest);
    const mappedResponse = mapResponse(response);
    return mappedResponse;
}
