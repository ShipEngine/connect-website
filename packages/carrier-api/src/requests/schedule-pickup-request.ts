import { BaseRequest } from './base-request';
import {
  PickupContactDetails,
  PickupLocationDetails,
  PickupShipmentDetails,
  PickupWindow,
} from '../models';

export interface SchedulePickupRequest extends BaseRequest {
  location?: PickupLocationDetails;
  contact?: PickupContactDetails;
  pickup_details?: PickupShipmentDetails;
  requested_pickup_window: PickupWindow;
}
