// import { MethodArgs } from "./method-args";

export default interface Test {
  // intentionally did not set the type to MethodArgs
  // Doing so created a type cascade with the generic type T
  methodArgs: any;
  debug?: boolean;
  expectedErrorMessage?: string;
  fn: any;
  retries?: number;
  skip?: boolean;
  timeout?: number;
  title: string;
}
