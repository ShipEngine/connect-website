import { customerPackaging } from "./customer";
import { fedExFlatRatePackaging } from "./fedex-flat-rate";
import { upsFlatRatePackaging } from "./ups-flat-rate";

export default [
  ...customerPackaging,
  ...fedExFlatRatePackaging,
  ...upsFlatRatePackaging
];
