import {
  PickupContactDetails,
  PickupLocationDetails,
  PickupShipmentDetails,
  PickupWindow
} from '../models';

export interface SchedulePickupRequest {
  /**
   * Contact information about the person there to meet the driver.
   */
  contact?: null | PickupContactDetails;
  /**
   * This model represents the place where the pickup should occur
   */
  location?: null | PickupLocationDetails;
  /**
   * This is an optional schemaless object that you may return with a successful response.
   * Anything returned under this key will be included in all future requests. For example,
   * you may store additional static properties about the end user or their connection to the
   * carrier. The maximum storage size for data under this key is 4KB.
   */
  metadata?: { [key: string]: any } | null;
  /**
   * Contains information regarding the service code for the pickup request and the packages
   * that will be picked up
   */
  pickup_details?: null | PickupShipmentDetails;
  /**
   * The time window that the user is requesting for the pickup to be made.
   */
  requested_pickup_window: null | PickupWindow;
  /**
   * The transaction ID uniquely represents this request. If the request is retried then this
   * transaction ID will be the same. You should only perform the requested action once per
   * given transaction ID.
   */
  transaction_id: string;
}
