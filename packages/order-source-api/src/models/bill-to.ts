import { Address } from "./address";

export interface BillTo extends Address {
  email?: string;
}
