import { AccountConnectionSpecification, OrderSourceDefinition } from '..';

/** @description This represents what we send to data manager */
export class OrderSourceSpecification {
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
  Images: {
    LogoUrl: string;
    IconUrl: string;
  };
  constructor(definition: OrderSourceDefinition) {
    this.Id = definition.Id;
    this.Name = definition.Name;
    this.SendEmail = definition.SendEmail;
    this.HasCustomMappings = definition.HasCustomMappings;
    this.CanRefresh = definition.CanRefresh;
    this.CanLeaveFeedback = definition.CanLeaveFeedback;
    this.ScoreFactorForAutoRefresh = 0.0;
    this.CanConfirmShipments = definition.CanConfirmShipments;
    this.CanConfirmMultipleShipments = false;
    this.HasCustomStatuses = definition.HasCustomStatuses;
    this.CanConfigureTimeZone = definition.CanConfigureTimeZone;
    this.AccountConnection = definition.AccountConnection;
    this.Images = {
      IconUrl: definition.Images.Icon,
      LogoUrl: definition.Images.Logo,
    };
  }
}
