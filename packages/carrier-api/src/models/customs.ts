import { Currency } from './currency';

export interface Customs {
  /**
   * A user entered free form description of the shipment contents.
   */
  contents?:     null | string;
  customs_items: Array<null | CustomsItem>;
  /**
   * What to do if the shipment is undeliverable. If the field is absent the undeliverable
   * behavior is unspecified and should be defaulted per carrier.
   */
  non_delivery?: NonDelivery | null;
}

export enum NonDelivery {
  ReturnToSender = "return_to_sender",
  TreatAsAbandoned = "treat_as_abandoned",
}

export interface CustomsItem {
  /**
   * The user specified declared country of origin of this customs item.
   */
  country_of_origin?: null | string;
  /**
   * A user specified free form string describing this customs item. If the field is absent
   * the user has not specified a description.
   */
  description?: null | string;
  /**
   * The user specified Harmonized Tariff Code. See https://hts.usitc.gov/ for more
   * information.
   */
  harmonized_tariff_code?: null | string;
  /**
   * The user specified count of items in this declaration. This value may be zero.
   */
  quantity?: number | null;
  /**
   * The user specified SKU of this customs item. This field is completely free form.
   */
  sku?: null | string;
  /**
   * The user specified SKU description of this customs item. This field is completely free
   * form.
   */
  sku_description?: null | string;
  /**
   * The user specified declared customs value of this customs item. This value may be zero.
   */
  value?: Currency;
}
