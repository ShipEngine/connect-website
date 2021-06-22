import { Carrier } from './carrier';

export interface CarrierAppMetadata {
  /** @description Id of the carrier app */
  Id: string;
  /** @description Name of the carrier */
  Name: string;
  /** @description List of carriers for the app */
  Carriers: Carrier[];
}
