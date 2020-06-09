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

export enum DeploymentStatus {
  Queued = "queued",
  Building = "building",
  Deploying = "deploying",
  Running = "running",
  Terminated = "terminated",
  Error = "error"
}

export type DeploymentStatusObj = {
  package: {
    name: string;
    download: string;
  },
  deployId: string;
  status: DeploymentStatus;
  createdAt: string;
  updatedAt: string;
}
