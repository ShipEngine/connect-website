import { CustomsContentTypes } from "./customs-content-types";
import { CustomsNonDelivery } from "./customs-non-delivery";
import { CustomsItem } from "./customs-item";
import { Currency } from "../currency";

export interface Customs {
  contents?: CustomsContentTypes;
  non_delivery?: CustomsNonDelivery;
  customs_items: CustomsItem[];
  buyer_shipping_amount_paid?: Currency;
  duties_paid?: Currency;
}
