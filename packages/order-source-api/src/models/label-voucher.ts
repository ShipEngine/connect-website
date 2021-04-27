/** @description Represents information needed to leverage a third party Carrier API implementation */
export interface LabelVoucher {
  /** @description Base URL for the Carrier API implementation */
  url?: string;
  /** @description Token needed to authenticate with the Carrier API implementation */
  token?: string;
}
