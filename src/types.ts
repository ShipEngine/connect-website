import { AppType } from "@shipengine/integration-platform-sdk";

/**
 * A ShipEngine Integration Platform app, from a specific version of the SDK
 */
export interface App {
  type: AppType;
  sdkVersion: number;
}
