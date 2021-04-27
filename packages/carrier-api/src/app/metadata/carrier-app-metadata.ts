import { Carrier } from "./carrier";

export interface CarrierAppMetadata {
  Id: string;
  Name: string;
  Carriers: Carrier[];
}
