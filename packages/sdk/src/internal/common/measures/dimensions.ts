import {
  Dimensions as IDimensions,
  DimensionsPOJO,
  LengthUnit,
} from '../../../public';
import { hideAndFreeze, _internal } from '../utils';
import { Joi } from '../validation';

export class Dimensions implements IDimensions {
  public static readonly [_internal] = {
    label: 'dimensions',
    schema: Joi.object({
      length: Joi.number().min(0).optional(),
      width: Joi.number().min(0).optional(),
      height: Joi.number().min(0).optional(),
      unit: Joi.string().enum(LengthUnit).required(),
    }),
  };

  public readonly length: number;
  public readonly width: number;
  public readonly height: number;
  public readonly unit: LengthUnit;

  public constructor(pojo: DimensionsPOJO) {
    this.length = pojo.length || 0;
    this.width = pojo.width || 0;
    this.height = pojo.height || 0;
    this.unit = pojo.unit;

    // Make this object immutable
    hideAndFreeze(this);
  }

  public toInches(): Dimensions {
    const centimetersToInches = 0.393701;
    switch (this.unit) {
      case LengthUnit.Centimeters:
        return new Dimensions({
          length: this.length * centimetersToInches,
          width: this.width * centimetersToInches,
          height: this.height * centimetersToInches,
          unit: LengthUnit.Inches,
        });

      default:
        return this;
    }
  }

  public toCentimeters(): Dimensions {
    const inchesToCentimeters = 2.54;
    switch (this.unit) {
      case LengthUnit.Inches:
        return new Dimensions({
          length: this.length * inchesToCentimeters,
          width: this.width * inchesToCentimeters,
          height: this.height * inchesToCentimeters,
          unit: LengthUnit.Centimeters,
        });

      default:
        return this;
    }
  }
}
