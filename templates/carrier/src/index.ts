import { CarrierApp } from "@shipengine/integration-platform-sdk";
import { createLabel } from "./methods/create-label";
import { getRates } from "./methods/get-rates";

export const App: CarrierApp = {
  id: "",
  name: "<%- pjson.name %>",
  description: "<%- pjson.description %>",
  logo: "./logo.svg",
  websiteURL: "",
  createLabel: createLabel,
  getRates: getRates,
  deliveryServices: [],
};
