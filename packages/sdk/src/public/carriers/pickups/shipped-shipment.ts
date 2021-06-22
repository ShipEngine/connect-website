import type { DeliveryService } from '../delivery-service';
import type { ShipmentIdentifier } from '../shipments/shipment-identifier';
import type { ShippedPackage } from './shipped-package';
import type { AddressWithContactInfo } from '../../common';

/**
 * Information about a shipment that is ready to be shipped or has already been shipped.
 */
export interface ShippedShipment extends ShipmentIdentifier {
  /**
   * The delivery service to use
   */
  readonly deliveryService: DeliveryService;

  /**
   * Arbitrary data about this shipment that was previously persisted by the ShipEngine Platform.
   */
  readonly metadata: object;

  /**
   * The list of packages in the shipment
   */
  readonly packages: readonly ShippedPackage[];

  /**
   * The first package in the `packages` array.
   * Useful for carriers that only support single-piece shipments.
   */
  readonly package: ShippedPackage;

  /**
   * The recipient's contact info and address
   */
  readonly shipTo?: AddressWithContactInfo;
}
