/* eslint-disable camelcase */
export interface NetworkError {
  message: string;
  error: Error;
}

export interface NetworkErrorCollection {
  statusCode: number;
  name: string;
  errors: NetworkError[];
}

export interface ShipEngineAPIError {
  error_source: string;
  error_type: string;
  error_code: string;
  message: string;
}

export interface ShipEngineAPIErrorCollection {
  request_id: string;
  errors: ShipEngineAPIError[];
}
