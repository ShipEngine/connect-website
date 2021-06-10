import { Method } from "./method";

export interface Route {
  path: string;
  method: Method;
  handler?: (req: any) => any | Promise<any>;
}
