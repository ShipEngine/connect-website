import { AccountConnectionSpecification } from "./account-connection-specification";

/** @description This represents a single branded order source within our system */
export interface OrderSourceDefinition {
  /** @description This is a unique GUID identifier for this order source */
  Id: string;
  /** @description The branded name for this order source @example "Shopify", "eBay", "Amazon" */
  Name: string;
  /** @description Indicates whether or not our system is allowed to send emails to customers */
  SendEmail: boolean;
  /** @description Indicates whether or not this marketplace allows custom mappings */
  HasCustomMappings: boolean;
  /** @description Indicates whether or not orders can be refreshed */
  CanRefresh: boolean;
  /** @description Indicates whether or not the order source allows sellers to leave feedback on customers */
  CanLeaveFeedback: boolean;
  /** @description Indicates whether or not the order source can confirm an order has been shipped */
  CanConfirmShipments: boolean;
  /** @description Indicates that refreshing is disabled within our platform */
  IsRefreshDisabled?: boolean;
  /** @description Indicates whether this order source allows for custom statuses on a seller by seller basis */
  HasCustomStatuses: boolean;
  /** @description Indicates whether or not a user is allowed to configure their own timezone */
  CanConfigureTimeZone: boolean;
  /** @description Indicates whether or not the order source has inventory levels */
  HasInventoryLevels?: boolean;
  /** @description Specifies account connection information */
  AccountConnection: AccountConnectionSpecification;
  /** @description Images that will be used for this branded order source */
  Images: {
    /** @description The full path to the logo used in modals and other areas of our platform for this order source. Use join(__dirname, '../assets/logo.svg') @example "/dev/integration/assets/ordersource1/logo.svg" */
    Logo: string;
    /** @description The full path to the icon used for this order source. Use join(__dirname, '../assets/logo.svg') @example "/dev/integration/assets/ordersource1/icon.svg" */
    Icon: string;
  };
}
