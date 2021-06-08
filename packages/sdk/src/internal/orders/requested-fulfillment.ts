import Joi = require("joi");
import { RequestedFulfillmentExtensions as IRequestedFulfillmentExtensions, RequestedFulfillmentPOJO } from "../../public/orders/requested-fulfillment";
import { _internal } from "../common";
import { AddressWithContactInfoAndPickupLocation } from "../common/addresses/address-with-contact-info-and-pickup-location";
import { SalesOrderItem } from "./sales-order-item";
import { ShippingPreferences } from "./shipping-preferences";
import { RequestedFulfillmentExtensions } from "./requested-fulfillment-extensions";

export class RequestedFulfillment {
  public static readonly [_internal] = {
    label: "requested fulfillment",
    schema: Joi.object({
      items: Joi.array().min(1).items(SalesOrderItem[_internal].schema.optional()).required(),
      shippingPreferences: ShippingPreferences[_internal].schema,
      shipTo: AddressWithContactInfoAndPickupLocation[_internal].schema.required(),
      extensions: RequestedFulfillmentExtensions[_internal].schema
    })
  };

  public readonly items: SalesOrderItem[];
  public readonly shippingPreferences: ShippingPreferences;
  public readonly shipTo: AddressWithContactInfoAndPickupLocation;
  public readonly extensions?: IRequestedFulfillmentExtensions;

  public constructor(pojo: RequestedFulfillmentPOJO) {
    this.items = pojo.items.map((item) => new SalesOrderItem(item));
    this.shippingPreferences = new ShippingPreferences(pojo.shippingPreferences || {});
    this.shipTo = new AddressWithContactInfoAndPickupLocation(pojo.shipTo);
    this.extensions = new RequestedFulfillmentExtensions(pojo.extensions || {});
  }
}
