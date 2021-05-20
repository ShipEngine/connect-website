import {
  OrderApp,
  CarrierApp
} from "@shipengine/connect-sdk/lib/internal";

import { AppType } from "@shipengine/connect-sdk";

export type SdkApp = CarrierApp | OrderApp;

export type SdkAppTypes = AppType.Carrier | AppType.Freight | AppType.Order;

export interface ProductInfo {
  product: "ShipStation",
  loginUrl: string;
}

export interface ConnectApp {
  id: string;
  name: string;
  type: "carrier";
  productInfos: ProductInfo[];
}
