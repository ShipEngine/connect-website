import { Dimensions } from "./dimensions";
import { Weight } from "./weight";

export interface Container {
  /**
   * The container/packaging code for this container
   */
  code: string;
  /**
   * NMFC freight class
   */
  freight_class:
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
   * NMFC commodity code / item number
   */
  nmfc_code?: number;
  /**
   * The description of the item(s) in this container
   */
  description: string;
  dimensions: Dimensions;
  weight: Weight;
  quantity: number;
  stackable: boolean;
}
