import { DimensionDetails } from './dimension-details';
import { Dimensions } from './dimensions';
import { WeightDetails } from './weight-details';
import { Currency } from './currency';
import { LabelMessages } from './label-message';

/**
* This model represents an individual package that is part of a shipment.
*/
export interface Package {
  /**
   * This model represents the dimensions for a package represented in its original unit,
   * inches, and centimeters.
   */
  dimension_details?: null | DimensionDetails;
  /**
   * This property has been deprecated. Please use dimension_details.
   */
  dimensions?: null | Dimensions;
  /**
   * The insured value of this package.
   */
  insured_value: Currency;
  /**
   * Customized strings the end user expects to appear on their label. The exact location on
   * the label depends on the carrier. It is not expected that every carrier supports
   * including these messages. If the field is absent the user has not specified any messages.
   */
  label_messages?: null | LabelMessages;
  package_code?: null | string;
  /**
   * This property has been deprecated. Please use weight_details.
   */
  weight?: number | null;
  /**
   * This model represents the weight of a package in its original unit, ounces, and grams.
   */
  weight_details?: null | WeightDetails;
}
