import { Address } from '../models/address';
import { Label } from '../models/label';
import { AdvancedShippingOptions } from '../models/advanced-shipping-options';

export interface CreateManifestRequest {
    /**
     * The transaction ID uniquely represents this request. If the request is retried then this
     * transaction ID will be the same. You should only perform the requested action once per
     * given transaction ID.
     */
    transaction_id: string;
    /**
   * This is an optional schemaless object that you may return with a successful response.
   * Anything returned under this key will be included in all future requests. For example,
   * you may store additional static properties about the end user or their connection to the
   * carrier. The maximum storage size for data under this key is 4KB.
   */
    metadata?: { [key: string]: any } | null;
    /**
     * The shipment sender's address. It may or may not have been validated.
     */
    ship_from: Address;
    /**
     * The labels to include in the manifest. There should be at least one label included in a manifest.
     */
    included_labels: Label[];
    /**
     * The labels to exclude from the manifest.
     */
    excluded_labels: Label[];
    /**
     * The date and time of the earliest shipment being manifested. Formatted per the https://tools.ietf.org/html/rfc3339 spec
     */
    open_datetime: string | null;
    /**
     * The date and time of the last shipment being manifested. Formatted per the https://tools.ietf.org/html/rfc3339 spec
     */
    close_datetime: string;
    /**
     * This is a schemaless object. This is a join of all of the advanced options for all of the shipments being manifested. It is for open ended customizations unique to particular carriers. The documented keys are some common options shared by many carriers, but are not definitive. Advanced options you support will be defined in ShipEngine. If the field is absent it should be interpreted as the default value for any applicable options, e.g. false for booleans.
     */
    advanced_options: AdvancedShippingOptions;
}
