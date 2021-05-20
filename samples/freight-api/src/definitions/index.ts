import { FreightAppMetadata } from "@shipengine/connect-freight-api";
import { TFCA, TFCB } from "./carriers";

export const Metadata: FreightAppMetadata = {
  Id: "788981af-9cd3-4848-af5b-59bba743f0cd",
  Name: "Freight App Sample",
  FreightCarriers: [TFCA, TFCB],
};
