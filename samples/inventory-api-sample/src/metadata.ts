import {
  FetchType,
  InventoryAppMetadata,
} from "@shipengine/connect-inventory-api";

export const sampleMetadata: InventoryAppMetadata = {
  supportedFetchTypes: [FetchType.FULL, FetchType.PARTIAL],
  supportsInventoryPush: true,
};
