import { FreightAppMetadata } from "@shipengine/connect-freight-api";
import { DEMO } from "./carriers/DEMO";

export const Metadata: FreightAppMetadata = {
  Id: "<%- _uuidv4 %>",
  Name: "<%- _appName %>",
  FreightCarriers: [DEMO],
};
