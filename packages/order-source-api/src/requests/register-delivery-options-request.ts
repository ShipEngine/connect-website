import { RequestBase } from './request-base';

/** @description A request to register delivery options with an order source */
export interface RegisterDeliveryOptionsRequest extends RequestBase {
  /** @description Callback url to register with the order source*/
  callback_url: string;
  /**
  @description Key to be returned in delivery options calls from the order source. This could be a GUID that is defined by the caller of the OrderSourceAPI and returned by the order source in later calls
  @example 2bf64723-e43b-4d0f-9048-6ef0e359fe60
  */
  marketplace_key: string;
  /** @description Option set identifier to be returned in delivery options calls from the order source*/
  option_key: string;
}
