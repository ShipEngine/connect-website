import { AddressPOJO, DateTimeZonePOJO, ErrorCode, ManifestLocation, NewManifest as INewManifest } from "../../../public";
import { Address, DateTimeZone, error, hideAndFreeze, Joi, _internal } from "../../common";
import { CarrierApp } from "../carrier-app";
import { ShippedShipment, ShippedShipmentPOJO } from "../pickups/shipped-shipment";


export interface NewManifestPOJO {
  shipFrom?: AddressPOJO;
  openDateTime: DateTimeZonePOJO | Date | string;
  closeDateTime: DateTimeZonePOJO | Date | string;
  shipments: readonly ShippedShipmentPOJO[];
}


export class NewManifest implements INewManifest {
  public static readonly [_internal] = {
    label: "manifest",
    schema: Joi.object({
      shipFrom: Address[_internal].schema.optional(),
      openDateTime: DateTimeZone[_internal].schema.required(),
      closeDateTime: DateTimeZone[_internal].schema.required(),
      shipments: Joi.array().items(ShippedShipment[_internal].schema.unknown(true)).required(),
    }),
  };

  public readonly shipFrom?: Address;
  public readonly openDateTime: DateTimeZone;
  public readonly closeDateTime: DateTimeZone;
  public readonly shipments: readonly ShippedShipment[];

  public constructor(pojo: NewManifestPOJO, carrier: CarrierApp) {
    this.shipFrom = pojo.shipFrom && new Address(pojo.shipFrom);
    this.openDateTime = new DateTimeZone(pojo.openDateTime);
    this.closeDateTime = new DateTimeZone(pojo.closeDateTime);
    this.shipments = pojo.shipments.map((shipment) => new ShippedShipment(shipment, carrier));

    switch (carrier.manifestLocations) {
      case ManifestLocation.AllLocations:
        if (pojo.shipFrom) {
          throw error(ErrorCode.Invalid,
            `manifest.shipFrom is not allowed because carrier.manifestLocations is ${ManifestLocation.AllLocations}`);
        }
        break;

      case ManifestLocation.SingleLocation:
      default:
        if (!pojo.shipFrom) {
          throw error(ErrorCode.Invalid,
            `manifest.shipFrom is required because carrier.manifestLocations is ${ManifestLocation.SingleLocation}`);
        }
    }

    // Make this object immutable
    hideAndFreeze(this);
  }
}
