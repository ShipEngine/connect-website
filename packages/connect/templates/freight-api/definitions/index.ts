import { FreightAppMetadata } from "@shipengine/connect-freight-api";
import { DEMO } from "./carriers/DEMO";

export const Metadata: FreightAppMetadata = {
  Id: "<%- _appId %>",
  Name: "<%- _appName %>",
  FreightCarriers: [DEMO],
};
