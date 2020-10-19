import { SalesOrderNotificationPOJO } from "@shipengine/connect-sdk/lib/internal";
import { BaseTestConfigOptions } from "./base-test-config-options";

export interface AcknowledgeOrdersTestParams {
	notifications: SalesOrderNotificationPOJO[];
	accessToken: string;
}

export interface AcknowledgeOrdersConfigOptions
  extends AcknowledgeOrdersTestParams,
    BaseTestConfigOptions {}