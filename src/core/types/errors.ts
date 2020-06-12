export interface NetworkError {
  message: string;
  error: Error;
}

export interface NetworkErrorCollection {
  statusCode: number;
  name: string;
  errors: NetworkError[];
}
