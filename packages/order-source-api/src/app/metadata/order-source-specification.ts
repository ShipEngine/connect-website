import {
  AccountConnectionSpecification,
  AccountConnectionSpecificationSchema,
} from './account-connection-specification';
import { existsSync } from 'fs';
import Joi from 'joi';

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

const fileExists = (value: string, helpers: any) => {
  if (existsSync(value)) {
    return value;
  }
  throw new Error("the file doesn't exist");
};

export const OrderSourceDefinitionSchema = Joi.object({
  Id: Joi.string()
    .uuid({ version: ['uuidv4'] })
    .required(),
  Name: Joi.string().required(),
  SendEmail: Joi.bool().strict().required(),
  HasCustomMappings: Joi.bool().strict().required(),
  CanRefresh: Joi.bool().strict().required(),
  CanLeaveFeedback: Joi.bool().strict().required(),
  CanConfirmShipments: Joi.bool().strict().required(),
  IsRefreshDisabled: Joi.bool().strict().optional(),
  HasCustomStatuses: Joi.bool().strict().optional(),
  HasInventoryLevels: Joi.bool().strict().optional(),
  AccountConnection: AccountConnectionSpecificationSchema.required(),
  Images: Joi.object({
    Icon: Joi.string()
      .required()
      .custom(fileExists, 'icon exists')
      .pattern(new RegExp('^.*.(svg)$'))
      .message('Images.Icon must be a svg file.'),
    Logo: Joi.string()
      .required()
      .custom(fileExists, 'logo exists')
      .pattern(new RegExp('^.*.(svg)$'))
      .message('Images.Logo must be a svg file.'),
  }).required(),
});
