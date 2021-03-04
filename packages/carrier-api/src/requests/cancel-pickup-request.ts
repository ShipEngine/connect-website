import { BaseRequest } from "./base-request";
import {
  CancellationDetails,
  PickupConfirmation,
  PickupContactDetails,
  PickupLocationDetails,
  PickupShipmentDetails,
  PickupWindow,
} from "../models";

export interface CancelPickupRequest extends BaseRequest {
  confirmation?: PickupConfirmation;
  location?: PickupLocationDetails;
  cancellation_details?: CancellationDetails;
  contact?: PickupContactDetails;
  pickup_details?: PickupShipmentDetails;
  pickup_windows?: PickupWindow[];
  custom_properties?: { [key: string]: string };
}
