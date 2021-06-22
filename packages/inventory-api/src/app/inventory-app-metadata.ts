export enum FetchType {
  FULL = 'full',
  DELTA = 'delta',
  PARTIAL = 'partial',
}

export type InventoryAppMetadata = {
  supportedFetchTypes: FetchType[];
  supportsInventoryPush: boolean;
};
