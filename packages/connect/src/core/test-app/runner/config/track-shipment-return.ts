import {
  DateTimeZonePOJO,
  AddressWithContactInfoPOJO,
  DimensionsPOJO,
  WeightPOJO
} from "@shipengine/connect-sdk";
import { NewLabelPOJO } from "@shipengine/connect-sdk/lib/internal";

import { BaseTestConfigOptions } from "./base-test-config-options";

export interface TrackShipmentReturnTestParams {
  deliveryServiceName: string;
  label: NewLabelPOJO;
  shipFrom?: AddressWithContactInfoPOJO;
  shipTo?: AddressWithContactInfoPOJO;
  weight: WeightPOJO;
  dimensions: DimensionsPOJO;
  shipDateTime: DateTimeZonePOJO | Date | string;
  deliveryConfirmationName?: string;
  rmaNumber?: string;
}

export interface TrackShipmentReturnConfigOptions
  extends TrackShipmentReturnTestParams,
    BaseTestConfigOptions {}
