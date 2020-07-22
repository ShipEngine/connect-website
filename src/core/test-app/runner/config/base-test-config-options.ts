export interface BaseTestConfigOptions {
  connectArgs?: object;
  debug?: boolean;
  expectedErrorMessage?: string;
  retries?: number;
  session?: object;
  skip?: boolean;
  timeout?: number;
}
