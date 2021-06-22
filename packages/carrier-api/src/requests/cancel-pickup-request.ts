import { BaseRequest } from './base-request';
import {
  CancellationDetails,
  PickupConfirmation,
  PickupContactDetails,
  PickupLocationDetails,
  PickupShipmentDetails,
  PickupWindow,
} from '../models';

/** @description Basic structure for a request to cancel pickup */
export interface CancelPickupRequest extends BaseRequest {
  confirmation?: PickupConfirmation;
  location?: PickupLocationDetails;
  cancellation_details?: CancellationDetails;
  contact?: PickupContactDetails;
  pickup_details?: PickupShipmentDetails;
  pickup_windows?: PickupWindow[];
  custom_properties?: { [key: string]: string };
}
