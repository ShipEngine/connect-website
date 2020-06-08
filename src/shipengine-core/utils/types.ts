import {
  OrderApp,
  CarrierApp,
  AppType,
} from "@shipengine/integration-platform-sdk";

export type App = CarrierApp | OrderApp;

export type AppTypes = AppType.Carrier | AppType.Order;

/**
 * Used to generate, enumerated ISO 8601 strings based on when the test-harness is run.
 */
export interface TimeStamps {
  yesterday: string;
  today: string;
  tomorrowEarly: string;
  tomorrowEarlyAM: string;
  tomorrow: string;
  twoDays: string;
  twoDaysEarly: string;
  threeDays: string;
}
