import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  DimensionsPOJO,
  WeightPOJO
} from "@shipengine/connect-sdk";
import { NewLabelPOJO } from "@shipengine/connect-sdk/lib/internal";

import { BaseTestConfigOptions } from "./base-test-config-options";

export interface TrackShipmentTestParams {
  deliveryServiceName: string;
  label: NewLabelPOJO;
  shipFrom?: AddressWithContactInfoPOJO;
  returnTo?: AddressWithContactInfoPOJO;
  weight: WeightPOJO;
  dimensions: DimensionsPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
  deliveryConfirmationName?: string;
}

export interface TrackShipmentConfigOptions
  extends TrackShipmentTestParams,
    BaseTestConfigOptions {}
