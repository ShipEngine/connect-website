import {
  InventoryApp,
  InventoryAppDefinition,
} from "@shipengine/connect-inventory-api";
import * as handlers from "./handlers";
import { sampleMetadata } from "./metadata";

const appDefinition: InventoryAppDefinition = {
  metadata: sampleMetadata,
  fetchInventoryFull: handlers.fetchFull,
  fetchInventoryPartial: handlers.fetchPartial,
  fetchInventoryDelta: handlers.fetchDelta,
  getFetchResults: handlers.fetchResults,
  pushInventory: handlers.push,
  getPushResults: handlers.pushResults,
};

export default new InventoryApp(appDefinition);
