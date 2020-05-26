import { 
  Currency,
  Download
} from "../models";

export interface CreateLabelResponse {
  /**
   * The shipping provider specific id for the creation of this label.
   */
  carrier_transaction_id?: null | string;
  /**
   * The estimated date and time for when the shipment will be delivered. Formatted per the
   * https://tools.ietf.org/html/rfc3339 spec.
   */
  estimated_delivery_datetime?: null | string;
  /**
   * This provides any additional forms that go with the label. For example, customs forms.
   * Exactly one of the keys should be populated. Set href is the forms should be downloaded
   * separately. Set form_data if the forms are returend directly in the response.
   */
  form_download?: null | Download;
  /**
   * The total cost to insure the package(s) in this request.
   */
  insurance_amount?: Currency;
  /**
   * This object provides the requested label that was just created. Exactly one of the keys
   * should be populated. Set href if the label should be downloaded separately. Set
   * label_data if the label is returned directly in the response.
   */
  label_download: Download;
  /**
   * The total cost to ship the package(s) in this request.
   */
  shipping_amount?: Currency;
  /**
   * Whether this shipment can be tracked.
   */
  trackable?: boolean | null;
  /**
   * The carrier specific tracking identifier for this shipment.
   */
  tracking_number?: null | string;
  /**
   * The transaction ID uniquely represents this request. If the request is retried then this
   * transaction ID will be the same. You should only perform the requested action once per
   * given transaction ID.
   */
  transaction_id: string;
}
