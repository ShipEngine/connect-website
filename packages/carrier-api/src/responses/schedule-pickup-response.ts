import { 
  Charge,
  Currency,
  PickupConfirmation,
  PickupWindow
} from "../models";

export interface SchedulePickupResponse {
  /**
   * A list of charges accrued with a schedule pickup request.
   */
  charges?: Array<null | Charge> | null;
  /**
   * The total amount charged (tax included) for a schedule pickup request.
   */
  charges_total?: Currency;
  /**
   * This model contains the confirmation information for a scheduled pickup.
   */
  confirmation?: null | PickupConfirmation;
  /**
   * A grab bag of custom properties that will be persisted and sent back with the cancel
   * pickup request.
   */
  custom_properties?: { [key: string]: string } | null;
  /**
   * A list of dates and times when the carrier intends to be available to pickup.
   */
  pickup_windows?: Array<null | PickupWindow> | null;
  /**
   * A custom message returned from the carrier.
   */
  remarks?: null | string;
}
