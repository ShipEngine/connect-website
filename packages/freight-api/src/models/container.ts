import { Dimensions } from "./dimensions";
import { Weight } from "./weight";

export interface Container {
  /**
   * The container/packaging code for this container
   */
  code: string;
  /**
   * A standard published by the NMFTA, NMFC codes classify commodities for transport based on their characteristics: density, stowability, handling and liability.
   */
  classification:
    | 50
    | 55
    | 60
    | 65
    | 70
    | 77.5
    | 85
    | 92.5
    | 100
    | 110
    | 125
    | 150
    | 175
    | 200
    | 250
    | 300
    | 400
    | 500;
  /**
   * The description of the item(s) in this container
   */
  description: string;
  dimensions: Dimensions;
  weight: Weight;
  quantity: number;
  stackable: boolean;
}
