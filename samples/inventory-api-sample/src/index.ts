import {
  InventoryApp,
  InventoryAppDefinition,
} from "@shipengine/connect-inventory-api";
import * as handlers from "./app";
import { sampleMetadata } from "./metadata";

const appDefinition: InventoryAppDefinition = {
  metadata: sampleMetadata,
  startFetch: handlers.startFetch,
  getFetchResults: handlers.fetchResults,
  startPush: handlers.startPush,
  getPushResults: handlers.pushResults,
};

export default new InventoryApp(appDefinition);
