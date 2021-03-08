import { AddressWithContactInfoAndPickupLocationPOJO } from "../common/addresses/address-with-contact-info-and-pickup-location"
import { SalesOrderItem } from "./sales-order-item"
import { ShippingPreferences } from "./shipping-preferences"

export interface RequestedFulfillmentExtensions {
    customField1?: string;
    customField2?: string;
    customField3?: string;
} 

export interface RequestedFulfillmentPOJO {
    items: SalesOrderItem[];
    shippingPreferences: ShippingPreferences;
    shipTo: AddressWithContactInfoAndPickupLocationPOJO;
    extensions?: RequestedFulfillmentExtensions;
}
