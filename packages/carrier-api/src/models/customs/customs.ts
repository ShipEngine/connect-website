import { CustomsContentTypes } from "./customs-content-types";
import { CustomsNonDelivery } from "./customs-non-delivery";
import { CustomsItem } from "./customs-item";

export interface Customs {
  contents?: CustomsContentTypes;
  non_delivery?: CustomsNonDelivery;
  customs_items: CustomsItem[];
}
