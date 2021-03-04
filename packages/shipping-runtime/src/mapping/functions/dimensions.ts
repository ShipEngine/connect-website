import { Dimensions } from "@shipengine/connect-carrier-api/lib/models";
import { DimensionsPOJO, LengthUnit } from "@shipengine/connect-sdk";

export const mapDimensionsCM = (
  dimensions?: Dimensions | null
): DimensionsPOJO | undefined => {
  if (!dimensions) {
    return undefined;
  }
  const length = dimensions.length || 0;
  const width = dimensions.width || 0;
  const height = dimensions.height || 0;
  if (length === 0 && width === 0 && height === 0) {
    return undefined;
  }
  const unit = LengthUnit.Centimeters;
  return {
    length,
    width,
    height,
    unit,
  };
};
