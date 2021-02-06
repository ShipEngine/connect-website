import { OrderApp, CarrierApp } from '@shipengine/connect-sdk/lib/internal';
import { AppType } from '@shipengine/connect-sdk';

export type SdkApp = CarrierApp | OrderApp;

export type SdkAppTypes = AppType.Carrier | AppType.Order;

export interface ConnectApp {
  id: string;
  name: string;
  type: 'carrier';
}

interface ErrorDetail {
  message: string;
}

interface ErrorWithDetails extends Error {
  details: ErrorDetail[]
}

export interface AppStatus {
  status: 'up' | 'down';
  error: ErrorWithDetails;
}
