import {Request, Response} from "express";
import {IncomingHttpHeaders} from "http";

const getShipstationHeaders = (headers: IncomingHttpHeaders): any => {
  return {
    'Authorization': headers.authorization || '',
    'ShipStation-TransactionID': headers['shipstation-transactionid'] || ''
  }
}


export default (implementation: any, request: Request, response: Response) => {
  if (typeof implementation !== 'function') {
    response.status(404).send('Not Supported');
    return;
  }
  const {body, headers} = request;

  const relevantHeaders = getShipstationHeaders(headers);

  const dxApp = request.app.locals.app;
  implementation(dxApp, body, relevantHeaders)
    .then((result: any) => response.send(result))
    .catch((error: any) => {
      const statusCode = error.statusCode || 520;
      const responseBody = error.body || error;
      response.status(statusCode).send(responseBody);
    })
};
