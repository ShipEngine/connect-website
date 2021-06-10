/**
 * Common / shared properties for all `InventoryItems`, regardless of whether
 * serializing to return to a client, or receiving from a client for pushing.
 */
export type InventoryItemBase = {
  /** Merchant-supplied identifier for the product or item */
  sku: string;
  /** Unique identifier for the inventory record in the source system. This may be the same as `sku`. */
  integration_entity_id: string;
  /** Time stamp indicating when the current values were fetched from the source system. */
  fetched_at: Date;
  /** Time stamp indicating when the current inventory values changed in the source system */
  updated_at?: Date;
  /** Stock available to sell – generally this is `onhand` minus `committed` */
  available_quantity: number;
  /** Stock allocated to specific orders for fulfillment – this will be less than `onhand` */
  allocated_quantity?: number;
  /** Stock that is physically present in a location, regardless of commitment / allocation */
  onhand_quantity?: number;
  /** The total stock quantity needed to fulfill all pending orders */
  committed_quantity?: number;
};

/**
 * Stock quantities fetched from 3rd-party inventory providers may have some useful
 * "location" or "warehouse" information. When present, these values should be preserved
 * and included as `warehouse_id` when returning serialized `InventoryItems` to the client.
 */
export type InventoryFetchItem = InventoryItemBase & {
  /** A unique identifier in the source system for the physical location of a quantity of stock  */
  warehouse_id?: string;
};
