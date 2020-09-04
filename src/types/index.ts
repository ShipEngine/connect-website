import { OrderApp, CarrierApp } from '@shipengine/connect-sdk/lib/internal';
import { AppType } from '@shipengine/connect-sdk';

export type SdkApp = CarrierApp | OrderApp;

export type SdkAppTypes = AppType.Carrier | AppType.Order;

export interface ConnectApp {
  id: string;
  name: string;
  type: 'carrier';
}

export interface AppStatus {
  status: 'up' | 'down';
  error: Error;
}
