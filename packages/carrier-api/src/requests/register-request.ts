export interface RegisterRequest {
  /**
   * This is an optional schemaless object that you may return with a successful response.
   * Anything returned under this key will be included in all future requests. For example,
   * you may store additional static properties about the end user or their connection to the
   * carrier. The maximum storage size for data under this key is 4KB.
   */
  metadata?: { [key: string]: any } | null;
  /**
   * This is a schemaless object used to contain any required fields for validating a users
   * credentials or registering a new account. These fields will be custom to the shipping
   * service provider, and will be collected via a form and sent over as key value pairs.
   */
  registration_info: { [key: string]: any };
  /**
   * The transaction ID uniquely represents this request. If the request is retried then this
   * transaction ID will be the same. You should only perform the requested action once per
   * given transaction ID.
   */
  transaction_id: string;
  /**
   * This is an optional bit of information about the warehouse for the user who is making the
   * request.
   */
  warehouses?: Array<null | Warehouse> | null;
}

export interface Warehouse {
  /**
   * Indicates whether or not the warehouse is active.
   */
  active: boolean;
  bulkCopyBatchId?: null | string;
  bulkCopyRecordId?: null | string;
  canadaPostGroup?: null | string;
  /**
   * The date the warehouse was created in ShipEngine's system.
   */
  createDate: string;
  /**
   * Identifies whether or not this is the sellers primary warehouse.
   */
  default: boolean;
  dhlGmAccount?: null | string;
  extInventoryIdentity?: null | string;
  /**
   * The meter id for FedEx for this sellers warehouse.
   */
  fedExMeter?: null | string;
  inventoryStoreId?: number | null;
  isResidential: boolean;
  /**
   * The last date the warehouse was modified.
   */
  modifyDate?: null | string;
  /**
   * The name of the warehouse.
   */
  name?: null | string;
  originCity?: null | string;
  originCompany?: null | string;
  originCountryCode?: null | string;
  originName?: null | string;
  originPhone?: null | string;
  /**
   * The postal code for the warehouse.
   */
  originPostalCode?: null | string;
  /**
   * The origin state for the user.
   */
  originState?: null | string;
  originStreet1?: null | string;
  originStreet2?: null | string;
  originStreet3?: null | string;
  /**
   * The return city that should appear on returns to this warehouse.
   */
  returnCity?: null | string;
  /**
   * The company name that should appear on returns to this warehouse.
   */
  returnCompany?: null | string;
  /**
   * The return country code that should appear on returns to this warehouse. The codes are
   * specified by ISO 3166-1 alpha-2.
   */
  returnCountryCode?: null | string;
  /**
   * The name that should appear on returns to this warehouse.
   */
  returnName?: null | string;
  /**
   * The phone number that should appear on returns to this warehouse.
   */
  returnPhone?: null | string;
  /**
   * The return postal code that should appear on returns to this warehouse.
   */
  returnPostalCode?: null | string;
  /**
   * The return state that should appear on returns to this warehouse.
   */
  returnState?: null | string;
  /**
   * The return street address line 1 that should appear on returns to this warehouse.
   */
  returnStreet1?: null | string;
  /**
   * The return street address line 2 that should appear on returns to this warehouse.
   */
  returnStreet2?: null | string;
  /**
   * The return street address line 3 that should appear on returns to this warehouse.
   */
  returnStreet3?: null | string;
  royalMailHub?: null | string;
  /**
   * The ShipEngine specific Id for a seller.
   */
  sellerId: number;
  /**
   * The ShipEngine specific Id for a warehouse.
   */
  warehouseId: number;
}
