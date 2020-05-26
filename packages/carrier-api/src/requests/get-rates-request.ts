import {
  AdvancedShippingOptions,
  Confirmation,
  Customs,
  FulfillmentPlanDetails,
  InsuranceProvider,
  Currency,
  Package,
  Address
} from '../models';

export interface GetRatesRequest {
  /**
   * This is a schemaless object. It is for open ended customizations unique to particular
   * carriers. The documented keys are some common options shared by many carriers, but are
   * not definitive. Advanced options you support will be defined in ShipEngine. If the field
   * is absent it should be interpreted as the default value for any applicable options, e.g.
   * false for booleans.
   */
  advanced_options?: null | AdvancedShippingOptions;
  /**
   * The expected delivery confirmation. If the field is absent it should be interpreted as
   * "None".
   */
  confirmation?: Confirmation | null;
  /**
   * This model represents the customs declarations of a shipment.
   */
  customs?: null | Customs;
  /**
   * This model contains information about the fulfillment plan.
   */
  fulfillment_plan_details?: null | FulfillmentPlanDetails;
  /**
   * The expected delivery confirmation. If the field is absent it should be interpreted as
   * "None".
   */
  insurance_provider?: InsuranceProvider | null;
  /**
   * The total insured value of the shipment. The currency is defined by the end user of
   * ShipEngine. If the field is absent it should be interpeted as zero value.
   */
  insured_value?: Currency;
  /**
   * Whether this shipment uses a shipping service that is defined as international.
   */
  international?: boolean | null;
  /**
   * Whether this package ships from a residential address. If the field is absent it should
   * be interpreted as false.
   */
  is_residential: boolean;
  /**
   * Whether this label is to return a previously shipped package. If the field is absent it
   * should be interpreted as false.
   */
  is_return_label: boolean;
  /**
   * This is an optional schemaless object that you may return with a successful response.
   * Anything returned under this key will be included in all future requests. For example,
   * you may store additional static properties about the end user or their connection to the
   * carrier. The maximum storage size for data under this key is 4KB.
   */
  metadata?: { [key: string]: any } | null;
  /**
   * Whether this shipment is expected to use a next day service class. If the field is absent
   * it should be interpreted as false
   */
  next_day?: boolean | null;
  /**
   * All the packages that make up this shipment. There will always be at least one package
   * defined.
   */
  packages: Package[];
  /**
   * The service code uniquely identifies a shipping service that you offer. Which service
   * codes can be passed to you will be configured in ShipEngine. If you don't use service
   * codes this field won't be present.
   */
  service_code?: null | string;
  /**
   * When the package is expected to ship. Not guaranteed to be in the future. Formatted per
   * the https://tools.ietf.org/html/rfc3339 spec. Will always be in UTC.
   */
  ship_datetime: string;
  /**
   * The shipment sender's address. It may or may not have been validated.
   */
  ship_from: null | Address;
  /**
   * The shipment recipient's address. It may or may not have been validated.
   */
  ship_to: null | Address;
  /**
   * The transaction ID uniquely represents this request. If the request is retried then this
   * transaction ID will be the same. You should only perform the requested action once per
   * given transaction ID.
   */
  transaction_id: string;
}
