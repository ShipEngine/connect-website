import {
  OrderApp,
  CarrierApp
} from "@shipengine/integration-platform-sdk/lib/internal";

import { AppType } from "@shipengine/integration-platform-sdk";

export type SdkApp = CarrierApp | OrderApp;

export type SdkAppTypes = AppType.Carrier | AppType.Order;

export interface PlatformApp {
  id: string;
  name: string;
  type: "carrier";
}
