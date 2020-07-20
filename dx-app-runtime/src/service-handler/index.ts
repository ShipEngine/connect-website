import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

const getShipstationHeaders = (headers: IncomingHttpHeaders): any => {
  return {
    Authorization: headers.authorization || "",
    "ShipStation-TransactionID": headers["shipstation-transactionid"] || "",
  };
};

const mapDxErrorToHttpStatusCode = (errorCode: string): number => {
  switch(errorCode) {
    case 'ERR_UNAUTHORIZED':
      return 401;
    case 'ERR_RATE_LIMIT':
      return 429;
    case 'ERR_EXTERNAL_SERVER_ERROR':
      return 520;
    default:
      return 400;
  }
};

const mapErrorToResponse = (response: Response, error: any) => {
  const errorCode = error.code || 'ERR_INVALID';
  const message = error.message || 'Module Error Occurred';
  const mappedError = {
    detailed_errors: [
      {
        standardized_error_code: "mapping_error",
        message: message,
        details: { stack: error.stack, ...error },
      },
    ],
  };
  response.status(mapDxErrorToHttpStatusCode(errorCode)).send(mappedError);
}

export default (implementation: any, request: Request, response: Response) => {
  if (typeof implementation !== "function") {
    response.status(404).send("Not Supported");
    return;
  }
  const { body, headers } = request;

  const relevantHeaders = getShipstationHeaders(headers);

  const dxApp = request.app.locals.app;
  implementation(dxApp, body, relevantHeaders)
    .then((result: any) => response.send(result))
    .catch((error: any) => mapErrorToResponse(response, error));
};
