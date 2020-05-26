import { AdvancedShippingOptions } from "./advanced-shipping-options";
import { Identifier } from "./identifier";
import { ShippedPackage } from "./shipped-package";

export interface PickupShipment {
  /**
   * This is a schemaless object. It is for open ended customizations unique to particular
   * carriers. The documented keys are some common options shared by many carriers, but are
   * not definitive. Advanced options you support will be defined in ShipEngine. If the field
   * is absent it should be interpreted as the default value for any applicable options, e.g.
   * false for booleans.
   */
  advanced_options?: null | AdvancedShippingOptions;
  /**
   * Alternative identifiers associated with this package.
   */
  alternative_identifiers?: Array<null | Identifier> | null;
  /**
   * The list of packages associated with this shipment.
   */
  packages?: Array<ShippedPackage> | null;
  /**
   * The service code used for this shipment.
   */
  service_code?: null | string;
  /**
   * The carrier tracking number for this shipment.
   */
  tracking_number?: null | string;
}
