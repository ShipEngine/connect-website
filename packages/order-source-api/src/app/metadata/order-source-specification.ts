import { AccountConnectionSpecification } from "./account-connection-specification";

export interface OrderSourceSpecification {
  Id: string;
  Name: string;
  SendEmail: boolean;
  HasCustomMappings: boolean;
  CanRefresh: boolean;
  CanLeaveFeedback: boolean;
  ScoreFactorForAutoRefresh: number;
  CanConfirmShipments: boolean;
  CanConfirmMultipleShipments: boolean;
  IsRefreshDisabled?: boolean;
  HasCustomStatuses: boolean;
  CanConfigureTimeZone: boolean;
  HasInventoryLevels?: boolean;
  AccountConnection: AccountConnectionSpecification;
}
