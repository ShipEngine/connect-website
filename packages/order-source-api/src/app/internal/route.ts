export enum Method {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export interface Route {
  path: string;
  method: Method;
  handler?: (req: Request) => any | Promise<any>;
}
