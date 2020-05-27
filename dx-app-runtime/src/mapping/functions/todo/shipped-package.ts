import { ShippedPackage } from "../capi/models/shipped-package"
import { PackageConfig, Weight, Dimensions, WeightUnit, Identifier, LengthUnit } from "@shipengine/ipaas"
import { Identifier as capiIdentifier } from "../capi/models/identifier";

const mapIdentifiers = (identifier: capiIdentifier): Identifier => {
  return {
    id: identifier.value || '',
    description: identifier.type || ''
  }
}
// TODO: UPDATE CAPI TO RETURN FULL MODEL & remove this function
export default (shippedPackage: ShippedPackage): PackageConfig => {
  return {
    trackingNumber: shippedPackage.tracking_number || '',
    packagingID: shippedPackage.package_code || '',
    weight: new Weight({
      value: shippedPackage.weight || 0,
      unit: WeightUnit.Grams
    }),
    dimensions: new Dimensions({
      width: shippedPackage.dimensions?.width || 0,
      height: shippedPackage.dimensions?.height || 0,
      length: shippedPackage.dimensions?.length || 0,
      unit: LengthUnit.Centimeters
    }),
    identifiers: shippedPackage.alternative_identifiers?.map(mapIdentifiers)
  }
}
