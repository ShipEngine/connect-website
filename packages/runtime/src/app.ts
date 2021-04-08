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
  handler?: Function;
}

export interface App {
  routes: Route[];
  data: any;
  logo: string;
  icon: string;
}
