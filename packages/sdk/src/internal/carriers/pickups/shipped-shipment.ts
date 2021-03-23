import { AddressWithContactInfoPOJO, DeliveryServiceIdentifierPOJO, ShipmentIdentifierPOJO, ShippedShipment as IShippedShipment } from "../../../public";
import { App, DefinitionIdentifier, hideAndFreeze, Joi, _internal, AddressWithContactInfo } from "../../common";
import { DeliveryService } from "../delivery-service";
import { ShipmentIdentifier, ShipmentIdentifierBase } from "../shipments/shipment-identifier";
import { ShippedPackage, ShippedPackagePOJO } from "./shipped-package";

export interface ShippedShipmentPOJO extends ShipmentIdentifierPOJO {
  deliveryService: DeliveryServiceIdentifierPOJO | string;
  metadata?: object;
  packages: readonly ShippedPackagePOJO[];
  shipTo?: AddressWithContactInfoPOJO;
}

export class ShippedShipment extends ShipmentIdentifierBase implements IShippedShipment {
  public static readonly [_internal] = {
    label: "shipment",
    schema: ShipmentIdentifier[_internal].schema.keys({
      deliveryService: Joi.alternatives(
        DefinitionIdentifier[_internal].schema.unknown(true),
        Joi.string()
      ).required(),
      metadata: Joi.object(),
      packages: Joi.array().min(1).items(ShippedPackage[_internal].schema).required(),
      shipTo: AddressWithContactInfo[_internal].schema,
    }),
  };

  public readonly deliveryService: DeliveryService;
  public readonly metadata: object;
  public readonly packages: readonly ShippedPackage[];
  public readonly shipTo?: AddressWithContactInfo;

  public get package(): ShippedPackage {
    return this.packages[0];
  }

  public constructor(pojo: ShippedShipmentPOJO, app: App) {
    super(pojo);

    this.deliveryService = app[_internal].references.lookup(pojo.deliveryService, DeliveryService);
    this.metadata = pojo.metadata || {};
    this.packages = pojo.packages.map((parcel) => new ShippedPackage(parcel, app));
    this.shipTo = pojo.shipTo && new AddressWithContactInfo(pojo.shipTo);

    // Make this object immutable
    hideAndFreeze(this);
  }
}
