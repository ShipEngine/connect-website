import { CarrierAppMetadata } from '@shipengine/connect-carrier-api';

import { DemoCarrier } from './demo-carrier';

export const Metadata: CarrierAppMetadata = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "89ebe16c-29fb-4dc5-b949-349bd4625656",
  Name: "Carrier API",
  Carriers: [DemoCarrier],
};
