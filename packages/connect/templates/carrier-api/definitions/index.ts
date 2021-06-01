import { CarrierAppMetadata } from '@shipengine/connect-carrier-api';

import { DemoCarrier } from './demo-carrier';

export const Metadata: CarrierAppMetadata = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "<%- _appId %>",
  Name: "<%- _appName %>",
  Carriers: [DemoCarrier],
};
