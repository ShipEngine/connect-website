import { OrderApp, CarrierApp, AppType } from '@shipengine/integration-platform-sdk';

export type App = CarrierApp | OrderApp;

export type AppTypes = AppType.Carrier | AppType.Order;